import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import CompleteDoctorProfile from "@/app/doctor/components/CompleteDoctorProfile";
import DoctorDashboard from "@/app/doctor/components/DoctorDashboard";

export default async function DoctorPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const doctor = await prisma.doctor.findUnique({
    where: { userId: session?.user.id },
  });

  if (!doctor) {
    redirect("/login"); 
  }
  const needsCompletation = !doctor?.specialty || !doctor?.licenseNumber;

  return (
    <div>
      {needsCompletation ? (
        <CompleteDoctorProfile doctorId={doctor.id} />
      ) : (
        <DoctorDashboard />
      )}
    </div>
  );
}
