import { cookies } from "next/headers";
import Link from "next/link";

import { Button } from "@/components/ui/button";

import { ShoppingBagIcon, UserIcon } from "@heroicons/react/24/solid";

import Container from "../general/Container";
import NavigationDropdown from "./NavigationDropdown";
import CartSheet from "./navigation/cart/CartSheet";
import LoginButton from "./navigation/login/LoginButton";

function Logo() {
  return (
    <div className="flex w-fit cursor-pointer select-none flex-col whitespace-nowrap">
      [ the masculine ideal ]
      <div className="flex h-0.5 w-full">
        <div className="flex-1 bg-indigo-500" />
        <div className="flex-1 bg-yellow-500" />
        <div className="flex-1 bg-indigo-500" />
      </div>
    </div>
  );
}

export default function Navigation() {
  const cookieStore = cookies();
  const userAuth = cookieStore.get("userAuth");

  return (
    <nav className="sticky left-0 top-0 z-50 w-full border-b border-dashed border-white/50 bg-black p-2 shadow">
      {/* desktop */}
      <Container className="hidden py-1 lg:flex">
        <div className="flex flex-1 justify-start gap-2">
          <Button variant="link" className="uppercase">
            <Link href={"/category/casual-wear"}>casual wear</Link>
          </Button>
          <Button variant="link" className="uppercase">
            <Link href={"/category/gym-wear"}>gym wear</Link>
          </Button>
        </div>
        <div className="flex flex-1 items-center justify-center text-lg font-bold uppercase tracking-wider">
          <Link href={"/"}>
            <Logo />
          </Link>
        </div>
        <div className="flex flex-1 justify-end gap-2">
          <LoginButton serverAuthorization={!!userAuth} />
          <CartSheet />
        </div>
      </Container>
      {/* mobile */}
      <Container className="flex flex-col gap-4 px-0 py-1 lg:hidden">
        <div className=" flex">
          <div className="flex flex-1 justify-start gap-2">
            <NavigationDropdown />
            {/* 
            
            */}
          </div>
          <div className="flex flex-1 shrink items-center justify-center text-sm font-bold uppercase tracking-wider sm:text-lg">
            <Link
              href={"/"}
              className="w-fit cursor-pointer select-none whitespace-nowrap"
            >
              <Logo />
            </Link>
          </div>
          <div className="flex flex-1 justify-end gap-2">
            <CartSheet />
          </div>
        </div>
      </Container>
    </nav>
  );
}
