import { Router } from "express"
import { AdminController, UserController } from "../controllers/index.js"

const AdminRoute = Router();
const ReimbursementRoute = Router();


AdminRoute.use(AdminController.checkAdminCredentials)

AdminRoute.use('/info', UserController.retrieveEmployeeDetails)


AdminRoute
    .route('/reimbursements/:reimbursementId(\\d+)/approve')
    .put(AdminController.approveReimbursement) 
    .all((req, res, next) => res.send("Bad request"))
    // US0012: As an HR, I can approve submitted 
    // reimbursements
AdminRoute
    .route('/reimbursements/:reimbursementId(\\d+)/reject')
    .put(AdminController.rejectReimbursement) 
    .all((req, res, next) => res.send("Bad request"))
    // US0013: As an HR, I can reject submitted \
    // reimbursements
AdminRoute    
    .route('/reimbursements/:reimbursementId(\\d+)')
    .get(AdminController.viewReimbursementById)     .all((req, res, next) => res.send("Bad request"))
    // US0010: As an HR, I can view the details 
    // of a reimbursement
AdminRoute
    .route('/reimbursements/search')
    .get(AdminController.searchReimbursements)
    .all((req, res, next) => res.send("Bad request"))
    // US0011: As an HR, I can search for a 
    // particular reimbursement submitted by an employee
AdminRoute
    .route('/reimbursements/cutOff/:cutOffId(\\d+)')
    .get(AdminController.getReimbursementsByCutOff)  //
    .all((req, res, next) => res.send("Bad request"))
    // US009: As an HR, I can view all 
    // reimbursements submitted in a cut-off
AdminRoute.use('/', (req, res, next) => {
    let firstname = req.user.firstname;
    let lastname = req.user.lastname;
    res.send(`Welcome Admin ${firstname} ${lastname}`);
})

export default AdminRoute