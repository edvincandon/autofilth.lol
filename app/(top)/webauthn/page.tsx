"use client";

import { CredentialsList } from "@/components/CredentialsList";
import { StatusMessage } from "@/components/StatusMessage";
import { WebAuthnLayout } from "@/components/WebAuthnLayout";
import { useWebAuthn, WebAuthnResult } from "@/hooks/useWebAuthn";
import { useState } from "react";

export default function WebAuthn() {
  const [username, setUsername] = useState("");
  const [result, setResult] = useState<string>("");
  const [mode, setMode] = useState<"register" | "authenticate">("register");

  const webAuthn = useWebAuthn();
  const loading = webAuthn.loading;

  const execWebAuthn = async (
    operation: () => Promise<WebAuthnResult>,
    onSuccess?: () => void
  ) => {
    const response = await operation();
    setResult(response.message);
    if (response.success && onSuccess) onSuccess();
  };

  return (
    <WebAuthnLayout
      title="🔐 WebAuthn Test"
      description="Test WebAuthn registration and authentication"
    >
      <StatusMessage message={result} />

      <div className="w-[320px] space-y-6">
        <div className="flex rounded-lg border border-gray-800 p-1">
          <button
            onClick={() => setMode("register")}
            className={`flex-1 rounded px-3 py-2 text-sm transition-colors ${
              mode === "register"
                ? "bg-gray-100 dark:bg-neutral-800"
                : "hover:bg-gray-50 dark:hover:bg-neutral-900"
            }`}
          >
            📝 Register
          </button>
          <button
            onClick={() => setMode("authenticate")}
            className={`flex-1 rounded px-3 py-2 text-sm transition-colors ${
              mode === "authenticate"
                ? "bg-gray-100 dark:bg-neutral-800"
                : "hover:bg-gray-50 dark:hover:bg-neutral-900"
            }`}
          >
            🔓 Authenticate
          </button>
        </div>

        {mode === "register" ? (
          <div className="space-y-4">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-mono leading-6 text-white"
              >
                Username
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  id="username"
                  name="username"
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onKeyPress={(e) =>
                    e.key === "Enter" &&
                    username.trim() &&
                    !loading &&
                    execWebAuthn(
                      () => webAuthn.register(username),
                      () => setUsername("")
                    )
                  }
                  disabled={loading}
                  className="w-full rounded-lg border border-gray-800 bg-transparent px-4 py-3 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 sm:text-sm sm:leading-6 disabled:opacity-50"
                  placeholder="Enter username"
                  autoFocus
                />
              </div>
            </div>

            <button
              onClick={() =>
                execWebAuthn(
                  () => webAuthn.register(username),
                  () => setUsername("")
                )
              }
              disabled={!username.trim() || loading}
              className="w-full group rounded-lg border border-gray-800 px-4 py-3 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "🔄 Registering..." : "📝 Register WebAuthn"}
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {webAuthn.credentials.length === 0 ? (
              <div className="text-center space-y-4">
                <div className="text-yellow-600 text-sm">
                  ⚠️ No registered credentials found
                </div>
                <div className="text-xs text-gray-500">
                  Switch to Register mode to create a credential first.
                </div>
              </div>
            ) : (
              <button
                onClick={() => execWebAuthn(() => webAuthn.authenticate())}
                disabled={loading}
                className="w-full group rounded-lg border border-gray-800 px-4 py-3 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading
                  ? "🔄 Authenticating..."
                  : "🔓 Authenticate with WebAuthn"}
              </button>
            )}
          </div>
        )}

        <CredentialsList
          credentials={webAuthn.credentials}
          title="Stored Credentials"
          onClearCredentials={() => {
            webAuthn.clearAllCredentials();
            setResult("🗑️ All credentials cleared from localStorage");
          }}
          onDeleteCredential={(id) => {
            webAuthn.deleteCredential(id);
            setResult("🗑️ Credential deleted");
          }}
          onLoginWithCredential={(id) =>
            execWebAuthn(() => webAuthn.authenticate(id))
          }
        />
      </div>
    </WebAuthnLayout>
  );
}
