import ErrorHandler from "../utils/utility-class.js";
import { TryCatch } from "./error.js";
import { User } from "../models/user.js";

//Middleware to make sure only admin is allowed
export const adminOnly = TryCatch(async(req, res, next) => {

const {id} = req.query;


if(!id) return next(new ErrorHandler("Please Login to proceed", 401));

const  user = await User.findById(id);
if(!user) return next(new ErrorHandler("Please Login to proceed", 401));

if(user.role !== "admin")
    return next (new ErrorHandler("You have not logged in yet, please login first.", 403));

next();

});  