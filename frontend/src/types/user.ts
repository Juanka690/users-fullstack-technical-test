export interface User {
    id: number;
    name: string;
    email: string;
    age: number | null;
}

export interface PaginatedUsers {
    data: User[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
}

export interface UserInput {
    name: string;
    email: string;
    age?: number | null;
}
