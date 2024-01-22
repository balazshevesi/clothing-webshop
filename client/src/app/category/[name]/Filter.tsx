"use client";

import { ReactElement, useEffect } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

import { randomInt } from "crypto";
import { useQueryState } from "nuqs";

function FilterItem({
  children,
  title,
}: {
  children: ReactElement;
  title?: string;
}) {
  return (
    <div className=" border-t border-dashed border-white/30 py-5">
      <div className="mb-3">{title}</div>
      {children}
    </div>
  );
}

export default function Filter() {
  const [fromPrice, setFromPrice] = useQueryState("fromPrice");
  const [toPrice, setToPrice] = useQueryState("toPrice");

  return (
    <>
      <Accordion type="single" collapsible className="mb-8">
        <AccordionItem value="item-1">
          <AccordionTrigger className="uppercase">
            configure filter
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 py-2">
              {/* <FilterItem title="Category:">
                <div className=" flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className=" rounded-full border-white"
                  >
                    Gym Wear
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className=" rounded-full border-white"
                  >
                    Casual Wear
                  </Button>
                </div>
              </FilterItem> */}
              <FilterItem title="Price:">
                <Slider
                  defaultValue={[+(fromPrice || 0), +(toPrice || 4000)]}
                  max={4000}
                  step={1}
                  onValueCommit={(e: any[]) => {
                    setFromPrice(e[0]);
                    setToPrice(e[1]);
                  }}
                />
              </FilterItem>
              {/* <FilterItem title="Type:">
                <div className=" flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className=" rounded-full border-white"
                  >
                    Hoodie
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className=" rounded-full border-white"
                  >
                    T-shirt
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className=" rounded-full border-white"
                  >
                    Tank Top
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className=" rounded-full border-white"
                  >
                    Sweater
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className=" rounded-full border-white"
                  >
                    Pants
                  </Button>
                </div>
              </FilterItem> */}
              {/* <FilterItem title="Brand:">
                <div className=" flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className=" rounded-full border-white"
                  >
                    Kevin Klein
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className=" rounded-full border-white"
                  >
                    Next
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className=" rounded-full border-white"
                  >
                    Puma
                  </Button>
                </div>
              </FilterItem> */}
              {/* <FilterItem title="Material:">
                <div className=" flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className=" rounded-full border-white"
                  >
                    Cotton
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className=" rounded-full border-white"
                  >
                    Whool
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className=" rounded-full border-white"
                  >
                    Merino Wool
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className=" rounded-full border-white"
                  >
                    Silk
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className=" rounded-full border-white"
                  >
                    Bamboo
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className=" rounded-full border-white"
                  >
                    Denim
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className=" rounded-full border-white"
                  >
                    Leather
                  </Button>
                </div>
              </FilterItem> */}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <div className="mb-10 flex items-center gap-2 border-b border-dashed border-white/80 pb-4 font-medium">
        <div className=" uppercase">sort by</div>
        <Select defaultValue="name">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="light" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="price - low to high">
              price - low to high
            </SelectItem>
            <SelectItem value="price - high to low">
              price - high to low
            </SelectItem>
            <SelectItem value="name">name</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </>
  );
}
