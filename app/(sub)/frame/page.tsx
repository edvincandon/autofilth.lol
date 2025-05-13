"use client";

import { Fields } from "@/components/Fields";
import { useFormDefinition } from "@/hooks/useFormDefinition";

export default function FormFrame() {
  const [config] = useFormDefinition();
  return (
    config && (
      <div className="grid grid-cols-1 gap-y-6">
        <Fields fields={config.form.fields} noFocus />
      </div>
    )
  );
}
