"use client";

import { ReactElement, useEffect, useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

import { CheckIcon } from "@heroicons/react/24/outline";

import { useQuery } from "@tanstack/react-query";
import { randomInt } from "crypto";
import {
  parseAsArrayOf,
  parseAsBoolean,
  parseAsInteger,
  useQueryState,
} from "nuqs";

function FilterItem({
  children,
  title,
}: {
  children: ReactElement;
  title?: string;
}) {
  return (
    <div className=" overflow-auto border-t border-dashed border-white/30 py-5">
      <div className="mb-3">{title}</div>
      {children}
    </div>
  );
}

export default function Filter() {
  const [fromPrice, setFromPrice] = useQueryState("fromPrice");
  const [toPrice, setToPrice] = useQueryState("toPrice");
  const [onlyInStock, setOnlyInStock] = useQueryState(
    "showOnlyInStock",
    parseAsBoolean,
  );
  const [selectedBrands, setSelectedBrands] = useQueryState(
    "brands",
    parseAsArrayOf(parseAsInteger).withDefault([]),
  );
  const [selectedCategories, setSelectedCategories] = useQueryState(
    "categories",
    parseAsArrayOf(parseAsInteger).withDefault([]),
  );

  const [orderBy, setOrderBy] = useQueryState("orderBy");
  const [page, setPage] = useQueryState("page");

  const brands = useQuery({
    queryKey: ["brands"],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_HOST}/brands`,
      );
      const data = await response.json();
      const content = data.content;
      return content;
    },
  });

  const categories = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_HOST}/categories`,
      );
      const data = await response.json();
      const content = data.content;
      return content;
    },
  });

  return (
    <>
      <Accordion type="single" collapsible className="mb-8">
        <AccordionItem value="item-1">
          <AccordionTrigger className="uppercase">
            configure filter
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 py-2">
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
              <FilterItem title="Categories:">
                <div className="flex gap-2">
                  {!!categories.data &&
                    categories.data.map((brand: any) => (
                      <Button
                        onClick={() => {
                          if (selectedCategories.includes(brand.id)) {
                            setSelectedCategories(
                              selectedCategories.filter(
                                (brandId) => brandId !== brand.id,
                              ),
                            );
                          } else
                            setSelectedCategories([
                              ...selectedCategories,
                              brand.id,
                            ]);
                        }}
                        variant="outline"
                        size="sm"
                        className={
                          selectedCategories.includes(brand.id)
                            ? "rounded-full border-white bg-white text-black hover:bg-white/50"
                            : "rounded-full border-white"
                        }
                      >
                        {selectedCategories.includes(brand.id) && (
                          <CheckIcon className=" mr-2 size-5" />
                        )}
                        {brand.name}
                      </Button>
                    ))}
                </div>
              </FilterItem>

              <FilterItem title="Brands:">
                <div className="flex gap-2">
                  {!!brands.data &&
                    brands.data.map((brand: any) => (
                      <Button
                        onClick={() => {
                          if (selectedBrands.includes(brand.id)) {
                            setSelectedBrands(
                              selectedBrands.filter(
                                (brandId) => brandId !== brand.id,
                              ),
                            );
                          } else
                            setSelectedBrands([...selectedBrands, brand.id]);
                        }}
                        variant="outline"
                        size="sm"
                        className={
                          selectedBrands.includes(brand.id)
                            ? "rounded-full border-white bg-white text-black hover:bg-white/50"
                            : "rounded-full border-white"
                        }
                      >
                        {selectedBrands.includes(brand.id) && (
                          <CheckIcon className=" mr-2 size-5" />
                        )}
                        {brand.name}
                      </Button>
                    ))}
                </div>
              </FilterItem>
              <FilterItem title="Show only if in stock:">
                <div className=" flex items-center gap-2">
                  <Checkbox
                    id="terms"
                    checked={onlyInStock ? onlyInStock : false}
                    onCheckedChange={(e: boolean) => setOnlyInStock(e)}
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Show only if in stock
                  </label>
                </div>
              </FilterItem>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <div className="mb-10 flex items-center gap-2 border-b border-dashed border-white/80 pb-4 font-medium">
        <div className=" uppercase">order by</div>
        <Select
          defaultValue={orderBy ? orderBy : "name"}
          onValueChange={(e) => setOrderBy(e)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="light" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="priceLowToHigh">price - low to high</SelectItem>
            <SelectItem value="priceHighToLow">price - high to low</SelectItem>
            <SelectItem value="name">name</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </>
  );
}
