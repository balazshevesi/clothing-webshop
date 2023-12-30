import Link from "next/link";

import { Button } from "@/components/ui/button";

import { ShoppingBagIcon, UserIcon } from "@heroicons/react/24/solid";

import Container from "../general/Container";
import CartSheet from "./navigation/cart/CartSheet";

export default function Navigation() {
  return (
    <nav className="sticky left-0 top-0 z-50 w-full bg-black p-2 shadow">
      <Container className="flex py-1">
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
        <div className="flex flex-1 items-center justify-center text-lg font-bold uppercase tracking-wider">
          <Link
            href={"/"}
            className="w-fit cursor-pointer select-none border-b-2 border-white"
          >
            [ the masculine ideal ]
          </Link>
        </div>
        <div className="flex flex-1 justify-end gap-2">
          <Button variant="outline">
            <UserIcon className="mr-2 size-6" />
            Log in
          </Button>
          <CartSheet />
        </div>
      </Container>
    </nav>
  );
}
