import { Router } from "express";
import AdminRoute from "./admin.route.js";
import EmployeeRoute from "./employee.route.js";
import UserRoute from "./user.route.js";

const AppRoute = Router();

AppRoute.use('/', UserRoute);
AppRoute.use('/hr/', AdminRoute);
AppRoute.use('/', EmployeeRoute);



export default AppRoute;