import { FormCard } from "@/components/FormCard";
import { FormDefinitions } from "@/definitions";

export default function Home() {
  return (
    <main className="flex  flex-col items-center py-24 px-8 font-mono">
      <span className="text-sm text-center max-w-sm mb-10">
        {`Use these forms to test your password manager's Auto`}
        <strong>filth</strong>™️
        <sup>(1)</sup> capabilities and check its Heu
        <strong>filth</strong>stics™️<sup>(2)</sup>
      </span>
      <div className="grid gap-5 max-w-5xl w-full lg:mb-0 lg:grid-cols-3 text-left">
        {FormDefinitions.map((form, idx) => {
          const definition = btoa(encodeURIComponent(JSON.stringify(form)));

          return (
            <FormCard
              key={`form-${idx}`}
              href={`/form?definition=${definition}`}
              title={form.name}
              description={form.description}
            />
          );
        })}

        <FormCard
          href="/webauthn"
          title="🔐 WebAuthn Test"
          description="Test WebAuthn registration and authentication"
        />
      </div>

      <div className="max-w-3xl flex flex-col text-xs mt-16 gap-8 text-gray-200">
        <blockquote>
          <strong className="text-white">
            <sup>(1) </sup>Autofilth™️
          </strong>{" "}
          <em>(aw-toh-filth)</em>: The intricate art of algorithmic acrobatics
          wherein digital minions attempt to predict and populate form fields
          with perplexing precision, often resulting in a delightful dance of
          randomness and chaos reminiscent of a comedic ballet performed by
          cyborg clowns.
        </blockquote>
        <blockquote>
          <strong className="text-white">
            <sup>(2) </sup>Heufilthstics™️
          </strong>{" "}
          <em>(hyoo-filth-stiks)</em>: The esoteric science of heuristic filth
          analysis, wherein the algorithmic equivalent of a detective with a
          magnifying glass attempts to decipher the murky depths of digital
          detritus, employing a blend of pseudo-logic, whimsical deduction, and
          a pinch of algorithmic absurdity to navigate the labyrinth of
          developer-generated entropy.
        </blockquote>

        <blockquote>
          <strong className="text-black">Help me</strong>
        </blockquote>
      </div>
    </main>
  );
}
