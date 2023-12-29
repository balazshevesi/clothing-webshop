import Image from "next/image";

import Card from "@/components/card/Card";
import { Button } from "@/components/ui/button";

import { useShoppingCart } from "@/state/useShoppingCart";

export default async function Home() {
  const response: any = await fetch("https://fakestoreapi.com/products");
  const demoProducts = await response.json();

  return (
    <div className=" mx-auto flex max-w-4xl flex-wrap gap-4 p-8">
      {demoProducts.map((item: any) => {
        return <Card item={item} key={JSON.stringify(item)} />;
      })}
    </div>
  );
}
