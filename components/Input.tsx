import { FormFieldDefinition } from "@/definitions";
import { FC } from "react";

export const Input: FC<FormFieldDefinition> = ({
  id,
  type = "text",
  label,
  autocomplete,
  required,
  inputMode,
}) => (
  <div className="sm:col-span-2">
    <label
      htmlFor={id}
      className="block text-sm font-mono leading-6 text-white-900"
    >
      {label}
    </label>
    <div className="mt-2.5">
      <input
        type={type}
        name={id}
        id={id}
        autoComplete={autocomplete}
        required={required}
        inputMode={inputMode}
        className="w-full rounded-lg border border-gray-800 bg-transparent px-5 py-3 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 sm:text-sm sm:leading-6"
      />
    </div>
  </div>
);
