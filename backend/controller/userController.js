import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { User } from "../models/userSchema.js";
import { generateToken } from "../utils/jwtToken.js";

export const patientRegister = catchAsyncErrors(async (req, res, next) => {
  const {
    firstname,
    lastname,
    email,
    phone,
    password,
    gender,
    dob,
    nic,
    role,
    doctorDepartment,
    docAvtar,
  } = req.body;
  if (
    !firstname ||
    !lastname ||
    !email ||
    !phone ||
    !password ||
    !gender ||
    !dob ||
    !nic ||
    !role
  ) {
    return next(new ErrorHandler("Please fill in all fields", 400));
  }
  const isregistered = await User.findOne({ email });
  if (isregistered) {
    return next(new ErrorHandler("User already exists", 400));
  }
  const user = await User.create({
    firstname,
    lastname,
    email,
    phone,
    password,
    gender,
    dob,
    nic,
    role: "Patient",
  });
  generateToken(user, "User Registered Successfully", 201, res);
});

export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password, confirmpassword, role } = req.body;
  if (!email || !password || !confirmpassword || !role) {
    return next(new ErrorHandler("Please provide all details", 400));
  }
  if (password !== confirmpassword) {
    return next(new ErrorHandler("Password does not match", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(
      new ErrorHandler("user not found as password or email is invalid", 401)
    );
  }
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email or Password", 401));
  }
  if (role !== user.role) {
    return next(new ErrorHandler("Invalid Role", 401));
  }
  generateToken(user, "User loggedin Successfully", 201, res);
});
export const newadmin = catchAsyncErrors(async (req, res, next) => {
  const { firstname, lastname, email, phone, nic, dob, gender, password } =
    req.body;
  if (
    !firstname ||
    !lastname ||
    !email ||
    !phone ||
    !nic ||
    !dob ||
    !gender ||
    !password
  ) {
    return next(new ErrorHandler("Please fill full form", 400));
  }
  const isregistered = await User.findOne({ email });
  if (isregistered) {
    return next(new ErrorHandler("  Admin already exists", 400));
  }
  const admin = await User.create({
    firstname,
    lastname,
    email,
    phone,
    nic,
    dob,
    gender,
    password,
    role: "Admin",
  });
  res.status(200).json({
    success: true,
    message: "New Admin Registered",
    admin,
  });
});
export const getAlldoctors = catchAsyncErrors(async (req, res, next) => {
  const doctors = await User.find({ role: "Doctor" });
  res.status(200).json({
    success: true,
    doctors,
  });
});
export const getusersdetails = catchAsyncErrors(async (req, res, next) => {
  const user = req.user;
  req.status(200).json({
    success: true,
    user,
  });
});
