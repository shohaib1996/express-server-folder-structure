import express from "express";
import { StudentControllers } from "./student.controller";
import validateRequest from "../../middlewares/validationRequest";
import { updateStudentValidationSchema } from "./student.validation";

const router = express.Router();

// router.post("/create-student", StudentControllers.createStudent);

router.get("/", StudentControllers.getAllStudents);

router.get("/:id", StudentControllers.getSingleStudent);
router.patch(
  "/:studentId",
  validateRequest(updateStudentValidationSchema),
  StudentControllers.updateStudent
);

router.delete("/:id", StudentControllers.deleteStudent);

export const StudentRoutes = router;
