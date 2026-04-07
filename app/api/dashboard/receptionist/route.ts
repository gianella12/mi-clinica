import { prisma } from "@/lib/db";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token || token.role !== "RECEPTIONIST") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const patients = await prisma.patient.findMany({
      include: {
        user: true,
      },
    });
    const doctors = await prisma.doctor.findMany({
      include: { user: true },
    });
    const appointmentsCount = await prisma.appointment.count();

    return NextResponse.json({
      patients,
      doctors,
      appointmentsCount,
    });
  } catch (error) {
      console.error("Dashboard error:", error); 
    return NextResponse.json(
      { error: "Failed to fetch dashboard data" },
      { status: 500 },
    );
  }
}
