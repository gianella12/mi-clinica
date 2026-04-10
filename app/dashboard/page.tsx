"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import ReceptionistDashboard from "@/app/dashboard/components/ReceptionistDashboard";
import PatientDashboard from "@/app/dashboard/components/PatientDashboard";
import AdminDashboard from "@/app/dashboard/components/AdminDashboard";

export default function DashboardPage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Cargando...</div>;
  }

  if (!session) {
    return <div>No autenticado</div>;
  }


  switch (session.user.role) {
    case "RECEPTIONIST":
      return <ReceptionistDashboard />;
    case "DOCTOR":
      redirect("/doctor");
    case "PATIENT":
      return <PatientDashboard />;
    case "ADMIN":
      return <AdminDashboard />;
    default:
      return <div>Rol desconocido</div>;
  }
}