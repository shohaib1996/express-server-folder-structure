import config from "../../config";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  try {
    // Create a user object
    const userData: Partial<TUser> = {};
    // If password is not given, use default password
    userData.password = password || (config.default_password as string);

    // Set student role
    userData.role = "student";
    // Use studentData id if available, or generate a new one
    userData.id = studentData.id || "2030100001";

    const newUser = await User.create(userData);

    if (!newUser) {
      throw new Error("User creation failed");
    }

    // Set id and user reference in studentData
    studentData.id = newUser.id;
    studentData.user = newUser._id; // reference _id

    const newStudent = await Student.create(studentData);
    return newStudent;
  } catch (error: any) {
    console.error(`Error creating student: ${error.message}`);
    throw new Error(`Error creating student: ${error.message}`);
  }
};

export const UserService = {
  createStudentIntoDB,
};
