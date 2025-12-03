import { api } from "./client";
import type { PaginatedUsers, User, UserInput } from "../types/user";

export const getUsers = async (
    page = 1,
    pageSize = 10
): Promise<PaginatedUsers> => {
    const res = await api.get<PaginatedUsers>("/users", {
        params: { page, pageSize }
    });
    return res.data;
};

export const getUser = async (id: number): Promise<User> => {
    const res = await api.get<User>(`/users/${id}`);
    return res.data;
};

export const createUser = async (payload: UserInput): Promise<User> => {
    const res = await api.post<User>("/users", payload);
    return res.data;
};

export const updateUser = async (
    id: number,
    payload: UserInput
): Promise<User> => {
    const res = await api.put<User>(`/users/${id}`, payload);
    return res.data;
};

export const deleteUser = async (id: number): Promise<void> => {
    await api.delete(`/users/${id}`);
};
