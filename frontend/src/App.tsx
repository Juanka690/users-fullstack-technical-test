import { useEffect, useState } from "react";
import type { User, PaginatedUsers, UserInput } from "./types/user";
import {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
} from "./api/user";
import { UsersTable } from "./components/users/UserTable.tsx";
import { UserDetail } from "./components/users/UserDetail";
import { UserForm } from "./components/users/UserForm";

type ViewMode = "list" | "detail" | "create" | "edit";
type Theme = "light" | "dark";

interface ToastState {
    type: "success" | "error";
    message: string;
}

const PAGE_SIZE = 10;

function App() {
    const [theme, setTheme] = useState<Theme>("dark");
    const [mode, setMode] = useState<ViewMode>("list");

    const [users, setUsers] = useState<User[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [total, setTotal] = useState(0);

    const [loadingList, setLoadingList] = useState(false);
    const [loadingDetail, setLoadingDetail] = useState(false);

    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    const [toast, setToast] = useState<ToastState | null>(null);

    // Cargar tema desde localStorage / prefers-color-scheme
    useEffect(() => {
        const stored = localStorage.getItem("theme") as Theme | null;
        if (stored === "light" || stored === "dark") {
            setTheme(stored);
        } else {
            const prefersDark = window.matchMedia?.(
                "(prefers-color-scheme: dark)"
            ).matches;
            setTheme(prefersDark ? "dark" : "light");
        }
    }, []);

    // Aplicar tema al <html>
    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === "dark" ? "light" : "dark"));
    };

    const showToast = (type: ToastState["type"], message: string) => {
        setToast({ type, message });
        setTimeout(() => setToast(null), 3000);
    };

    const loadUsers = async (pageToLoad = 1) => {
        try {
            setLoadingList(true);
            const res: PaginatedUsers = await getUsers(pageToLoad, PAGE_SIZE);
            setUsers(res.data);
            setPage(res.page);
            setTotalPages(res.totalPages || 1);
            setTotal(res.total);
        } catch (error) {
            console.error(error);
            showToast("error", "Error al cargar usuarios");
        } finally {
            setLoadingList(false);
        }
    };

    useEffect(() => {
        void loadUsers(1);
    }, []);

    const handleSelectUser = async (user: User) => {
        try {
            setLoadingDetail(true);
            const freshUser = await getUser(user.id);
            setSelectedUser(freshUser);
            setMode("detail");
        } catch (error) {
            console.error(error);
            showToast("error", "No se pudo cargar el detalle del usuario");
        } finally {
            setLoadingDetail(false);
        }
    };

    const handleCreateClick = () => {
        setSelectedUser(null);
        setMode("create");
    };

    const handleEditClick = async (user: User) => {
        try {
            setLoadingDetail(true);
            const freshUser = await getUser(user.id);
            setSelectedUser(freshUser);
            setMode("edit");
        } catch (error) {
            console.error(error);
            showToast("error", "No se pudo cargar el usuario para editar");
        } finally {
            setLoadingDetail(false);
        }
    };

    const handleDelete = async (user: User) => {
        const confirmed = window.confirm(
            `¿Seguro que quieres eliminar al usuario "${user.name}"?`
        );
        if (!confirmed) return;

        try {
            await deleteUser(user.id);
            showToast("success", "Usuario eliminado correctamente");
            if (selectedUser?.id === user.id) {
                setSelectedUser(null);
                setMode("list");
            }
            await loadUsers(page);
        } catch (error) {
            console.error(error);
            showToast("error", "No se pudo eliminar el usuario");
        }
    };

    const handleSubmitCreate = async (data: UserInput) => {
        await createUser(data);
        showToast("success", "Usuario creado correctamente");
        setMode("list");
        await loadUsers(page);
    };

    const handleSubmitEdit = async (data: UserInput) => {
        if (!selectedUser) return;
        await updateUser(selectedUser.id, data);
        showToast("success", "Usuario actualizado correctamente");
        setMode("detail");
        const fresh = await getUser(selectedUser.id);
        setSelectedUser(fresh);
        await loadUsers(page);
    };

    const handleBackToList = () => {
        setMode("list");
        setSelectedUser(null);
    };

    const handlePageChange = async (newPage: number) => {
        if (newPage < 1 || newPage > totalPages) return;
        await loadUsers(newPage);
    };

    return (
        <div className="app-shell">
            <header className="app-header">
                <div>
                    <h1>Gestión de usuarios</h1>
                    <p className="app-subtitle">
                        CRUD full-stack con paginación, detalle, validaciones y tema
                        claro/oscuro.
                    </p>
                </div>
                <div className="header-actions">
                    <button
                        type="button"
                        className="secondary"
                        onClick={toggleTheme}
                        aria-label="Cambiar tema"
                    >
                        {theme === "dark" ? "☀️ Modo claro" : "🌙 Modo oscuro"}
                    </button>
                </div>
            </header>

            {toast && (
                <div
                    className={`toast ${
                        toast.type === "success" ? "toast-success" : "toast-error"
                    }`}
                >
                    {toast.message}
                </div>
            )}

            <main className="app-main container">
                <section className="main-column">
                    <div className="list-header">
                        <button type="button" onClick={handleCreateClick}>
                            + Nuevo usuario
                        </button>
                    </div>

                    <UsersTable
                        users={users}
                        loading={loadingList}
                        page={page}
                        pageSize={PAGE_SIZE}
                        total={total}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                        onSelect={handleSelectUser}
                        onEdit={handleEditClick}
                        onDelete={handleDelete}
                    />
                </section>

                <aside className="side-column">
                    {mode === "detail" && selectedUser && !loadingDetail && (
                        <UserDetail
                            user={selectedUser}
                            onEdit={() => handleEditClick(selectedUser)}
                            onBackToList={handleBackToList}
                        />
                    )}

                    {mode === "create" && (
                        <UserForm
                            mode="create"
                            onSubmit={handleSubmitCreate}
                            onCancel={handleBackToList}
                        />
                    )}

                    {mode === "edit" && selectedUser && (
                        <UserForm
                            mode="edit"
                            initialUser={selectedUser}
                            loading={loadingDetail}
                            onSubmit={handleSubmitEdit}
                            onCancel={() => setMode("detail")}
                        />
                    )}

                    {mode === "list" && !selectedUser && (
                        <div className="card">
                            <div className="card-header">
                                <h2 className="card-title">Panel de detalle</h2>
                                <p className="card-subtitle">
                                    Selecciona un usuario de la tabla para ver su información o
                                    edítalo.
                                </p>
                            </div>
                            <div className="card-body">
                                <p className="muted">
                                    Aquí se mostrará el detalle del usuario seleccionado o el
                                    formulario de edición/creación.
                                </p>
                            </div>
                        </div>
                    )}
                </aside>
            </main>
        </div>
    );
}

export default App;
