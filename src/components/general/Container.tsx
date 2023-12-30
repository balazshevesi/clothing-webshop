import React, { ReactNode } from "react";

import { twMerge } from "tailwind-merge";

interface Section {
  className?: string;
  children?: ReactNode;
  id?: string;
  maxWidth?: string;
  style?: any;
}

export default function Container({ className, id, children }: Section) {
  return (
    <section
      id={id}
      className={twMerge(
        "relative mx-auto max-w-7xl scroll-mt-12 px-4 py-24",
        className,
      )}
    >
      {children}
    </section>
  );
}
