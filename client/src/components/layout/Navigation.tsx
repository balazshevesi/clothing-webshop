import { cookies } from "next/headers";
import Link from "next/link";

import { Button } from "@/components/ui/button";

import { ShoppingBagIcon, UserIcon } from "@heroicons/react/24/solid";

import CountDown from "../CountDown";
import Container from "../general/Container";
import NavigationDropdown from "./NavigationDropdown";
import CartSheet from "./navigation/cart/CartSheet";
import LoginButton from "./navigation/login/LoginButton";

const getCategoryAndSales = async () => {
  const categoriesUrl = `${process.env.NEXT_PUBLIC_BACKEND_HOST}/categories`;
  const runningSalesUrl = `${process.env.NEXT_PUBLIC_BACKEND_HOST}/running-sales`;
  let serverError = false;

  try {
    const [categories, runningSales] = await Promise.all([
      fetch(categoriesUrl).then((res) => {
        if (!res.ok) serverError = true;
        return res.json();
      }),
      fetch(runningSalesUrl).then((res) => {
        if (!res.ok) serverError = true;
        return res.json();
      }),
      ,
    ]);
    return {
      categories: categories.content,
      runningSales: runningSales.content,
      serverError,
    };
  } catch {
    serverError = true;
    return { serverError };
  }
};

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

  // Start both fetch requests in parallel

  const { categories, runningSales, serverError } = await getCategoryAndSales();
  console.log("categoriescategories", categories);
  console.log("runningSalesrunningSales", runningSales);

  if (serverError) return <div>sowwy ;_; server not wowkey wigth now</div>;

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
