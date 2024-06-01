import httpStatus from "http-status";
import mongoose from "mongoose";
import config from "../../config";
import AppError from "../../errors/AppError";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { generateStudentId } from "./user.utils";

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  // Create a user object
  const userData: Partial<TUser> = {};
  // If password is not given, use default password
  userData.password = password || (config.default_password as string);

  // Set student role
  userData.role = "student";

  // Find academic semester info
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester
  );

  if (!admissionSemester) {
    throw new AppError(httpStatus.NOT_FOUND, "Admission semester not found");
  }

  // Ensure admissionSemester has the required properties
  const { year, code } = admissionSemester;

  if (!year || !code) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Admission semester is missing year or code"
    );
  }

  // Start a session
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // Set generated ID
    userData.id = await generateStudentId(admissionSemester);

    // Create a user (transaction-1)
    const newUser = await User.create([userData], { session }); // Array

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "User creation failed");
    }

    // Set ID and user reference in studentData
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; // Reference _id

    // Create a student (transaction-2)
    const newStudent = await Student.create([payload], { session });

    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Student creation failed");
    }

    // Commit the transaction
    await session.commitTransaction();
    await session.endSession();

    return newStudent[0];
  } catch (error: any) {
    // Abort the transaction in case of error
    await session.abortTransaction();
    await session.endSession();
    console.error(`Error creating student: ${error.message}`);
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      `Error creating student: ${error.message}`
    );
  }
};

export const UserService = {
  createStudentIntoDB,
};
