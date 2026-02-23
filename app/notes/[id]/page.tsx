import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { makeQueryClient } from "../../lib/queryClient";
import { fetchNoteById } from "../../lib/api";
import NoteDetailsClient from "./NoteDetails.client";

export default async function NoteDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const queryClient = makeQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", params.id],
    queryFn: () => fetchNoteById(params.id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}
