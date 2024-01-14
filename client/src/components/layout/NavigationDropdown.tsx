"use client";

import { useRouter } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Bars3Icon } from "@heroicons/react/24/solid";

import { useAuthSlice } from "@/state/useAuthSlice";

export default function NavigationDropdown() {
  const router = useRouter();

  const openLogin = useAuthSlice((state: any) => state.openLogin) as any;
  const isLoggedIn = useAuthSlice((state) => state.isLoggedIn);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-lg bg-zinc-800 p-2">
        <Bars3Icon className="size-6" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="space-y-2 p-2">
        <DropdownMenuItem className="uppercase">casual wear</DropdownMenuItem>
        <DropdownMenuItem className="uppercase">gym wear</DropdownMenuItem>
        <DropdownMenuSeparator />
        {!isLoggedIn ? (
          <DropdownMenuItem className="uppercase" onClick={() => openLogin()}>
            Login
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem
            className="uppercase"
            onClick={() => router.push(`/account`)}
          >
            View Account
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
