import { FC } from "react";

type Props = { message: string };

const getMessageVariant = (message: string) => {
  if (message.startsWith("✅")) return "text-green-700 border-green-700";
  if (message.startsWith("🗑️")) return "text-yellow-700 border-yellow-700";
  return "text-red-700 border-red-700";
};

export const StatusMessage: FC<Props> = ({ message }) =>
  message && (
    <div
      className={`w-[320px] border rounded-md p-3 text-xs text-center ${getMessageVariant(
        message
      )}`}
    >
      {message}
    </div>
  );
