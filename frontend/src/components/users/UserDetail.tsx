import type { User } from "../../types/user";

interface UserDetailProps {
    user: User;
    onEdit: () => void;
    onBackToList: () => void;
}

export const UserDetail = ({ user, onEdit, onBackToList }: UserDetailProps) => {
    return (
        <div className="card detail-card">
            <div className="card-header">
                <div>
                    <h2 className="card-title">Detalle del usuario</h2>
                    <p className="card-subtitle">
                        Información básica del usuario seleccionado.
                    </p>
                </div>
                <span className="tag">ID {user.id}</span>
            </div>

            <div className="card-body detail-grid">
                <div>
                    <p className="detail-label">Nombre</p>
                    <p className="detail-value">{user.name}</p>
                </div>
                <div>
                    <p className="detail-label">Email</p>
                    <p className="detail-value">{user.email}</p>
                </div>
                <div>
                    <p className="detail-label">Edad</p>
                    <p className="detail-value">{user.age ?? "No registrada"}</p>
                </div>
            </div>

            <div className="card-footer actions">
                <button type="button" onClick={onEdit}>
                    Editar usuario
                </button>
                <button
                    type="button"
                    className="secondary"
                    onClick={onBackToList}
                >
                    Volver al listado
                </button>
            </div>
        </div>
    );
};
