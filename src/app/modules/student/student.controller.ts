import { NextFunction, Request, Response } from "express";
import { StudentServices } from "./student.service";
// import studentValidationSchema from "./student.validation";
import { z } from "zod";
import studentValidationSchema from "./student.validation";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

// const createStudent = async (req: Request, res: Response) => {
//   try {
//     const studentData = req.body;
//     const zodParseData = studentValidationSchema.parse(studentData);

//     const result = await StudentServices.createStudentIntoDB(zodParseData);

//     res.status(200).json({
//       success: true,
//       message: "Student is created successfully",
//       data: result,
//     });
//   } catch (err: any) {
//     res.status(500).json({
//       success: false,
//       message: "An error occurred while creating the student",
//       error: err.message,
//     });
//   }
// };

const getAllStudents = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Students are retrieved successfully",
      data: result,
    });
  } catch (err: any) {
    // res.status(500).json({
    //   success: false,
    //   message: err.message || "something went wrong",
    //   error: err,
    // });
    next(err);
  }
};

const getSingleStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { studentId } = req.params;

    const result = await StudentServices.getSingleStudentFromDB(studentId);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Student is retrieved successfully",
      data: result,
    });
  } catch (err: any) {
    // res.status(500).json({
    //   success: false,
    //   message: err.message || "something went wrong",
    //   error: err,
    // });
    next(err);
  }
};

const deleteStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { studentId } = req.params;

    const result = await StudentServices.deleteStudentFromDB(studentId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Student is deleted successfully",
      data: result,
    });
  } catch (err: any) {
    // res.status(500).json({
    //   success: false,
    //   message: err.message || "something went wrong",
    //   error: err,
    // });
    next(err);
  }
};

export const StudentControllers = {
  // createStudent,
  getAllStudents,
  getSingleStudent,
  deleteStudent,
};
