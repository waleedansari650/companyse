import { NextFunction, Request, Response } from "express";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import ErrorHandler from "../utils/errorHandler";
import { validationResult } from "express-validator";
import User from "../models/user";
import jwt from "jsonwebtoken";
import { sendMail } from "../utils/sendMail";
import bcrypt from "bcrypt";
import { ClientInterface } from "../types/userTypes";

const generateActivationToken = (payload: ClientInterface) => {
  return jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: "1h",
  });
};
export const signupController = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(new ErrorHandler(errors.array()[0].msg, 400));
      }
      const { name, email, password } = req.body;
      let clientAlreadyExist = await User.findOne({ email });
      if (clientAlreadyExist) {
        res.status(400).json({ error: `${email} Already in use!!!` });
        return next(new ErrorHandler("Client already exist", 400));
      }
      const client = {
        name,
        email,
        password,
      };
      const activationToken = generateActivationToken(client);
      const activationUrl = `${process.env.CLIENT_URL}/activation/${activationToken}`;
      try {
        await sendMail({
          to: client.email,
          subject: "Account Activation",
          text: `Hi ${client.name},\n\nPlease click on the link to activate your account: ${activationUrl}`,
          html: `
          <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
          <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
          <h2 style="text-align: center; color: #333333;">Account Activated</h2>
          <div style="text-align: center; margin: 20px 0;">
            <img src="https://res.cloudinary.com/dtj2wutuj/image/upload/v1717849609/fc30qwcardsl2cwvtggr.png" alt="Account Activated" style="width: 100px; height: auto;">
          </div>
            
            <h3 style="text-align: center; color: #333333;">Hello ${client.name},</h3>
            <p style="color: #555555; text-align: center;">
              Please click the button below to activate your account.
            </p>
            <div style="text-align: center; margin: 20px 0;">
              <a href="${activationUrl}" style="background-color: #007bff; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
                ACTIVATE YOUR ACCOUNT
              </a>
            </div>
            <p style="color: #555555; text-align: center;">
              Thank you for being a part of us.
            </p>
            <div style="text-align: center; margin-top: 20px;">
              <a href="https://soft-enterprise.com/" style="color: #007bff; text-decoration: none;">View as a Web Page</a>
            </div>
          </div>
          <div style="text-align: center; margin-top: 20px; color: #777777;">
            <p style="margin: 0;">© 2024 Soft Enterprise, Inc. All rights reserved.</p>
            <div style="margin-top: 10px;">
            </div>
            <p style="margin-top: 10px;">You received this email because you signed up with us.</p>
          </div>
        </div>
          `,
        });
        return res.status(201).json({
          success: true,
          message: `Please check your email: ${client.email} to activate your account`,
          token: activationUrl,
        });
      } catch (error: any) {
        res.status(500).json({ error: error.message });
        return next(new ErrorHandler(error.message, 500));
      }
    } catch (error: any) {
      console.log(error);
      res.status(500).json({ error: error.message });
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
export const activationController = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { activationToken } = req.params;
      if (!activationToken) {
        res.status(400).json({ error: "Invalid Activation Token" });
        return next(new ErrorHandler("Invalid Activation Token", 400));
      }
      const decoded = jwt.verify(
        activationToken,
        process.env.JWT_SECRET as string
      ) as ClientInterface;
      if (!decoded) {
        res.status(400).json({ error: "Invalid Activation Token" });
        return next(new ErrorHandler("Invalid Activation Token", 400));
      }
      const { name, email, password } = decoded;
      let clientAlreadyExist = await User.findOne({ email });
      if (clientAlreadyExist) {
        res.status(400).json({ error: `${email} Already in use!!!` });
        return next(new ErrorHandler("Client already exist", 400));
      }
      if (!password) {
        return next(new ErrorHandler("Password is missing in the token", 400));
      }
      const hashPassword = await bcrypt.hash(password, 10);
      const client = new User({
        name,
        email,
        password: hashPassword,
      });
      await client.save();
      const token = generateActivationToken({ email });
      return res.status(201).json({
        success: true,
        message: "Account activated successfully",
        token,
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
export const loginController = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      let clientExist: ClientInterface | null = await User.findOne({ email });
      if (!clientExist) {
        res.status(404).json({ error: "User not found" });
        return next(new ErrorHandler("Invalid credentials", 401));
      }
      const isPasswordMatched = (await bcrypt.compare(
        password,
        clientExist.password as string
      )) as boolean;
      if (!isPasswordMatched) {
        res.status(401).json({ error: "Invalid credentials" });
        return next(new ErrorHandler("Invalid credentials", 401));
      }
      const token = jwt.sign(
        { userId: clientExist._id },
        process.env.JWT_SECRET as string,
        { expiresIn: "1d" }
      );
      return res.status(200).json({
        success: true,
        message: "Login successful",
        client: clientExist,
        token,
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
export const getUser = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      if (!id) {
        return next(new ErrorHandler("Invalid User Id", 400));
      }
      const user = await User.findById({ _id: id }).select("-password");
      if (!user) {
        return next(new ErrorHandler("User not found", 404));
      }
      return res.status(200).json({
        success: true,
        user,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
