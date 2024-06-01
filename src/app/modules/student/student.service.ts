import { Student } from "./student.model";
import { TStudent } from "./student.interface";

// const createStudentIntoDB = async (studentData: TStudent) => {
//   if (await Student.isUserExist(studentData.id)) {
//     throw Error("User already exist");
//   }
//   const result = await Student.create(studentData); // builtin static method

//   // const student = new Student(studentData); // create an instance
//   // if (await student.isUserExist(studentData.id)) {
//   //   throw Error("User already exist");
//   // }
//   // const result = await student.save();
//   // return result;
// };

const getAllStudentsFromDB = async () => {
  const result = await Student.find();
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findOne({ id });
  return result;
};

const deleteStudentFromDB = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true });
  return result;
};

export const StudentServices = {
  // createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
};
