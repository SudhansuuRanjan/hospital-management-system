export const generateToken = (user, message, statuscode, res) => {
  const token = user.generateToken();
  const cookiename = user.role === "Admin" ? "adminToken" : "patientToken";
  res
    .status(statuscode)
    .cookie(cookiename, token, {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    })
    .json({
      success: true,
      token,
      message,
      user,
    });
};
