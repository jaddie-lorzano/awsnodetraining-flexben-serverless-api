// import { FlexPointCalculator } from '../utils/index.js'

const EmployeeController = {
    // createReimbursementList : async (req, res, next) => {
    //     console.log('ENTER: createReimbursementList')
    //     let flexCutOffId = req.body.flexCutOffId;
    //     let user = req.user;
    //     let newReimbursementListId;
    //     let error;
    //     await reimbursementService
    //         .createNewReimbursementList({
    //             employee_id: user.employee_id,
    //             flex_cut_off_id: flexCutOffId
    //         })
    //         .then(entityId => {
    //             newReimbursementListId = entityId
    //         })
    //         .catch(err => error = err)
    //     if (error) {
    //         next(error);
    //     }
    //     if (newReimbursementListId) {
    //         console.log(`USER: ${JSON.stringify(newReimbursementListId)}`)
    //         res.status(201).json({
    //             status: 201,
    //             statusText: 'Created',
    //             message: `Reimbursement Item ${newReimbursementListId} successfully created`,
    //             data: { newReimbursementListId }
    //         })
    //     }
    // },
    // validateReimbursementListId : async (req, res, next) => {
    //     let reimbursementListId = req.params.reimbursementId;
    //     let isExistingReimbursementListId = false;
    //     let errorList = req.errorList
    //     let isValid = {
    //         reimbursementListId: null,
    //     }
    //     await reimbursementService.checkReimbursementListId(reimbursementListId)
    //         .then(isExisting => {
    //             if (isExisting) isExistingReimbursementListId = isExisting;
    //             let validationErrorMessage = `Reimbursement list id ${reimbursementListId} does not exist`;
    //             errorList.push(validationErrorMessage);
    //         })
    //         .catch(err => errorList.push(err))
    //     req.errorList = errorList
    // },
    // validateReimbursementDate : async (req, res, next) => {
    //     let { dateAdded } = req.body
    //     await reimbursementService
    //         .validateReimbursementDate(dateAdded)
    //         .then()
    //         .catch((err) => { error = err; })
    // },
    // validateCategory : async (req, res, next) => {
    //     let { category } = req.body
    //     let categoryId
    //     await reimbursementService.getCategoryId(category)
    //         .then((id) => {
    //             categoryId = id;
    //         })
    //         .catch((err) => {
    //             throw err
    //         });
    //     if (categoryId) {
    //         req.body.categoryId = categoryId;
    //         next()
    //     }
    // },
    // validateReimbursementAmount : async (req, res, next) => {
    //     let { amount } = req.body
    //     if (amount < 500) {
    //         return res.status(400).json({
    //             status: 400,
    //             statusText: 'Bad Request',
    //             message: 'Amount must be greater than or equal to 500',
    //             error: {
    //                 code: 'BAD_REQUEST',
    //                 message: 'Amount must be greater than or equal to 500',
    //             }
    //         })
    //     }
    // },
    // addReimbursementItem : async (req, res, next) => {
    //     let { dateAdded, orNumber, nameOfEstablishment, tinOfEstablishment, amount, category } = req.body;
    //     await reimbursementService
    //         .createNewReimbursementItem({
    //             flex_reimbursement_id: reimbursementId,
    //             category_id: categoryId,
    //             or_number: orNumber,
    //             name_of_establishment: nameOfEstablishment,
    //             tin_of_establishment: tinOfEstablishment,
    //             amount,
    //             date_added: dateAdded
    //         })
    //     res.send(`add reimbursement item`)
    //     // call employee service to add reimbursement detail item
    // },
    // // US0005: As an employee, I can remove a reimbursement item from the list
    // removeReimbursementItem : async (req, res, next) => {
    //     // call employee service to delete reimbursement detail item
    // },
    // // US0006: As an employee, I can submit my reimbursement
    // submitReimbursementList : (req, res, next) => {
    //     // call employee service to submit reimbursement list
    // },
    // // US0007: As an employee, I can generate a printable copy of my reimbursement
    // generateReimbursementListCopy : async (req, res, next) => {
    //     // call user service to generate a copy of a reimbursement list
    // },
    // // US008: As an employee, I can calculate my flex points    
    calculateFlexPoints: async (req, res, next) => {
        let flexCredit = req.query.numOfFlexCredit;
        let monthlyRate = req.query.monthlyRate;
        let flexPointCalculator = new FlexPointCalculator(monthlyRate, flexCredit)
        await flexPointCalculator.getResult().catch(err => next(err));
        if (flexPointCalculator.isValidOperation) {
            res.status(200).json({
                status: 200,
                statusText: "OK",
                message: `Total Flex points calculated. Flex Points: ${flexPointCalculator.flexPoints.toFixed(2)}`,
                data: {
                    flexCredit: flexPointCalculator.flexCredit,
                    monthlyRate: flexPointCalculator.monthlyRate,
                    flexPoints: flexPointCalculator.flexPoints
                }
            })
        } else {
            res.status(400).json({
                status: 400,
                statusText: "Bad Request",
                message: `Invalid Request. Number of Flex Credits: '${flexCredit}', Monthly Rate: '${monthlyRate}'`,
                error: {
                    code: "BAD_REQUEST",
                    message: `Invalid Request. Number of Flex Credits: '${flexCredit}', Monthly Rate: '${monthlyRate}'`
                }
            })
        }
    }
}


export default EmployeeController

