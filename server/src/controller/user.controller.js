import { User } from "../model/user.model.js";

import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const generateAccessAndRefreshToken = asyncHandler(async (userId) => {
  if (!userId) {
    throw new ApiError(400, "User Id is empty...");
  }
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(400, "User not found...");
  }

  const accessToken = await user.generateAccessToken();
  const refreshToken = await user.generateRefreshToken();

  this.refreshToken = refreshToken;
  await user.save({validateBeforeSave : false});

  return { accessToken, refreshToken };
});

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  path: "/",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

const clearCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  path: "/",
};

export const registerUser = asyncHandler(async (req, res) => {
  const { userName, email, password } = req.body;
  if (!userName || !email || !password) {
    throw new ApiError(400, "Fill all the fields...");
  }

  const existedUser = await User.findOne(email);
  if (existedUser) {
    throw new ApiError(400, "User with this email is already exists...");
  }

  const user = await User.create({
    userName,
    email,
    password,
  });

  const { accessToken , refreshToken } = generateAccessAndRefreshToken(user._id);

  const createUser = await User.findOne(user._id).select(" -password -refershToken ");
  if(!createdUser){
    throw new ApiError(400 , "Something went wrong while creating user...")
  }

  res.status(201).json(new ApiResponse(201 , {data : createdUser} , "User created successfully..."))


});
