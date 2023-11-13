"use client";

import { Input } from "@/components/Input";
import { Select } from "@/components/Select";
import {
  FormMode,
  FormModes,
  ResponseStatus,
  ResponseStatuses,
} from "@/definitions";
import { useRef, useState } from "react";
import { useFormDefinition } from "./useFormDefinition";
import { FormResult, useFormResult } from "./useFormResult";

type FormState = { mode: FormMode; status: ResponseStatus };

export default function Form() {
  const [config, setConfig] = useFormDefinition();
  const [result, setResult] = useFormResult();
  const form = useRef<HTMLFormElement>(null);

  const [state, setState] = useState<FormState>({
    mode: "form_submit:action",
    status: 200,
  });

  if (!config) return window.location.replace("/");

  const ajaxSubmit = async () => {
    try {
      const body = new FormData(form.current!);
      const next = body.get("next");
      const { ok } = await (
        await fetch("/api/submit", { method: "POST", body })
      ).json();

      if (ok && next) setConfig(next.toString());
      else setResult(ok ? FormResult.SUCCESS : FormResult.ERROR);
    } catch {
      setResult(FormResult.ERROR);
    }
  };

  return (
    <>
      <main className="flex flex-col gap-8 items-center pt-24 pb-52 px-4 font-mono">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-xl lg:text-3xl font-bold tracking-tight text-white sm:text-2xl">
            {config.form.name}
          </h2>
          <p className="text-gray-400 max-w-xs mt-4 leading-4">
            <small>{config.form.description}</small>
          </p>
        </div>

        {result === FormResult.SUCCESS && (
          <div className="w-[280px] border rounded-md p-2 text-xs text-center text-green-700 border-green-700">
            {config.form.okText}
          </div>
        )}

        {result === FormResult.ERROR && (
          <div className="w-[280px] border rounded-md p-2 text-xs text-center text-red-700 border-red-700">
            {config.form.errorText}
          </div>
        )}

        {result !== FormResult.SUCCESS && (
          <form
            ref={form}
            className="w-[280px]"
            {...(() => {
              switch (state.mode) {
                case "form_submit:action":
                  return {
                    method: "POST",
                    action: "/api/submit",
                  };

                case "form_submit:ajax":
                  return {
                    onSubmit: (e) => {
                      e.preventDefault();
                      ajaxSubmit();
                    },
                  };

                case "dynamic:ajax":
                  return {
                    onSubmit: (e) => {
                      e.preventDefault();
                    },
                  };
              }
            })()}
          >
            <input type="hidden" name="definition" value={config.definition} />
            <input type="hidden" name="mode" value={state.mode} />
            <input type="hidden" name="status" value={state.status} />

            {config.form.next && (
              <input
                type="hidden"
                name="next"
                value={btoa(
                  encodeURIComponent(JSON.stringify(config.form.next))
                )}
              />
            )}

            <div className="grid grid-cols-1 gap-y-6">
              {config.form.fields.map((field, idx) => (
                <Input
                  key={field.id}
                  id={field.id}
                  label={field.label}
                  type={field.type}
                  autocomplete={field.autocomplete}
                  required={field.required}
                  inputMode={field.inputMode}
                  autoFocus={idx === 0}
                />
              ))}

              <button
                className="mt-4 group rounded-lg border border-gray-800 px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
                {...(state.mode === "dynamic:ajax"
                  ? {
                      type: "button",
                      onClick: () => {
                        const valid = form.current?.reportValidity();
                        if (valid) ajaxSubmit();
                      },
                    }
                  : { type: "submit" })}
              >
                {config.form.submitText}
              </button>
            </div>
          </form>
        )}
      </main>
      <footer className="bg-gray-950 p-4 flex flex-col lg:flex-row gap-8 justify-center items-center fixed bottom-0 w-full font-mono">
        <Select<FormMode>
          id="mode"
          value={state.mode}
          label="Mode"
          options={FormModes}
          onChange={(value) =>
            setState(({ status }) => ({
              status,
              mode: value as FormMode,
            }))
          }
        />

        <span className="text-xl mt-4 hidden lg:block">→</span>

        <Select<ResponseStatus>
          id="status"
          value={state.status}
          label="Response"
          options={ResponseStatuses}
          onChange={(value) =>
            setState(({ mode }) => ({
              mode,
              status: parseInt(value, 10) as ResponseStatus,
            }))
          }
        />
      </footer>
    </>
  );
}
