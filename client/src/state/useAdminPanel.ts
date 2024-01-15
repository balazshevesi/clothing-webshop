import getCookie from "@/utils/getCookie";

import { create } from "zustand";

interface UseAdminPanel {
  listings: any[];
  articles: any[];
  brands: any[];
  categories: any[];
  plannedSales: any[];

  fetchAndSetListings: Function;
  fetchAndSetArticles: Function;
  fetchAndSetBrands: Function;
  fetchAndSetCategories: Function;
  fetchAndSetPlannedSales: Function;

  fetchListing: Function;
  fetchArticle: Function;
  fetchBrand: Function;
  fetchCategory: Function;
  fetchPlannedSale: Function;
}

export const useAdminPanel = create<UseAdminPanel>()((set) => ({
  listings: [],
  articles: [],
  brands: [],
  categories: [],
  plannedSales: [],

  fetchAndSetListings: async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_HOST}/listings`,
    );
    const data = await response.json();
    set((state: any) => ({ listings: data.content }));
  },
  fetchAndSetArticles: async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_HOST}/articles`,
    );
    const data = await response.json();
    set((state: any) => ({ articles: data.content }));
  },
  fetchAndSetBrands: async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_HOST}/brands`,
    );
    const data = await response.json();
    set((state: any) => ({ brands: data.content }));
  },
  fetchAndSetCategories: async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_HOST}/categories`,
    );
    const data = await response.json();
    set((state: any) => ({ categories: data.content }));
  },
  fetchAndSetPlannedSales: async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_HOST}/planned-sales`,
    );
    const data = await response.json();
    set((state: any) => ({ plannedSales: data.content }));
  },

  fetchListing: async (listingId: string) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_HOST}/listing/${listingId}`,
    );
    const data = await response.json();
    return data.content;
  },
  fetchArticle: async (articleId: string) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_HOST}/article/${articleId}`,
    );
    const data = await response.json();
    return data.content;
  },
  fetchBrand: async (brandId: string) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_HOST}/brand/${brandId}`,
    );
    const data = await response.json();
    return data.content;
  },
  fetchCategory: async (categoryId: string) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_HOST}/category/${categoryId}`,
    );
    const data = await response.json();
    return data.content;
  },
  fetchPlannedSale: async (plannedSaleId: string) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_HOST}/planned-sale/${plannedSaleId}`,
    );
    const data = await response.json();
    return data.content;
  },
}));
