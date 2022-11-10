import { Router } from "express"
import { ReimbursementController, UserController } from "../controllers/index.js"

const ReimbursementRoute = Router();

ReimbursementRoute
    .route('/reimbursements/create')
    .post(ReimbursementController.addReimbursementList)
    .all((req, res, next) => res.send("Bad request"))

ReimbursementRoute
    .route('/reimbursement/:reimbursementListId(\\d+)/item/add')
    .post(
        ReimbursementController.addReimbursementItem
    )
    .all((req, res, next) => res.send("Bad request"))
    // * POST /reimbursements/:reimbursementId/addItem
    // US0004: As an Reimbursement, I can add a reimbursement item

ReimbursementRoute
    .route('/reimbursements/:reimbursementId(\\d+)/:reimbursementItemId/removeItem')
    .delete(ReimbursementController.removeReimbursementItem)
    .all((req, res, next) => res.send("Bad request"))
    // * DELETE /reimbursements/:reimbursementId/:reimbursementItemId/removeItem
    // US0005: As an Reimbursement, I can remove a reimbursement item from the list

ReimbursementRoute
    .route('/reimbursements/:reimbursementId(\\d+)/submit')
    .post(ReimbursementController.removeReimbursementItem)
    .all((req, res, next) => res.send("Bad request"))
    // * POST /reimbursements/:reimbursementId/submit
    // US0006: As an Reimbursement, I can submit my reimbursement

ReimbursementRoute
    .route('/reimbursements/:reimbursementId(\\d+)/generateCopy')
    .get(ReimbursementController.generateReimbursementListCopy)
    .all((req, res, next) => res.send("Bad request"))
    // * GET /reimbursements/:reimbursementId/generateCopy
    // US0007: As an Reimbursement, I can generate a printable copy of my reimbursement

ReimbursementRoute
    .route('/reimbursements/calculateFlexPoints')
    .get(ReimbursementController.calculateFlexPoints)
    .all((req, res, next) => res.send("Bad request"))
    // * GET /reimbursements/calaculateFlexPoints?numOfFlexCredit&monthlyRate
    // US008: As an Reimbursement, I can calculate my flex points

ReimbursementRoute.use('/reimbursements/:reimbursementId(\\d+)/', (req, res, next) => {
    res.send(JSON.stringify(req.params))
})

ReimbursementRoute.use('/info',UserController.retrieveReimbursementDetails)
// * GET /info
// US0001: The application should be able to retrieve the user information
    
ReimbursementRoute.use('/', UserController.retrieveReimbursementDetails)

export default ReimbursementRoute
    
    