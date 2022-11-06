import { Router } from "express"
import { EmployeeController, UserController } from "../controllers/index.js"

const EmployeeRoute = Router();

EmployeeRoute
    .route('/reimbursements/create')
    .post(EmployeeController.createReimbursementList)
    .all((req, res, next) => res.send("Bad request"))

EmployeeRoute
    .route('/reimbursements/:reimbursementId(\\d+)/addItem')
    .post(
        EmployeeController.validateReimbursementListId,
        EmployeeController.validateReimbursementDate,
        EmployeeController.validateCategory,
        EmployeeController.validateReimbursementAmount,
        EmployeeController.addReimbursementItem
    )
    .all((req, res, next) => res.send("Bad request"))
    // * POST /reimbursements/:reimbursementId/addItem
    // US0004: As an employee, I can add a reimbursement item

EmployeeRoute
    .route('/reimbursements/:reimbursementId(\\d+)/:reimbursementItemId/removeItem')
    .delete(EmployeeController.removeReimbursementItem)
    .all((req, res, next) => res.send("Bad request"))
    // * DELETE /reimbursements/:reimbursementId/:reimbursementItemId/removeItem
    // US0005: As an employee, I can remove a reimbursement item from the list

EmployeeRoute
    .route('/reimbursements/:reimbursementId(\\d+)/submit')
    .post(EmployeeController.removeReimbursementItem)
    .all((req, res, next) => res.send("Bad request"))
    // * POST /reimbursements/:reimbursementId/submit
    // US0006: As an employee, I can submit my reimbursement

EmployeeRoute
    .route('/reimbursements/:reimbursementId(\\d+)/generateCopy')
    .get(EmployeeController.generateReimbursementListCopy)
    .all((req, res, next) => res.send("Bad request"))
    // * GET /reimbursements/:reimbursementId/generateCopy
    // US0007: As an employee, I can generate a printable copy of my reimbursement

EmployeeRoute
    .route('/reimbursements/calculateFlexPoints')
    .get(EmployeeController.calculateFlexPoints)
    .all((req, res, next) => res.send("Bad request"))
    // * GET /reimbursements/calaculateFlexPoints?numOfFlexCredit&monthlyRate
    // US008: As an employee, I can calculate my flex points

EmployeeRoute.use('/reimbursements/:reimbursementId(\\d+)/', (req, res, next) => {
    res.send(JSON.stringify(req.params))
})

EmployeeRoute.use('/info',UserController.retrieveEmployeeDetails)
// * GET /info
// US0001: The application should be able to retrieve the user information
    
EmployeeRoute.use('/', UserController.retrieveEmployeeDetails)

export default EmployeeRoute
    
    