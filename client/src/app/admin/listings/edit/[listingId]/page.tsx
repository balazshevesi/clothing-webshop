"use client";

import ListingForm from "../../ListingForm";
import { useAdminPanel } from "@/state/useAdminPanel";
import { useQuery } from "@tanstack/react-query";

export default function Page({ params }: { params: { listingId: string } }) {
  const { fetchListing } = useAdminPanel();
  const { data, isLoading } = useQuery({
    queryKey: ["listingId" + params.listingId],
    queryFn: () => fetchListing(params.listingId),
  });
  if (isLoading || !data) return <div>Loading...</div>;
  return <ListingForm listingContent={data} />;
}
