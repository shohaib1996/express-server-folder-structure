import config from "../../config";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { generateStudentId } from "./user.utils";

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  try {
    // Create a user object
    const userData: Partial<TUser> = {};
    // If password is not given, use default password
    userData.password = password || (config.default_password as string);

    // Set student role
    userData.role = "student";
    // Use studentData id if available, or generate a new one
    // userData.id = studentData.id || "2030100001";
    // find academic semester info
    const admissionSemester = await AcademicSemester.findById(
      payload.admissionSemester
    );

    if (!admissionSemester) {
      throw new Error("Admission semester not found");
    }

    // Ensure admissionSemester has the required properties
    const { year, code } = admissionSemester;

    if (!year || !code) {
      throw new Error("Admission semester is missing year or code");
    }

    //set  generated id
    userData.id = await generateStudentId(admissionSemester);

    const newUser = await User.create(userData);

    if (!newUser) {
      throw new Error("User creation failed");
    }

    // Set id and user reference in studentData
    payload.id = newUser.id;
    payload.user = newUser._id; // reference _id

    const newStudent = await Student.create(payload);
    return newStudent;
  } catch (error: any) {
    console.error(`Error creating student: ${error.message}`);
    throw new Error(`Error creating student: ${error.message}`);
  }
};

export const UserService = {
  createStudentIntoDB,
};
