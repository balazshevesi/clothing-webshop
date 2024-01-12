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
        "mb-8 text-balance font-nice text-5xl font-semibold uppercase",
        className,
      )}
    >
      {children}
    </h1>
  );
}
