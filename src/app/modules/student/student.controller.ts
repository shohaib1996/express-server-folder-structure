// import { NextFunction, Request, RequestHandler, Response } from "express";
import { StudentServices } from "./student.service";
// import studentValidationSchema from "./student.validation";
// import { z } from "zod";

import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";

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

// const catchAsync = (fn: RequestHandler) => {
//   return (req: Request, res: Response, next: NextFunction) => {
//     Promise.resolve(fn(req, res, next)).catch((err) => next(err));
//   };
// };

const getAllStudents = catchAsync(async (req, res, next) => {
  const result = await StudentServices.getAllStudentsFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Students are retrieved successfully",
    data: result,
  });
});

const getSingleStudent = catchAsync(async (req, res, next) => {
  const { studentId } = req.params;

  const result = await StudentServices.getSingleStudentFromDB(studentId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student is retrieved successfully",
    data: result,
  });
});

const deleteStudent = catchAsync(async (req, res, next) => {
  const { studentId } = req.params;

  const result = await StudentServices.deleteStudentFromDB(studentId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student is deleted successfully",
    data: result,
  });
});

export const StudentControllers = {
  // createStudent,
  getAllStudents,
  getSingleStudent,
  deleteStudent,
};
