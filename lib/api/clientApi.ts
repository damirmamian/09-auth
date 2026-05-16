import type { Note } from "@/types/note";
import { nextServer } from "./api";
import { User } from "@/types/user";

interface FetchNotesResponse {
    notes: Note[];
    totalPages: number;
}

type checkSessionRequest = {
    success: boolean;
}

type CreateNoteProps = Omit<Note, 'id' | 'createdAt' | 'updatedAt'>;

export async function fetchNotes(
    searchNote: string,
    page: number,
    tag?: string
) {
    const res = await nextServer.get<FetchNotesResponse>('/notes', {
        params: {
            search: searchNote,
            page: page,
            perPage: 12,
            tag,
        },
        headers: {
            Accept: 'application/json',
        },
    });

    return res.data;
}

export async function deleteNote(id: string): Promise<Note> {
    const result = await nextServer.delete<Note>(`/notes/${id}`, {
        headers: {
            Accept: 'application/json',
        },
    });
    
    return result.data;
}

export async function createNote({ title, content, tag }: CreateNoteProps): Promise<Note> {
    const create = await nextServer.post<Note>('/notes', {
        title,
        content,
        tag,
    }, {
        headers: {
            Accept: 'application/json',
        }
    }
    );

    return create.data;    
}
 
export async function fetchNoteById(id: string) {
    const res = await nextServer.get<Note>(`/notes/${id}`, {
        params: {
        },
        headers: {
            Accept: 'application/json',
        },
    });

    return res.data;
}

export async function register(email: string, password: string) {
    const res = await nextServer.post("/auth/register", {
        email,
        password,
    });

    return res.data;
}

export async function login(email: string, password: string) {
    const res = await nextServer.post("/auth/login", {
        email,
        password,
    });

    return res.data;
}

export async function logout() {
    await nextServer.post("/auth/logout");
}

export async function checkSession() {
    const res = await nextServer.get<checkSessionRequest>("/auth/session");
    return res.data;
}

export async function getMe() {
    const res = await nextServer.get<User>("/users/me");

    return res.data;
}

export async function updateMe( username: string) {
    const res = await nextServer.patch<User>("/users/me", {
        username,
    });

    return res.data;
}