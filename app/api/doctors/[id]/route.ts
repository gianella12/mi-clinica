import { prisma } from "@/lib/db";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const updateDoctorSchema = z.object({
  specialty: z.string().min(1, "Specialty is required"),
  licenseNumber: z.string().min(1, "License number is required"),
});

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token || token.role !== "DOCTOR") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const doctor = await prisma.doctor.findUnique({
      where: { id },
    });

    if (!doctor || doctor.userId !== token.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();
    const data = updateDoctorSchema.parse(body);

    const updatedDoctor = await prisma.doctor.update({
      where: { id },
      data: {
        specialty: data.specialty,
        licenseNumber: data.licenseNumber,
      },
    });

    return NextResponse.json(updatedDoctor, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0]?.message },
        { status: 400 },
      );
    }

    return NextResponse.json(
        { error: "Field to update doctor"},
        { status: 500}
    )
  }
}
