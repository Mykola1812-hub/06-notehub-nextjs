"use client";

import { useMemo, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import css from "./page.module.css";

import SearchBox from "../../components/SearchBox/SearchBox";
import Pagination from "../../components/Pagination/Pagination";
import NoteList from "../../components/NoteList/NoteList";
import Modal from "../../components/Modal/Modal";
import NoteForm from "../../components/NoteForm/NoteForm";

import { fetchNotes } from "../../lib/api";

const PER_PAGE = 12;

export default function NotesClient() {
  const [page, setPage] = useState<number>(1);
  const [searchInput, setSearchInput] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const debouncedSearch = useDebouncedCallback((value: string) => {
    setPage(1);
    setSearch(value.trim());
  }, 400);

  const queryKey = useMemo(() => ["notes", { page, search }], [page, search]);

  const { data, isLoading, isError } = useQuery({
    queryKey,
    queryFn: () =>
      fetchNotes({
        page,
        perPage: PER_PAGE,
        search: search || undefined,
      }),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 0;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox
          value={searchInput}
          onChange={(value) => {
            setSearchInput(value);
            debouncedSearch(value);
          }}
        />

        {totalPages > 1 && (
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        )}

        <button
          className={css.button}
          type="button"
          onClick={() => setIsModalOpen(true)}
        >
          Create note +
        </button>
      </header>

      {isLoading && <p>Loading...</p>}
      {isError && <p>Something went wrong. Try again.</p>}

      {notes.length > 0 && <NoteList notes={notes} />}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <NoteForm onClose={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
}
