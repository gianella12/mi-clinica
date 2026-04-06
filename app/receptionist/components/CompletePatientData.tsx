"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "sonner";

type CompletePatientFormData = {
  medicalRecordNumber: string;
  dateOfBirth: string;
  phoneContact: string;
};

export default function CompletePatientData({
  patientId,
  onClose,
}: {
  patientId: string;
  onClose: () => void;
}) {
  const { handleSubmit, register, formState: { errors, isSubmitting } } = useForm<CompletePatientFormData>();
  const [error, setError] = useState("");

  const inputClass = "w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-900";
  const labelClass = "block text-sm font-semibold text-gray-600 mb-1";
  const errorClass = "text-red-500 text-xs mt-1";

  async function onSubmit(data: CompletePatientFormData) {
    setError("");

    try {
      const res = await fetch(`/api/patients/${patientId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          medicalRecordNumber: data.medicalRecordNumber,
          dateOfBirth: data.dateOfBirth,
          phoneContact: data.phoneContact,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to update patient data");
      }

      toast.success("Datos del paciente completados!");
      onClose();
    } catch (error) {
      const message = error instanceof Error ? error.message : "An error occurred";
      setError(message);
      toast.error(message);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-lg font-bold text-blue-900 mb-5">Completar datos del paciente</h2>

      {error && (
        <p className="bg-red-50 text-red-600 text-sm px-3 py-2 rounded-md mb-4">{error}</p>
      )}

      <div className="mb-4">
        <label className={labelClass}>Número de Historia Clínica</label>
        <input
          type="text"
          placeholder="HC-2024-001"
          className={inputClass}
          {...register("medicalRecordNumber", { 
            required: "El número de historia es requerido" 
          })}
        />
        {errors.medicalRecordNumber && <p className={errorClass}>{errors.medicalRecordNumber.message}</p>}
      </div>

      <div className="mb-4">
        <label className={labelClass}>Fecha de Nacimiento</label>
        <input
          type="date"
          className={inputClass}
          {...register("dateOfBirth", { 
            required: "La fecha de nacimiento es requerida" 
          })}
        />
        {errors.dateOfBirth && <p className={errorClass}>{errors.dateOfBirth.message}</p>}
      </div>

      <div className="mb-5">
        <label className={labelClass}>Teléfono de Contacto</label>
        <input
          type="tel"
          placeholder="+54 9 11 1234-5678"
          className={inputClass}
          {...register("phoneContact", { 
            required: "El teléfono es requerido" 
          })}
        />
        {errors.phoneContact && <p className={errorClass}>{errors.phoneContact.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-900 hover:bg-blue-800 disabled:opacity-50 text-white font-bold py-2.5 rounded-md text-sm cursor-pointer transition-colors"
      >
        {isSubmitting ? "Guardando..." : "Completar datos"}
      </button>
    </form>
  );
}