import { FormDefinitions } from "../definitions";

export default function Home() {
  return (
    <main className="flex  flex-col items-center py-24 px-8 font-mono">
      <span
        className="text-sm text-center max-w-sm mb-10"
        dangerouslySetInnerHTML={{
          __html:
            "Use these forms to test your password manager's Heu<strong>filth</strong>stics™",
        }}
      />
      <div className="grid gap-5 max-w-5xl w-full lg:mb-0 lg:grid-cols-3 text-left">
        {FormDefinitions.map((form, idx) => {
          const definition = btoa(encodeURIComponent(JSON.stringify(form)));

          return (
            <a
              key={`form-${idx}`}
              href={`/form?definition=${definition}`}
              className="group rounded-lg border border-gray-800 px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:border-neutral-700 dark:hover:bg-neutral-800/30"
              rel="noopener noreferrer"
            >
              <h2 className="mb-3 text-md md:text-lg font-semibold">
                {form.name}
                <span className="inline-block ml-4 transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                  →
                </span>
              </h2>
              <p className="text-sm">
                <span className="opacity-70">{form.description}</span>
              </p>
            </a>
          );
        })}
      </div>
    </main>
  );
}
