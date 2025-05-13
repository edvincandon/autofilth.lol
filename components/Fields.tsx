import { Input } from "@/components/Input";
import { FormDefinition } from "@/definitions";
import { FC } from "react";

type Props = {
  fields: FormDefinition["fields"];
  noFocus?: boolean;
};

export const Fields: FC<Props> = ({ fields, noFocus }) =>
  fields.map((field, idx) => {
    switch (field.type) {
      case "separator":
        return (
          <h3 className="underline w100 block" key={`section-${idx}`}>
            {field.label}
          </h3>
        );

      case "frame":
        const def = btoa(encodeURIComponent(JSON.stringify(field.form)));
        return (
          <div className="sm:col-span-2" key={field.id}>
            <iframe
              id={field.id}
              src={`/frame?definition=${def}`}
              height={field.height}
            />
          </div>
        );
      default:
        return (
          <Input
            key={field.id}
            id={field.id}
            label={field.label}
            type={field.type}
            autocomplete={field.autocomplete}
            required={field.required}
            inputMode={field.inputMode}
            autoFocus={!noFocus && idx === 0}
          />
        );
    }
  });
