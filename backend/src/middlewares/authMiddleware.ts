import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../utils/errorHandler";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/user";
import { ClientInterface } from "../types/userTypes";

declare global {
    namespace Express {
      interface Request {
        userId: string | undefined;
        token : string | undefined;
        user : ClientInterface | undefined;
      }
    }
  }
export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return next(new ErrorHandler("Login first to access this resource", 401));
    }
  try {
    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;
    const user :  ClientInterface | null = await User.findOne({_id : decodedToken.userId});
    if(!user){
        return next(new ErrorHandler("User not found", 404));
    }
    req.userId = (decodedToken as JwtPayload)._id;
    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler("Login first to access this resource", 401));

  }
};

