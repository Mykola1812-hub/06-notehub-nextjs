import axios from "axios";
import type { Note, NoteTag } from "../types/note";

const BASE_URL = "https://notehub-public.goit.study/api";

export interface FetchNotesParams {
  page: number;
  perPage: number;
  search?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface CreateNotePayload {
  title: string;
  content: string;
  tag: NoteTag;
}

export interface DeleteNoteResponse {
  note: Note;
}

const api = axios.create({
  baseURL: BASE_URL,
});

function getAuthHeaders() {
  const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

  return {
    Authorization: `Bearer ${token}`,
  };
}

export async function fetchNotes(params: FetchNotesParams): Promise<FetchNotesResponse> {
  const response = await api.get<FetchNotesResponse>("/notes", {
    params: {
      ...params,
    },
    headers: getAuthHeaders(),
  });

  return response.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const response = await api.get<Note>(`/notes/${id}`, {
    headers: getAuthHeaders(),
  });

  return response.data;
}

export async function createNote(payload: CreateNotePayload): Promise<Note> {
  const response = await api.post<Note>("/notes", payload, {
    headers: getAuthHeaders(),
  });

  return response.data;
}

export async function deleteNote(id: string): Promise<DeleteNoteResponse> {
  const response = await api.delete<DeleteNoteResponse>(`/notes/${id}`, {
    headers: getAuthHeaders(),
  });

  return response.data;
}