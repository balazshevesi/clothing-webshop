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
        "mb-8 font-nice text-4xl font-semibold uppercase",
        className,
      )}
    >
      {children}
    </h2>
  );
}
