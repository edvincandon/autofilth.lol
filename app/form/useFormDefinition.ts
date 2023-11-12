import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { FormDefinition } from "../../definitions";

type FormConfig = { form: FormDefinition; definition: string };

export const useFormDefinition = () => {
  const params = useSearchParams();
  const definition = params.get("definition");

  const configFromDefinition = (definition: string | null) => {
    if (!definition) return null;
    try {
      const form = decodeURIComponent(atob(definition));
      return { form: JSON.parse(form) as FormDefinition, definition };
    } catch (_) {
      return null;
    }
  };

  const [config, setConfig] = useState<FormConfig | null>(() =>
    configFromDefinition(definition)
  );

  return [
    config,
    (next: string | null) => setConfig(configFromDefinition(next)),
  ] as const;
};
