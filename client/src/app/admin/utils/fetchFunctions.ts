export const fetchListings = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_HOST}/listings`,
  );
  const data = await response.json();
  return data.content;
};

export const fetchArticles = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_HOST}/articles`,
  );
  const data = await response.json();
  return data.content;
};

export const fetchBrands = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_HOST}/brands`,
  );
  const data = await response.json();
  return data.content;
};

export const fetchCategories = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_HOST}/categories`,
  );
  const data = await response.json();
  return data.content;
};

export const fetchPlannedSales = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_HOST}/planned-sales`,
  );
  const data = await response.json();
  return data.content;
};

export const fetchListing = async (listingId: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_HOST}/listing/${listingId}`,
  );
  const data = await response.json();
  return data.content;
};

export const fetchArticle = async (articleId: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_HOST}/article/${articleId}`,
  );
  const data = await response.json();
  return data.content;
};

export const fetchBrand = async (brandId: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_HOST}/brand/${brandId}`,
  );
  const data = await response.json();
  return data.content;
};

export const fetchCategory = async (categoryId: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_HOST}/category/${categoryId}`,
  );
  const data = await response.json();
  return data.content;
};

export const fetchPlannedSale = async (plannedSaleId: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_HOST}/planned-sale/${plannedSaleId}`,
  );
  const data = await response.json();
  return data.content;
};
