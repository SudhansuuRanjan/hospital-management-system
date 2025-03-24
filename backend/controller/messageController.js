import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { Message } from "../models/messageSchema.js";
export const sendMessage = catchAsyncErrors(async (req, res, next) => {
  const { firstname, lastname, email, phone, message } = req.body;
  if (!firstname || !lastname || !email || !phone || !message) {
    return next(new ErrorHandler("Please fill in all fields", 400));
  }
  await Message.create({ firstname, lastname, email, phone, message });
  res.status(200).json({
    message: "Message sent successfully",
    success: true,
  });
});
