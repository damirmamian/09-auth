import { Note } from "@/types/note";
import { nextServer } from "./api";
import { cookies } from "next/headers";
import { User } from "@/types/user";

interface FetchNotesResponse {
    notes: Note[];
    totalPages: number;
}

type checkSessionRequest = {
    success: boolean;
}

export async function fetchNotes(
    searchNote: string,
    page: number,
    tag?: string
) {
    const cookieStore = await cookies();

    const res = await nextServer.get<FetchNotesResponse>('/notes', {
        params: {
            search: searchNote,
            page: page,
            perPage: 12,
            tag,
        },
        headers: {
            Accept: 'application/json',
            Cookie: cookieStore.toString(),
        },
    });

    return res.data;
};

export async function fetchNoteById(id: string) {
    const cookieStore = await cookies();

    const res = await nextServer.get<Note>(`/notes/${id}`, {
        params: {
        },
        headers: {
            Accept: 'application/json',
            Cookie: cookieStore.toString(),
        },
    });

    return res.data;
};

export async function checkSession() {
    const cookieStore = await cookies();

    const res = await nextServer.get<checkSessionRequest>("/auth/session", {
        headers: {
            Accept: 'application/json',
            Cookie: cookieStore.toString(),
        },
    }
    );
    return res;
};

export async function getMe() {
    const cookieStore = await cookies();

    const res = await nextServer.get<User>("/users/me", {
        headers: {
            Accept: 'application/json',
            Cookie: cookieStore.toString(),
        },
    });

    return res.data;
}