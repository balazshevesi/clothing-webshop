import { cookies } from "next/headers";
import Link from "next/link";

import { Button } from "@/components/ui/button";

import { ShoppingBagIcon, UserIcon } from "@heroicons/react/24/solid";

import Container from "../general/Container";
import NavigationDropdown from "./NavigationDropdown";
import CountDown from "../CountDown";
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

export default async function Navigation() {
  const cookieStore = cookies();
  const userAuth = cookieStore.get("userAuth");

  const categoryResponse = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_HOST}/categories`,
  );
  const categories = (await categoryResponse.json()).content;

  const runningSalesResponse = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_HOST}/running-sales`,
  );
  const runningSales = (await runningSalesResponse.json()).content;

  return (
    <div className="sticky left-0 top-0 z-50">
      {runningSales.length > 0 && (
        <div className="border-b border-dashed border-white/50 bg-red-500 p-1 text-center font-semibold">
          <span>{runningSales[0].announcementTitle}</span>{" "}
          <span>
            <CountDown date={new Date(runningSales[0].endTime)}></CountDown>
          </span>
        </div>
      )}
      <nav className="w-full border-b border-dashed border-white/50 bg-black p-2 shadow">
        {/* desktop */}
        <Container className="hidden py-1 lg:flex">
          <div className="flex flex-1 justify-start gap-2">
            {/* <Button variant="link" className="uppercase">
              <Link href={"/category/casual-wear"}>casual wear</Link>
            </Button>
            <Button variant="link" className="uppercase">
              <Link href={"/category/gym-wear"}>gym wear</Link>
            </Button> */}
            {categories.map((category: any) => (
              <Button variant="link" className="uppercase">
                <Link
                  href={`/search?showListings=true&categories=${category.id}`}
                >
                  {category.name}
                </Link>
              </Button>
            ))}
          </div>
          <div className="flex flex-1 items-center justify-center text-lg font-bold uppercase tracking-wider">
            <Link href={"/"}>
              <Logo />
            </Link>
          </div>
          <div className="flex flex-1 justify-end gap-2">
            <LoginButton serverAuth={!!userAuth} />
            <CartSheet />
          </div>
        </Container>
        {/* mobile */}
        <Container className="flex flex-col gap-4 px-0 py-1 lg:hidden">
          <div className=" flex">
            <div className="flex flex-1 justify-start gap-2">
              <NavigationDropdown categories={categories} />
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
    </div>
  );
}
