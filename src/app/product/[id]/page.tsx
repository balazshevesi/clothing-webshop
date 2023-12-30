import Image from "next/image";

import MostPopular from "@/components/MostPopular";
import Container from "@/components/general/Container";
import Seperator from "@/components/general/Seperator";
import Title1 from "@/components/general/Title1";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

import LeftSectoin from "./LeftSectoin";

export default async function Product({ params }: { params: { id: string } }) {
  const responsee: any = await fetch(
    "https://api.escuelajs.co/api/v1/products",
  );
  const demoProducts = (await responsee.json()).map((item: any) => {
    const newItem = item;
    newItem.count = 0;
    return newItem;
  });

  const response: any = await fetch(
    `https://api.escuelajs.co/api/v1/products/${params.id}`,
  );
  const demoProduct = await response.json();

  return (
    <>
      <Container className="pt-14">
        <div className="flex gap-12">
          <div className="aspect-square flex-1">
            <LeftSectoin product={demoProduct} />
          </div>
          <div className=" flex w-2/5 flex-col">
            <div className=" mb-10">
              <Title1>{demoProduct.title}</Title1>
              <p>{demoProduct.description}</p>
            </div>
            <div className=" mb-10 w-full">
              <Button className=" w-full uppercase">add to cart</Button>
            </div>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger className="uppercase">
                  fabric
                </AccordionTrigger>
                <AccordionContent>
                  Yes. It adheres to the WAI-ARIA design pattern.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="uppercase">
                  garment care
                </AccordionTrigger>
                <AccordionContent>
                  Yes. It adheres to the WAI-ARIA design pattern.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="uppercase">
                  shipping
                </AccordionTrigger>
                <AccordionContent>
                  Yes. It adheres to the WAI-ARIA design pattern.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </Container>
      <Seperator />
      <MostPopular products={demoProducts} />
      <Seperator />
    </>
  );
}
