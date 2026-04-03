"use client";

import { useState } from "react";
import RegisterPatient from "./register/page";

export default function ReceptionistPage() {
  const [showRegister, setShowRegister] = useState(false);

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="bg-blue-900 text-white px-8 py-4 flex items-center gap-3">
        <span className="text-2xl">🏥</span>
        <div>
          <h1 className="text-xl font-bold">Mi Clínica</h1>
          <p className="text-sm text-blue-200">Panel de recepción</p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-8">
        <h2 className="text-2xl font-bold text-blue-900 mb-6">
          Bienvenido, Recepcionista
        </h2>

        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-400 text-sm">No hay contenido todavía.</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-blue-900">Pacientes</h2>
            <button
              onClick={() => setShowRegister(true)}
              className="bg-blue-900 hover:bg-blue-800 text-white text-sm font-semibold px-5 py-2 rounded-md cursor-pointer transition-colors"
            >
              + Crear nuevo Paciente
            </button>
          </div>

          <p className="text-sm text-gray-400">
            No hay usuarios registrados todavía.
          </p>
        </div>
      </main>

      {showRegister && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 w-full max-w-md relative">
            <button
              onClick={() => setShowRegister(false)}
              className="absolute top-3 right-4 text-2xl text-gray-500 hover:text-gray-800 cursor-pointer leading-none"
            >
              ×
            </button>
            <RegisterPatient />
          </div>
        </div>
      )}
    </div>
  );
}
