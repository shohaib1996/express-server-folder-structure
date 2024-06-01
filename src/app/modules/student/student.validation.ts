import { z } from "zod";

const userNameSchema = z.object({
  firstName: z
    .string()
    .trim()
    .max(10, "firstName must not exceed 10 characters")
    .regex(/^[A-Z][a-z]*$/, "firstName must start with an uppercase letter")
    .min(1, "firstName must be at least 1 character long"),
  middleName: z
    .string()
    .trim()
    .min(1, "middleName must be at least 1 character long")
    .optional(),
  lastName: z
    .string()
    .trim()
    .regex(/^[A-Za-z]+$/, "lastName must contain only letters")
    .min(1, "lastName must be at least 1 character long"),
});

const guardianSchema = z.object({
  fatherName: z.string().min(1, "fatherName must be at least 1 character long"),
  fatherOccupation: z
    .string()
    .min(1, "fatherOccupation must be at least 1 character long"),
  fatherContactNo: z
    .string()
    .min(1, "fatherContactNo must be at least 1 character long"),
  motherName: z.string().min(1, "motherName must be at least 1 character long"),
  motherOccupation: z
    .string()
    .min(1, "motherOccupation must be at least 1 character long"),
  motherContactNo: z
    .string()
    .min(1, "motherContactNo must be at least 1 character long"),
});

const localGuardianSchema = z.object({
  name: z.string().min(1, "name must be at least 1 character long"),
  occupation: z.string().min(1, "occupation must be at least 1 character long"),
  contactNo: z.string().min(1, "contactNo must be at least 1 character long"),
  address: z.string().min(1, "address must be at least 1 character long"),
});

const studentValidationSchema = z.object({
  id: z.string().min(1, "id must be at least 1 character long"),
  // password: z
  //   .string()
  //   .min(1, "password is required")
  //   .max(20, "Password not more than 20 characters"),
  name: userNameSchema,
  gender: z.enum(["male", "female", "other"]),
  dateOfBirth: z.string().optional(),
  email: z.string().email("email must be a valid email"),
  contactNo: z.string().min(1, "contactNo must be at least 1 character long"),
  emergencyContactNo: z
    .string()
    .min(1, "emergencyContactNo must be at least 1 character long"),
  bloogGroup: z
    .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
    .optional(),
  presentAddress: z
    .string()
    .min(1, "presentAddress must be at least 1 character long"),
  permanentAddres: z
    .string()
    .min(1, "permanentAddress must be at least 1 character long"),
  guardian: guardianSchema,
  localGuardian: localGuardianSchema,
  profileImg: z.string().optional(),
  // isActive: z.enum(["active", "blocked"]).default("active"),
  isDeleted: z.boolean().optional().default(false),
});

export default studentValidationSchema;
