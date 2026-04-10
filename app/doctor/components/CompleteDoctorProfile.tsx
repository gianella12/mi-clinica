"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type CompleteDoctorProfile = {
  specialty: string;
  licenseNumber: string;
};

export default function CompleteDoctorProfile({
  doctorId,
}: {
  doctorId: string;
}) {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<CompleteDoctorProfile>();
  const [error, setError] = useState("");
  const router = useRouter();

  const inputClass =
    "w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-800 focus:ring-2 focus:ring-blue-900";
  const labelClass = "block text-sm font-semibold text-gray-600 mb-1";
  const errorClass = "text-red-500 text-xs mt-1";

  async function onSubmit(data: CompleteDoctorProfile) {
    setError("");

    try {
      const res = await fetch(`/api/doctors/${doctorId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          specialty: data.specialty,
          licenseNumber: data.licenseNumber,
        }),
      });
      if (!res.ok) {
        throw new Error("Failed to update doctor profile");
      }

      toast.success("Perfil completado!");
      router.refresh();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "An error occurred";
      setError(message);
      toast.error(message);
    }
  }
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="bg-blue-900 px-8 py-6 flex items-center gap-3">
          <span className="text-3xl">🩺</span>
          <div>
            <h1 className="text-white text-xl font-bold tracking-wide">Mi Clínica</h1>
            <p className="text-blue-200 text-sm">Portal del médico</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="px-8 py-7">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-blue-900">Completar Perfil Profesional</h2>
            <p className="text-gray-500 text-sm mt-1">Ingresá tu información para activar tu cuenta</p>
          </div>

          {error && (
            <p className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg mb-5">
              {error}
            </p>
          )}

          <div className="mb-5">
            <label className={labelClass}>Especialidad</label>
            <input
              type="text"
              placeholder="Ej: Cardiología"
              className={inputClass}
              {...register("specialty", {
                required: "La especialidad es requerida",
              })}
            />
            {errors.specialty && (
              <p className={errorClass}>{errors.specialty.message}</p>
            )}
          </div>

          <div className="mb-7">
            <label className={labelClass}>Número de Licencia</label>
            <input
              type="text"
              placeholder="Ej: LIC-123456"
              className={inputClass}
              {...register("licenseNumber", {
                required: "El número de licencia es requerido",
              })}
            />
            {errors.licenseNumber && (
              <p className={errorClass}>{errors.licenseNumber.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-900 hover:bg-blue-800 disabled:opacity-50 text-white font-bold py-3 rounded-lg text-sm cursor-pointer transition-colors shadow-sm"
          >
            {isSubmitting ? "Guardando..." : "Completar Perfil"}
          </button>
        </form>
      </div>
    </div>
  );
}
