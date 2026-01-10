import { FC, ReactNode } from "react";

type Props = {
  href: string;
  title: string;
  description: string;
  children?: ReactNode;
};

export const FormCard: FC<Props> = ({ href, title, description }) => (
  <a
    href={href}
    className="group rounded-lg border border-gray-800 px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:border-neutral-700 dark:hover:bg-neutral-800/30"
    rel="noopener noreferrer"
  >
    <h2 className="mb-3 text-md md:text-lg font-semibold">
      {title}
      <span className="inline-block ml-4 transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
        →
      </span>
    </h2>
    <p className="text-sm">
      <span className="opacity-70">{description}</span>
    </p>
  </a>
);
