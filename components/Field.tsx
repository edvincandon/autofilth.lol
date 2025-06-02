import { FormFieldDefinition } from "@/definitions";
import { FC } from "react";

export const Field: FC<FormFieldDefinition> = (props) => (
  <div className="sm:col-span-2">
    <label
      htmlFor={props.id}
      className="block text-sm font-mono leading-6 text-white-900"
    >
      {props.label}
    </label>
    <div className="mt-2.5">
      {props.type === "select" ? (
        <select
          id={props.id}
          autoComplete={props.autocomplete}
          className="rounded-lg w-full bg-transparent border border-gray-800 appearance-none text-white px-5 py-3 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          required={props.required}
        >
          {props.options.map(({ label, value }) => (
            <option value={value} key={value}>
              {label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={props.type}
          name={props.id}
          id={props.id}
          autoComplete={props.autocomplete}
          required={props.required}
          inputMode={props.inputMode}
          autoFocus={props.autoFocus}
          className="w-full rounded-lg border border-gray-800 bg-transparent px-5 py-3 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 sm:text-sm sm:leading-6"
        />
      )}
    </div>
  </div>
);
