import { twMerge } from "tailwind-merge";

export default function Title1({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <h1
      className={twMerge(
        "font-nice mb-8 text-balance text-5xl font-semibold uppercase",
        className,
      )}
    >
      {children}
    </h1>
  );
}
