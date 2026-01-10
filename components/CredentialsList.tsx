import { WebAuthnCredential } from "@/hooks/useWebAuthn";
import { FC } from "react";

type Props = {
  credentials: WebAuthnCredential[];
  title: string;
  onClearCredentials?: () => void;
  onDeleteCredential?: (credentialId: string) => void;
  onLoginWithCredential?: (credentialId: string) => void;
};

export const CredentialsList: FC<Props> = ({
  credentials,
  title,
  onClearCredentials,
  onDeleteCredential,
  onLoginWithCredential,
}) => {
  if (credentials.length === 0) return null;

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-white">
        {title} ({credentials.length})
      </h3>
      <div className="space-y-2">
        {credentials.map((cred) => (
          <div
            key={cred.id}
            className="text-xs p-2 bg-gray-800 rounded border border-gray-700 relative group"
          >
            <div className="text-white font-mono">{cred.username}</div>
            <div className="text-gray-400 truncate">
              ID: {cred.id.substring(0, 32)}...
            </div>
            <div className="text-gray-500">
              Counter: {cred.counter} |{" "}
              {new Date(cred.timestamp).toLocaleString()}
            </div>

            <div className="flex gap-2 mt-2">
              {onLoginWithCredential && (
                <button
                  onClick={() => onLoginWithCredential(cred.id)}
                  className="px-2 py-1 text-[10px] border border-blue-300 text-blue-300 hover:border-blue-400 hover:text-blue-400 rounded transition-colors"
                >
                  Login
                </button>
              )}
              {onDeleteCredential && (
                <button
                  onClick={() => onDeleteCredential(cred.id)}
                  className="px-2 py-1 text-[10px] border border-red-600 text-red-500 hover:border-red-400 hover:text-red-400 rounded transition-colors"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {onClearCredentials && (
        <button
          onClick={onClearCredentials}
          className="w-full text-xs py-2 px-3 rounded border border-red-800 text-red-400 hover:bg-red-900/20 transition-colors"
        >
          🗑️ Clear All Credentials
        </button>
      )}
    </div>
  );
};
