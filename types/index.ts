export type User = {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: "PATIENT" | "RECEPTIONIST" | "DOCTOR" | "ADMIN";
  createdAt: Date;
  updatedAt: Date;
};

export type Patient = {
  id: string;
  userId: string;
  medicalRecordNumber: string | null;
  dateOfBirth: Date | null;
  phoneContact: string | null;
  createdAt: Date;
  updatedAt: Date;
  user: User;
};

export type Doctor = {
  id: string;
  userId: string;
  specialty: string | null;
  licenseNumber: string | null;
  createdAt: Date;
  updatedAt: Date;
  user: User;
};

export type DashboardData = {
  patients: Patient[];
  doctors: Doctor[];
  appointmentsCount: number;
};