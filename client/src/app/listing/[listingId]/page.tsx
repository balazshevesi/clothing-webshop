import { headers } from "next/headers";

import MostPopular from "@/components/MostPopular";
import Container from "@/components/general/Container";
import Title2 from "@/components/general/Title2";

import Content from "./Content";

function FetchFailed() {
  return (
    <Container>
      <Title2>something went wrong</Title2>
    </Container>
  );
}

interface Page {
  params: { listingId: string };
}
export default async function Page({ params }: Page) {
  let listing;
  try {
    const response: any = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_HOST}/listing/${params.listingId}`,
      {
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    if (!response.ok) return <FetchFailed />;
    listing = (await response.json()).content;
  } catch {
    return <FetchFailed />;
  }

  return (
    <>
      <Content listing={listing} />
      <MostPopular />
    </>
  );
}
