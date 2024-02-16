import { ReactElement } from "react";

import { twMerge } from "tailwind-merge";

export default function Title2({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={twMerge(
        "font-nice mb-8 text-4xl font-semibold uppercase",
        className,
      )}
    >
      {children}
    </h2>
  );
}
