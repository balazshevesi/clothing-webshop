"use client";

import { cookies } from "next/headers";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { ReactNode } from "react";

function AdminNavLink({ section }: { section: string }) {
  const pathname = usePathname();
  const currentPath = pathname.split("/")[2];
  const sectionPath = section.replace(" ", "-");

  const isActive = sectionPath === currentPath;

  return (
    <Link
      href={`/admin/${sectionPath}`}
      className={
        isActive
          ? "relative w-full overflow-hidden rounded-sm bg-slate-700 p-2 px-4 uppercase shadow"
          : "relative w-full overflow-hidden rounded-sm bg-slate-800 p-2 px-4 uppercase shadow"
      }
    >
      <>
        {!!isActive && (
          <div className=" absolute left-0 top-0 h-full w-1 bg-white" />
        )}
        {section}
      </>
    </Link>
  );
}

export default async function AdminNavigation({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex h-full items-stretch gap-4">
      <div className="h-full border-r border-dashed border-white/50">
        <div className="flex h-full w-full flex-col items-center gap-4 p-4">
          <AdminNavLink section="articles" />
          <AdminNavLink section="brands" />
          <AdminNavLink section="categories" />
          <AdminNavLink section="planned sales" />
        </div>
      </div>
      {children}
    </div>
  );
}
