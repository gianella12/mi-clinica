"use client";

import { useEffect, useState } from "react";
import { DashboardData } from "@/types";

export default function ReceptionistDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/dashboard/receptionist");
        const result = await res.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <p className="text-blue-900 font-semibold text-lg">Cargando...</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="bg-blue-900 text-white px-8 py-5 flex items-center gap-3 shadow-md">
        <span className="text-2xl">🏥</span>
        <div>
          <h1 className="text-xl font-bold tracking-wide">Mi Clínica</h1>
          <p className="text-sm text-blue-100">Panel de recepción</p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-8">
        <h2 className="text-2xl font-bold text-blue-900 mb-6">
          Bienvenido, Recepcionista
        </h2>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 flex flex-col gap-2 border-l-4 border-blue-700">
            <span className="text-3xl">📅</span>
            <h3 className="font-semibold text-gray-800 text-base">Turnos</h3>
            <p className="text-4xl font-bold text-blue-900">
              {data?.appointmentsCount || 0}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 flex flex-col gap-2 border-l-4 border-teal-600">
            <span className="text-3xl">👤</span>
            <h3 className="font-semibold text-gray-800 text-base">Pacientes</h3>
            <p className="text-4xl font-bold text-blue-900">
              {data?.patients.length || 0}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 flex flex-col gap-2 border-l-4 border-indigo-600">
            <span className="text-3xl">🩺</span>
            <h3 className="font-semibold text-gray-800 text-base">Médicos</h3>
            <p className="text-4xl font-bold text-blue-900">
              {data?.doctors.length || 0}
            </p>
          </div>
        </div>

        {/* Pacientes */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-bold text-blue-900 mb-4 border-b border-gray-200 pb-3">
            Pacientes Registrados
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-blue-50">
                <tr>
                  <th className="text-left py-3 px-3 text-blue-900 font-semibold">
                    Nombre
                  </th>
                  <th className="text-left py-3 px-3 text-blue-900 font-semibold">
                    Email
                  </th>
                  <th className="text-left py-3 px-3 text-blue-900 font-semibold">
                    Teléfono
                  </th>
                  <th className="text-left py-3 px-3 text-blue-900 font-semibold">
                    Historia Clínica
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.patients.map((patient) => (
                  <tr
                    key={patient.id}
                    className="border-b border-gray-100 hover:bg-blue-50 transition-colors"
                  >
                    <td className="py-3 px-3 text-gray-900 font-medium">
                      {patient.user.firstName} {patient.user.lastName}
                    </td>
                    <td className="py-3 px-3 text-gray-700">
                      {patient.user.email}
                    </td>
                    <td className="py-3 px-3 text-gray-700">
                      {patient.phoneContact || "-"}
                    </td>
                    <td className="py-3 px-3 text-gray-700">
                      {patient.medicalRecordNumber || "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 mt-1">
          <h3 className="text-lg font-bold text-blue-900 mb-4 border-b border-gray-200 pb-3">
            Médicos Registrados
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-blue-50">
                <tr>
                  <th className="text-left py-3 px-3 text-blue-900 font-semibold">
                    Nombre
                  </th>
                  <th className="text-left py-3 px-3 text-blue-900 font-semibold">
                    Email
                  </th>
                  <th className="text-left py-3 px-3 text-blue-900 font-semibold">
                    Especialidad
                  </th>
                  <th className="text-left py-3 px-3 text-blue-900 font-semibold">
                    Licencia
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.doctors.map((doctor) => (
                  <tr
                    key={doctor.id}
                    className="border-b border-gray-100 hover:bg-blue-50 transition-colors"
                  >
                    <td className="py-3 px-3 text-gray-900 font-medium">
                      {doctor.user.firstName} {doctor.user.lastName}
                    </td>
                    <td className="py-3 px-3 text-gray-700">
                      {doctor.user.email}
                    </td>
                    <td className="py-3 px-3 text-gray-700">
                      {doctor.specialty || "Pendiente"}
                    </td>
                    <td className="py-3 px-3 text-gray-700">
                      {doctor.licenseNumber || "Pendiente"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
