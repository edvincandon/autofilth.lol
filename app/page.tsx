import { FormDefinitions } from "../definitions";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24 font-mono">
      <div className="mt-8 grid gap-5 text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-3 lg:text-left">
        {FormDefinitions.map((form, idx) => {
          const definition = btoa(encodeURIComponent(JSON.stringify(form)));

          return (
            <a
              key={`form-${idx}`}
              href={`/form?definition=${definition}`}
              className="group rounded-lg border border-gray-800 px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
              rel="noopener noreferrer"
            >
              <h2 className={`mb-3 text-lg font-semibold`}>
                {form.name}
                <span className="inline-block ml-4 transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                  →
                </span>
              </h2>
              <p className={`m-0 max-w-[40ch] text-sm`}>
                <span className="opacity-70">{form.description}</span>
              </p>
            </a>
          );
        })}
      </div>
    </main>
  );
}
