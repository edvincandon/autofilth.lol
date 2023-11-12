import { useSearchParams } from "next/navigation";
import { FormDefinition } from "../../definitions";

export const useFormDefinition = () => {
  const params = useSearchParams();
  const definition = params.get("definition");
  if (!definition) return null;

  try {
    const form = decodeURIComponent(atob(definition));
    return { form: JSON.parse(form) as FormDefinition, definition };
  } catch (_) {
    return null;
  }
};
