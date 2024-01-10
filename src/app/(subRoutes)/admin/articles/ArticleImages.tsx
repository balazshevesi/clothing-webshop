"use client";

import { useEffect, useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";

export default function ArticleImages({
  imagesProp,
  setImagesProp,
}: {
  imagesProp?: string[];
  setImagesProp?: Function;
}) {
  const [images, setImages] = useState(imagesProp || [""]);
  useEffect(() => {
    setImagesProp && setImagesProp(images);
  }, [images]);

  return (
    <>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Images</AccordionTrigger>
          <AccordionContent className=" flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              {images.map((image, i) => {
                return (
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <Input
                        value={image}
                        onInput={(e: any) =>
                          setImages(images.toSpliced(i, 1, e.target.value))
                        }
                        className="w-full"
                        id="quantityInStock"
                        type="text"
                        placeholder="Image"
                      />
                      <Button
                        type="button"
                        onClick={() => setImages(images.toSpliced(i, 1))}
                      >
                        <TrashIcon className=" size-5" />
                      </Button>
                    </div>
                    <img className="max-w-44 rounded" src={image} alt="" />
                  </div>
                );
              })}
            </div>
            <Button
              type="button"
              onClick={() => setImages((prev) => [...prev, ""])}
            >
              <PlusIcon className=" size-5" />
            </Button>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
}
