import type { User } from "../../types/user";

interface UsersTableProps {
    users: User[];
    loading: boolean;
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    onSelect: (user: User) => void;
    onEdit: (user: User) => void;
    onDelete: (user: User) => void;
}

export const UsersTable = ({
                               users,
                               loading,
                               page,
                               pageSize,
                               total,
                               totalPages,
                               onPageChange,
                               onSelect,
                               onEdit,
                               onDelete
                           }: UsersTableProps) => {
    return (
        <div className="card">
            <div className="card-header">
                <div>
                    <h2 className="card-title">Usuarios</h2>
                    <p className="card-subtitle">
                        Listado paginado. Total: <strong>{total}</strong>
                    </p>
                </div>
                <span className="tag">
          Página {page} / {totalPages || 1} · {pageSize} por página
        </span>
            </div>

            <div className="card-body">
                {loading ? (
                    <div className="empty-state">Cargando usuarios...</div>
                ) : users.length === 0 ? (
                    <div className="empty-state">No hay usuarios registrados.</div>
                ) : (
                    <table>
                        <thead>
                        <tr>
                            <th style={{ width: "10%" }}>ID</th>
                            <th style={{ width: "30%" }}>Nombre</th>
                            <th style={{ width: "30%" }}>Email</th>
                            <th style={{ width: "10%" }}>Edad</th>
                            <th style={{ width: "20%" }}>Acciones</th>
                        </tr>
                        </thead>
                        <tbody>
                        {users.map((u) => (
                            <tr key={u.id}>
                                <td>{u.id}</td>
                                <td>
                                    <button
                                        type="button"
                                        className="link-button"
                                        onClick={() => onSelect(u)}
                                    >
                                        {u.name}
                                    </button>
                                </td>
                                <td>{u.email}</td>
                                <td>{u.age ?? "-"}</td>
                                <td>
                                    <div className="table-actions">
                                        <button
                                            type="button"
                                            className="secondary"
                                            onClick={() => onEdit(u)}
                                        >
                                            Editar
                                        </button>
                                        <button
                                            type="button"
                                            className="danger"
                                            onClick={() => onDelete(u)}
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}
            </div>

            <div className="card-footer pagination">
                <button
                    type="button"
                    className="secondary"
                    disabled={page <= 1 || loading}
                    onClick={() => onPageChange(page - 1)}
                >
                    ← Anterior
                </button>
                <span>
          Página {page} de {totalPages || 1}
        </span>
                <button
                    type="button"
                    className="secondary"
                    disabled={page >= totalPages || loading || totalPages === 0}
                    onClick={() => onPageChange(page + 1)}
                >
                    Siguiente →
                </button>
            </div>
        </div>
    );
};
