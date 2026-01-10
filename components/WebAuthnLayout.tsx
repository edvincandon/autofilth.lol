import { FC, PropsWithChildren } from "react";

type Props = {
  title: string;
  description: string;
};

export const WebAuthnLayout: FC<PropsWithChildren<Props>> = ({
  title,
  description,
  children,
}) => (
  <main className="flex flex-col gap-8 items-center pt-24 pb-52 px-4 font-mono">
    <div className="mx-auto max-w-2xl text-center">
      <h2 className="text-xl lg:text-3xl font-bold tracking-tight dark:text-white sm:text-2xl">
        {title}
      </h2>
      <p className="text-gray-400 max-w-xs mt-4 leading-4">
        <small>{description}</small>
      </p>
    </div>
    {children}
  </main>
);
