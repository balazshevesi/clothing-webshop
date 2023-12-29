import Link from "next/link";

import { Button } from "@/components/ui/button";

import { ShoppingBagIcon, UserIcon } from "@heroicons/react/24/solid";

import CartSheet from "./CartSheet";

export default function Navigation() {
  return (
    <nav className=" sticky left-0 top-0 z-50 bg-white p-2 shadow">
      <div className="mx-auto flex max-w-7xl items-center gap-2">
        <div className="flex flex-1 justify-start gap-2">
          <Button variant="link" className="uppercase">
            <Link href={"/"}>t-shirts</Link>
          </Button>
          <Button variant="link" className="uppercase">
            <Link href={"/"}>tröjor</Link>
          </Button>
          <Button variant="link" className="uppercase">
            <Link href={"/"}>hoodies</Link>
          </Button>
        </div>
        <div className="flex flex-1 justify-center text-lg font-bold uppercase tracking-wider">
          <Link
            href={"/"}
            className="w-fit cursor-pointer select-none border-b-2 border-slate-900"
          >
            made to fit
          </Link>
        </div>
        <div className="flex flex-1 justify-end gap-2">
          <Button variant="outline" size="icon">
            <UserIcon className="size-6" />
          </Button>
          <CartSheet />
        </div>
      </div>
    </nav>
  );
}
