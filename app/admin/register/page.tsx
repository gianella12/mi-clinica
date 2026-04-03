"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: "RECEPTIONIST" | "DOCTOR";
};

const inputClass = "w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-900";
const labelClass = "block text-sm font-semibold text-gray-600 mb-1";
const errorClass = "text-red-500 text-xs mt-1";

export default function RegisterUser() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    watch,
    reset
  } = useForm<RegisterFormData>();
  const [error, setError] = useState("");
  const password = watch("password");
  const router = useRouter();

  async function onSubmit(data: RegisterFormData) {
    setError("");

    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          password: data.password,
          role: data.role,
        }),
      });

      if (!res.ok) {
        throw new Error("The user was not created correctly.");
      }

      toast.success("Usuario creado exitosamente!");
      reset()
    } catch (error) {
      const message = error instanceof Error ? error.message : "An error occurred";
      setError(message);
      toast.error(message);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-lg font-bold text-blue-900 mb-5">Crear usuario</h2>

      {error && (
        <p className="bg-red-50 text-red-600 text-sm px-3 py-2 rounded-md mb-4">{error}</p>
      )}

      <div className="grid grid-cols-2 gap-x-3">
        <div className="mb-4">
          <label className={labelClass}>Nombre</label>
          <input
            type="text"
            placeholder="Nombre"
            className={inputClass}
            {...register("firstName", { required: "El nombre es requerido" })}
          />
          {errors.firstName && <p className={errorClass}>{errors.firstName.message}</p>}
        </div>

        <div className="mb-4">
          <label className={labelClass}>Apellido</label>
          <input
            type="text"
            placeholder="Apellido"
            className={inputClass}
            {...register("lastName", { required: "El apellido es requerido" })}
          />
          {errors.lastName && <p className={errorClass}>{errors.lastName.message}</p>}
        </div>
      </div>

      <div className="mb-4">
        <label className={labelClass}>Email</label>
        <input
          type="email"
          placeholder="correo@ejemplo.com"
          className={inputClass}
          {...register("email", {
            required: "El email es requerido",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Email inválido",
            },
          })}
        />
        {errors.email && <p className={errorClass}>{errors.email.message}</p>}
      </div>

      <div className="mb-4">
        <label className={labelClass}>Contraseña</label>
        <input
          type="password"
          placeholder="Mínimo 8 caracteres"
          className={inputClass}
          {...register("password", {
            required: "La contraseña es requerida",
            minLength: { value: 8, message: "Mínimo 8 caracteres" },
          })}
        />
        {errors.password && <p className={errorClass}>{errors.password.message}</p>}
      </div>

      <div className="mb-4">
        <label className={labelClass}>Confirmar contraseña</label>
        <input
          type="password"
          placeholder="Repetir contraseña"
          className={inputClass}
          {...register("confirmPassword", {
            required: "Confirma la contraseña",
            validate: (value) => value === password || "Las contraseñas no coinciden",
          })}
        />
        {errors.confirmPassword && <p className={errorClass}>{errors.confirmPassword.message}</p>}
      </div>

      <div className="mb-5">
        <label className={labelClass}>Rol</label>
        <select
          className={inputClass + " bg-white"}
          {...register("role", { required: "El rol es requerido" })}
        >
          <option value="">Seleccionar rol</option>
          <option value="RECEPTIONIST">Recepcionista</option>
          <option value="DOCTOR">Doctor</option>
        </select>
        {errors.role && <p className={errorClass}>{errors.role.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-900 hover:bg-blue-800 disabled:opacity-50 text-white font-bold py-2.5 rounded-md text-sm cursor-pointer transition-colors"
      >
        {isSubmitting ? "Creando..." : "Crear usuario"}
      </button>
    </form>
  );
}
