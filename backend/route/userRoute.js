import express from "express";
import {
  patientRegister,
  login,
  newadmin,
  getAlldoctors,
  getusersdetails,
} from "../controller/userController.js";
import { isAdminAuthenticated,isPatientAuthenticated } from "../middlewares/auth.js";
const router = express.Router();
router.post("/patient/register", patientRegister);
router.post("/login", login);
router.post("/admin/addnew",isAdminAuthenticated, newadmin);
router.get("/doctors", getAlldoctors);
router.get("/admin/me",isAdminAuthenticated,getusersdetails );
router.get("/patient/me",isPatientAuthenticated,getusersdetails );

export default router;
