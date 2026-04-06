import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { z } from "zod";

const updatePatientSchema = z.object({
  medicalRecordNumber: z.string().min(1, "Medical record number is required"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  phoneContact: z.string().min(1, "Phone contact is required"),
});

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (token.role !== "RECEPTIONIST" && token.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    const body = await req.json();

    const data = updatePatientSchema.parse(body);

    const patient = await prisma.patient.update({
      where: { id: id },
      data: {
        medicalRecordNumber: data.medicalRecordNumber,
        dateOfBirth: new Date(data.dateOfBirth),
        phoneContact: data.phoneContact,
      },
    });

    return NextResponse.json(patient, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0]?.message },
        { status: 400 },
      );
    }
    return NextResponse.json(
      { error: "Failed to update patient" },
      { status: 500 },
    );
  }
}
