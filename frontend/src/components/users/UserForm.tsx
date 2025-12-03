import { useEffect, useState } from "react";
import type { User, UserInput } from "../../types/user";

interface UserFormProps {
    mode: "create" | "edit";
    initialUser?: User | null;
    loading?: boolean;
    onSubmit: (data: UserInput) => Promise<void>;
    onCancel: () => void;
}

export const UserForm = ({
                             mode,
                             initialUser,
                             loading = false,
                             onSubmit,
                             onCancel
                         }: UserFormProps) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState<string>("");
    const [errors, setErrors] = useState<string[]>([]);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (initialUser) {
            setName(initialUser.name);
            setEmail(initialUser.email);
            setAge(
                initialUser.age !== null && initialUser.age !== undefined
                    ? String(initialUser.age)
                    : ""
            );
        } else {
            setName("");
            setEmail("");
            setAge("");
        }
        setErrors([]);
    }, [initialUser, mode]);

    const validate = (): string[] => {
        const errs: string[] = [];

        if (!name.trim()) errs.push("El nombre es obligatorio.");
        if (!email.trim()) {
            errs.push("El email es obligatorio.");
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errs.push("El email no tiene un formato válido.");
        }
        if (age) {
            const n = Number(age);
            if (Number.isNaN(n) || n < 0 || !Number.isInteger(n)) {
                errs.push("La edad debe ser un número entero mayor o igual a 0.");
            }
        }

        return errs;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const errs = validate();
        setErrors(errs);
        if (errs.length > 0) return;

        try {
            setSubmitting(true);
            await onSubmit({
                name: name.trim(),
                email: email.trim(),
                age: age ? Number(age) : null
            });
        } catch (error: any) {
            if (error?.response?.data?.message) {
                setErrors([error.response.data.message]);
            } else if (error?.response?.data?.errors) {
                const backendErrors = error.response.data.errors.map(
                    (e: any) => e.message ?? String(e)
                );
                setErrors(backendErrors);
            } else {
                setErrors(["Ha ocurrido un error al guardar el usuario."]);
            }
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="card">
            <div className="card-header">
                <div>
                    <h2 className="card-title">
                        {mode === "create" ? "Crear usuario" : "Editar usuario"}
                    </h2>
                    <p className="card-subtitle">
                        Completa los campos y guarda para {mode === "create" ? "crear" : "actualizar"} el registro.
                    </p>
                </div>
            </div>

            <div className="card-body">
                {errors.length > 0 && (
                    <div className="alert alert-error">
                        <ul>
                            {errors.map((err) => (
                                <li key={err}>{err}</li>
                            ))}
                        </ul>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="form-grid">
                    <div className="form-field">
                        <label htmlFor="name">Nombre</label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            disabled={submitting || loading}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Ej: Juan Pérez"
                        />
                    </div>

                    <div className="form-field">
                        <label htmlFor="email">Correo electrónico</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            disabled={submitting || loading}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Ej: juan@example.com"
                        />
                    </div>

                    <div className="form-field">
                        <label htmlFor="age">Edad</label>
                        <input
                            id="age"
                            type="number"
                            min={0}
                            value={age}
                            disabled={submitting || loading}
                            onChange={(e) => setAge(e.target.value)}
                            placeholder="Ej: 25 (opcional)"
                        />
                    </div>

                    <div className="form-actions">
                        <button type="submit" disabled={submitting || loading}>
                            {submitting || loading
                                ? "Guardando..."
                                : mode === "create"
                                    ? "Crear usuario"
                                    : "Guardar cambios"}
                        </button>
                        <button
                            type="button"
                            className="secondary"
                            onClick={onCancel}
                            disabled={submitting || loading}
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
