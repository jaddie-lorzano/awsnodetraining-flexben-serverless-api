import { Router } from "express";
import HRRoute from "./hr.route.js";
import ReimbursementRoute from "./reimbursement.route.js";
import UserRoute from "./user.route.js";

const AppRoute = Router();

// AppRoute.use('/', UserRoute);
// AppRoute.use('/hr/', HRRoute);
AppRoute.use('/', ReimbursementRoute);



export default AppRoute;