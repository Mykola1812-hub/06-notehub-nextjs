import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import NotesClient from "./Notes.client";
import { fetchNotes } from "../../lib/api";
import { makeQueryClient } from "../../lib/queryClient";

const PER_PAGE = 12;

export default async function NotesPage() {
  const queryClient = makeQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", { page: 1, search: "" }],
    queryFn: () =>
      fetchNotes({
        page: 1,
        perPage: PER_PAGE,
        search: undefined,
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
    </HydrationBoundary>
  );
}
