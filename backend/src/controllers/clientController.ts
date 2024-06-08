import { NextFunction, Request, Response } from "express";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import ErrorHandler from "../utils/errorHandler";
import { clientQueryValidator } from "../validators/client";
import { validationResult } from "express-validator";
import Ticket from "../models/ticket";

export const postProjectConflictsController = catchAsyncErrors(
    async (req : Request, res : Response, next : NextFunction ) =>{
       try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return next(new ErrorHandler(errors.array()[0].msg, 400));
        }
        const { name, phone, email, projectLink, projectDetails, issueArise, projectCredentials } = req.body;
        const client = await Ticket.create({
            name,
            phone,
            email,
            projectLink,
            projectDetails,
            issueArise,
            projectCredentials
        })
        return res.status(201).json({
            success : true,
            message : 'Your Request is successfully submitted 🎉🎉🎉',
            data : client
        })
       } catch (error : any) {
        return next(new ErrorHandler(error.message, 500));
       }
    }
)