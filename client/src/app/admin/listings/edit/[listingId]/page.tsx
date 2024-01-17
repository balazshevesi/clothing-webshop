"use client";

import ListingForm from "../../ListingForm";
import { useAdminPanel } from "@/app/admin/utils/fetchFunctions";
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
