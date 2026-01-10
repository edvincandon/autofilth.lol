import { useLocalStorage } from "@/utils";
import { useState } from "react";

export type WebAuthnCredential = {
  id: string;
  publicKey: string;
  counter: number;
  username: string;
  timestamp: number;
};

export type WebAuthnResult = {
  success: boolean;
  message: string;
  credential?: WebAuthnCredential;
};

const isWebAuthnSupported = (): boolean =>
  !!(navigator.credentials && window.PublicKeyCredential);

const handleWebAuthnError = (error: any, operation: string): WebAuthnResult => {
  if (error.name === "NotAllowedError") {
    return {
      success: false,
      message: `❌ ${operation} not allowed`,
    };
  }

  if (error.name === "InvalidStateError") {
    return {
      success: false,
      message:
        operation === "Registration"
          ? "❌ Authenticator already registered"
          : "❌ Authenticator not found",
    };
  }

  return {
    success: false,
    message: `❌ ${operation} failed: ${error.message}`,
  };
};

export const useWebAuthn = () => {
  const [credentials, setCredentials] = useLocalStorage<WebAuthnCredential[]>(
    "webauthn_credentials",
    []
  );
  const [loading, setLoading] = useState(false);

  const addCredential = (credential: WebAuthnCredential) => {
    setCredentials((prev) => [...prev, credential]);
  };

  const updateCredentialCounter = (credentialId: string) => {
    setCredentials((prev) =>
      prev.map((cred) =>
        cred.id === credentialId ? { ...cred, counter: cred.counter + 1 } : cred
      )
    );
  };

  const deleteCredential = (credentialId: string) => {
    setCredentials((prev) => prev.filter((cred) => cred.id !== credentialId));
  };

  const clearAllCredentials = () => {
    setCredentials([]);
  };

  const findCredential = (credentialId: string) => {
    return credentials.find((cred) => cred.id === credentialId);
  };

  const register = async (username: string): Promise<WebAuthnResult> => {
    if (!username.trim()) {
      return { success: false, message: "❌ Please enter a username" };
    }

    if (!isWebAuthnSupported()) {
      return {
        success: false,
        message: "❌ WebAuthn not supported",
      };
    }

    setLoading(true);

    try {
      const userId = new TextEncoder().encode(username);
      const challenge = crypto.getRandomValues(new Uint8Array(32));

      const creationOptions: PublicKeyCredentialCreationOptions = {
        challenge,
        rp: {
          name: "AutoFilth WebAuthn Test",
          id: window.location.hostname,
        },
        user: {
          id: userId,
          name: username,
          displayName: username,
        },
        pubKeyCredParams: [
          { alg: -7, type: "public-key" },
          { alg: -257, type: "public-key" },
        ],
        authenticatorSelection: {
          authenticatorAttachment: "platform",
          userVerification: "preferred",
          requireResidentKey: false,
        },
        timeout: 60000,
        attestation: "direct",
      };

      const credential = (await navigator.credentials.create({
        publicKey: creationOptions,
      })) as PublicKeyCredential;

      if (!credential) {
        return { success: false, message: "❌ Failed to create credential" };
      }

      const response = credential.response as AuthenticatorAttestationResponse;
      const publicKey = response.getPublicKey();

      if (!publicKey) {
        return { success: false, message: "❌ Failed to retrieve public key" };
      }

      const newCredential: WebAuthnCredential = {
        id: credential.id,
        publicKey: new Uint8Array(publicKey).toBase64(),
        counter: 0,
        username,
        timestamp: Date.now(),
      };

      addCredential(newCredential);

      return {
        success: true,
        message: `✅ Registered "${username}"`,
        credential: newCredential,
      };
    } catch (error: any) {
      console.error("Registration error:", error);
      return handleWebAuthnError(error, "Registration");
    } finally {
      setLoading(false);
    }
  };

  const authenticate = async (
    specificCredentialId?: string
  ): Promise<WebAuthnResult> => {
    const credentialsToUse = specificCredentialId
      ? credentials.filter((cred) => cred.id === specificCredentialId)
      : credentials;

    if (credentialsToUse.length === 0) {
      return {
        success: false,
        message: specificCredentialId
          ? "❌ Specified credential not found."
          : "❌ No registered credentials found.",
      };
    }

    if (!isWebAuthnSupported()) {
      return {
        success: false,
        message: "❌ WebAuthn not supported",
      };
    }

    setLoading(true);

    try {
      const challenge = crypto.getRandomValues(new Uint8Array(32));

      const requestOptions: PublicKeyCredentialRequestOptions = {
        challenge,
        allowCredentials: credentialsToUse.map((cred) => ({
          id: Uint8Array.fromBase64(cred.id, { alphabet: "base64url" }),
          type: "public-key" as const,
        })),
        timeout: 60000,
        userVerification: "preferred",
        rpId: window.location.hostname,
      };

      const credential = (await navigator.credentials.get({
        publicKey: requestOptions,
      })) as PublicKeyCredential;

      if (!credential) {
        return {
          success: false,
          message: "❌ Authentication failed",
        };
      }

      const storedCredential = findCredential(credential.id);

      if (!storedCredential) {
        return {
          success: false,
          message: "❌ Credential not found",
        };
      }

      updateCredentialCounter(credential.id);

      return {
        success: true,
        message: `✅ Authenticated "${storedCredential.username}"`,
        credential: storedCredential,
      };
    } catch (error: any) {
      return handleWebAuthnError(error, "Authentication");
    } finally {
      setLoading(false);
    }
  };

  return {
    credentials,
    loading,
    register,
    authenticate,
    deleteCredential,
    clearAllCredentials,
  };
};
