"use client";

import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import getCookie from "@/utils/getCookie";

import Title2 from "@/components/general/Title2";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import { TrashIcon } from "@heroicons/react/24/solid";

import ArticleImages from "./ArticleImages";
import {
  GenericInputSchema,
  GenericNumberInputSchema,
  SizeInputSchema,
} from "@/inputValidation/schema";
import { safeParse } from "valibot";

export default function ArticleForm({ ArticleData }: { ArticleData?: any }) {
  const router = useRouter();

  const [name, setName] = useState(ArticleData ? ArticleData.name : "");
  const [nameValidationMsg, setNameValidationMsg] = useState("");

  const [price, setPrice] = useState(ArticleData ? ArticleData.price : "");
  const [priceValidationMsg, setPriceValidationMsg] = useState("");

  const [quantityInStock, setQuantityInStock] = useState(
    ArticleData ? ArticleData.quantityInStock : "",
  );
  const [quantityInStockValidationMsg, setQuantityInStockValidationMsg] =
    useState("");

  const [brands, setBrands] = useState([""]);
  const [brand, setBrand] = useState(ArticleData ? ArticleData.brand : "");
  const [brandValidationMsg, setBrandValidationMsg] = useState("");

  const [categories, setCategories] = useState([""]);
  const [category, setCategory] = useState(
    ArticleData ? ArticleData.category : "",
  );
  const [categoryValidationMsg, setCategoryValidationMsg] = useState("");

  const [description, setDescription] = useState(
    ArticleData ? ArticleData.description : "",
  );
  const [descriptionValidationMsg, setDescriptionValidationMsg] = useState("");

  const [images, setImages] = useState(ArticleData ? ArticleData.images : [""]);
  const [imagesValidationMsg, setImagesValidationMsg] = useState("");

  const [size, setSize] = useState(ArticleData ? ArticleData.size : "");
  const [sizeValidationMsg, setSizeValidationMsg] = useState("");

  const [color, setColor] = useState(ArticleData ? ArticleData.color : "");
  const [colorValidationMsg, setColorValidationMsg] = useState("");

  const [garmentCare, setGarmentCare] = useState(
    ArticleData ? ArticleData.garmentCare : "",
  );
  const [garmentCareValidationMsg, setGarmentCareValidationMsg] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState(false);

  const getBrands = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_HOST}/brands`,
    );
    const data = await response.json();
    const content = data.content;
    setBrands(content);
  };

  const getCategories = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_HOST}/categories`,
    );
    const data = await response.json();
    const content = data.content;
    setCategories(content);
  };

  useEffect(() => {
    getBrands();
    getCategories();
  }, []);

  const handleDelete = async () => {
    const isSure = confirm(
      `Are you sure you want to delete ${ArticleData.name}?`,
    );
    if (!isSure) return;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_HOST}/admin/article/${ArticleData.id}`,
      {
        method: "delete",
        headers: {
          authorization: getCookie("authorization")!,
        },
      },
    );
    const data = await response.json();
    if (!response.ok) {
      setServerError(true);
      return;
    }
    router.push("/admin/articles");
  };

  const handleArticle = async (e: any) => {
    e.preventDefault();

    let validInput = true;
    const nameValStatus = safeParse(GenericInputSchema, name);
    if (!nameValStatus.success) {
      setNameValidationMsg(nameValStatus.issues[0].message);
      validInput = false;
    } else setNameValidationMsg("");

    const priceValStatus = safeParse(GenericNumberInputSchema, +price);
    if (!priceValStatus.success) {
      setPriceValidationMsg(priceValStatus.issues[0].message);
      validInput = false;
    } else setPriceValidationMsg("");

    const quantityValStatus = safeParse(
      GenericNumberInputSchema,
      +quantityInStock,
    );
    if (!quantityValStatus.success) {
      setQuantityInStockValidationMsg(quantityValStatus.issues[0].message);
      validInput = false;
    } else setQuantityInStockValidationMsg("");

    const descriptionValStatus = safeParse(GenericInputSchema, description);
    if (!descriptionValStatus.success) {
      setDescriptionValidationMsg(descriptionValStatus.issues[0].message);
      validInput = false;
    } else setDescriptionValidationMsg("");

    const garmentCareValStatus = safeParse(GenericInputSchema, garmentCare);
    if (!garmentCareValStatus.success) {
      setGarmentCareValidationMsg(garmentCareValStatus.issues[0].message);
      validInput = false;
    } else setGarmentCareValidationMsg("");

    const imagesValStatus = safeParse(GenericInputSchema, images[0]);
    if (!imagesValStatus.success) {
      setImagesValidationMsg(imagesValStatus.issues[0].message);
      validInput = false;
    } else setImagesValidationMsg("");

    const colorValStatus = safeParse(GenericInputSchema, color);
    if (!colorValStatus.success) {
      setColorValidationMsg(colorValStatus.issues[0].message);
      validInput = false;
    } else setColorValidationMsg("");

    const brandValStatus = safeParse(GenericInputSchema, brand);
    if (!brandValStatus.success) {
      setBrandValidationMsg(brandValStatus.issues[0].message);
      validInput = false;
    } else setBrandValidationMsg("");

    const categoryValStatus = safeParse(GenericInputSchema, category);
    if (!categoryValStatus.success) {
      setCategoryValidationMsg(categoryValStatus.issues[0].message);
      validInput = false;
    } else setCategoryValidationMsg("");

    const sizeValStatus = safeParse(SizeInputSchema, size);
    if (!sizeValStatus.success) {
      setSizeValidationMsg(sizeValStatus.issues[0].message);
      validInput = false;
    } else setSizeValidationMsg("");

    if (!validInput) return;

    setIsLoading(true);

    const submitionData = {
      name,
      price,
      quantityInStock,
      brand,
      category,
      description,
      garmentCare,
      images,
      size,
      color,
    };
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_HOST}/admin/article${
          ArticleData ? `/${ArticleData.id}` : ""
        }`,
        {
          method: ArticleData ? "put" : "post",
          body: JSON.stringify(submitionData),
          headers: {
            authorization: getCookie("authorization")!,
          },
        },
      );
      if (!response.ok) {
        setIsLoading(false);
        setServerError(true);
        return;
      } else setServerError(false);
      const data = await response.json();
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
    }, 2000);
  };
  return (
    <div className="max-w-xl">
      <Title2>
        {ArticleData ? `Edit ${ArticleData.name}` : "Add new article"}
      </Title2>
      <form onSubmit={handleArticle} className="space-y-4 ">
        <Input
          value={name}
          onInput={(e: any) => setName(e.target.value)}
          warningText={nameValidationMsg}
          className="w-full"
          type="name"
          id="name"
          placeholder="Name"
        />
        <Input
          value={price}
          onInput={(e: any) => setPrice(e.target.value)}
          warningText={priceValidationMsg}
          className="w-full"
          id="description"
          type="number"
          placeholder="Price (SEK)"
        />
        <Input
          value={quantityInStock}
          onInput={(e: any) => setQuantityInStock(e.target.value)}
          warningText={quantityInStockValidationMsg}
          className="w-full"
          id="quantityInStock"
          type="number"
          placeholder="Quantity In Stock"
        />
        <Select value={brand} onValueChange={(value) => setBrand(value)}>
          <SelectTrigger>
            <SelectValue placeholder={"Select Brand"} />
          </SelectTrigger>
          <SelectContent>
            {brands.map((brand: any) => (
              <SelectItem value={brand.name}>{brand.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        {!!brandValidationMsg && (
          <div className=" font-medium text-red-500">{brandValidationMsg}</div>
        )}
        <Select value={category} onValueChange={(value) => setCategory(value)}>
          <SelectTrigger className="">
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent>
            {/* <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem> */}
            {categories.map((category: any) => (
              <SelectItem value={category.name}>{category.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        {!!categoryValidationMsg && (
          <div className=" font-medium text-red-500">
            {categoryValidationMsg}
          </div>
        )}
        <Textarea
          value={description}
          onInput={(e: any) => setDescription(e.target.value)}
          warningText={descriptionValidationMsg}
          placeholder="Description"
        ></Textarea>
        <Textarea
          value={garmentCare}
          onInput={(e: any) => setGarmentCare(e.target.value)}
          warningText={garmentCareValidationMsg}
          placeholder="Garment Care"
        ></Textarea>
        <ArticleImages imagesProp={images} setImagesProp={setImages} />
        {!!imagesValidationMsg && (
          <div className=" font-medium text-red-500">{imagesValidationMsg}</div>
        )}
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Properties</AccordionTrigger>
            <AccordionContent className=" flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Select value={size} onValueChange={(state) => setSize(state)}>
                  <SelectTrigger className="">
                    <SelectValue placeholder="Select Size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="XS">XS</SelectItem>
                    <SelectItem value="S">S</SelectItem>
                    <SelectItem value="M">M</SelectItem>
                    <SelectItem value="L">L</SelectItem>
                    <SelectItem value="XL">XL</SelectItem>
                  </SelectContent>
                </Select>
                {!!sizeValidationMsg && (
                  <div className="font-medium text-red-500">
                    {sizeValidationMsg}
                  </div>
                )}
                <Input
                  value={color}
                  onInput={(e: any) => setColor(e.target.value)}
                  warningText={colorValidationMsg}
                  className="w-full"
                  id="quantityInStock"
                  type="text"
                  placeholder="Color"
                />
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <div className=" flex gap-4">
          <Button type="submit" isLoading={isLoading} disabled={isLoading}>
            {ArticleData ? "Edit" : "Add"}
          </Button>
          {!!ArticleData && (
            <Button
              variant="destructive"
              size="icon"
              type="button"
              onClick={handleDelete}
            >
              <TrashIcon className="size-5" />
            </Button>
          )}
        </div>
        {!!serverError && (
          <div className=" animate-fade-up text-red-400 duration-200">
            Server error, try again later
          </div>
        )}
        {!!success && (
          <div className=" animate-fade-up text-green-400 duration-200">
            {ArticleData ? "Edited successfully" : "Added successfully"}
          </div>
        )}
      </form>
    </div>
  );
}
