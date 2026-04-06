import { prisma } from "@/lib/db";
import { hashPassword } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const registerSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  role: z.enum(["RECEPTIONIST", "DOCTOR", "PATIENT"]),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const data = registerSchema.parse(body);

    const { firstName, lastName, email, password, role } = data;

    const userExists = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (userExists) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 400 },
      );
    }

    const hashedPassword = await hashPassword(password);
    const result = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          email: email,
          password: hashedPassword,
          firstName: firstName,
          lastName: lastName,
          role: role,
        },
      });
      let patientId = null;

      if (role === "PATIENT") {
        const patient = await tx.patient.create({
          data: {
            userId: user.id,
          },
        });
        patientId = patient.id;
      }

      return { user, patientId };
    });

    return NextResponse.json(
      {
        message: "User created successfully",
        user: {
          id: result.user.id,
          email: result.user.email,
          firstName: result.user.firstName,
          lastName: result.user.lastName,
          role: result.user.role,
        },
        patientId: result.patientId,
      },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0]?.message },
        { status: 400 },
      );
    }
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 },
    );
  }
}
