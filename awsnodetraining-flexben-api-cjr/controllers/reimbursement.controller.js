// import { FlexPointCalculator } from '../utils/index.js'
import { ReimbursementService } from '../services/index.js'
import { ReimbursementItemRepository } from '../repositories/index.js'

let reimbursementService = new ReimbursementService()
// let reimbursementItemRepo = new ReimbursementItemRepository()
const ReimbursementController = {
    addReimbursementList : async (req, res, next) => {

    },
    addReimbursementItem : async (req, res, next) => {
        /* VALIDATE IF REIMBURSEMENT LIST IS NOT SUBMITTED
            GET status of Reimbursement List given List ID in DynamoDB
            IF (submitted) return STATUS 400 BAD REQUEST
        */
        const user = req.user
        /*
            req.user {
                employeeNumber,
                employeeFirstName,
                employeeLastName,
                Role,
                Company Code
            }
        */
        /*
            PATH: POST /reimbursement/:reimbursementListId/add
            expected req.body {
                dateAdded(optional)
                orNumber,
                nameOfEstablishment,
                tinOfEstablishment,
                amount,
                category
            }
            expected req.params {
                reimbursementListId
            }
            PROCESS:
                1. get reimbursement list Id from req.params
                2. get user details from req.user (employeeNumber, name, role)
                2. validate reimbursement item
                3. generate reimbursement item ID using ulid()
                4. create reimbursement item in dynamodb
                    reimbursementItem = {
                        reimbursementId,
                        reimbursementListId,
                        category,
                        status,
                        amount,
                        data: {
                            dateAdded,
                            orNumber,
                            nameOfEstablishment,
                            tinOfEstablishment,,
                            amount
                        }'
                        detail: NO#{employeeNumber}#FIRST#{firstName}#LAST#{lastname}
                    }
                5. UPDATE Reimbursement List Total Amount
        */
        let { reimbursementListId } = req.params

        let { dateAdded = new Date(), orNumber, nameOfEstablishment, tinOfEstablishment, amount, category } = req.body;
        let { reimbursementItem, isValidBody } = await reimbursementService.validateBody({ 
            dateAdded, 
            orNumber, 
            nameOfEstablishment,
            tinOfEstablishment, 
            amount })
        if (isValidBody.isValid == false) {
            console.log(`res.status(400).json({
                status: 400,
                statusText: 'Bad Request',
                message: ${isValidBody.error},
                error: {
                    code: 'BAD_REQUEST',
                    message: ${isValidBody.error}
                }
            })`)
            // res.status(400).json({
            //     status: 400,
            //     statusText: 'Bad Request',
            //     message: isValidBody.error,
            //     error: {
            //         code: 'BAD_REQUEST',
            //         message: isValidBody.error
            //     }
            // })
        }
        
        console.log(`Reimbursement Item: ${JSON.stringify(isValidBody)}`)
        console.log(`Reimbursement Item: ${JSON.stringify(reimbursementItem)}`)
        // res.send(`add reimbursement item`)
        // call employee service to add reimbursement detail item
    },
    // US0005: As an employee, I can remove a reimbursement item from the list
    removeReimbursementItem : async (req, res, next) => {
        /* VALIDATE IF REIMBURSEMENT LIST IS NOT SUBMITTED
            GET status of Reimbursement List given List ID in DynamoDB
            IF (submitted) return STATUS 400 BAD REQUEST
        */
        // delete reimbursement item in dynamodb using id
        // reimbursementService.delete(id)
        // UPDATE Reimbursement LIST TOTAL AMOUNT GIVEN LIST ID IN DYNAMODB
    },
    // US0006: As an employee, I can submit my reimbursement
    submitReimbursementList : (req, res, next) => {
        /*
        * Employee should be able to submit the reimbursement
        * Employee is only allowed to submit a reimbursement less than or equal the cap (defined in the cutoff)
        * A transaction number should be created once reimbursement is submitted successfully (format of transaction number - <Company code>-<cut-off id>-<YYYYMMDD>-<reimbursement id>)
        * company code, cut-off id are found in DB. Reimbursement ID should be auto-generated
        * The status of the reimbursement (and reimbursement items/details) will be changed to ""Submitted""
        * Employee should not be able to make changes to reimbursements with ""Submitted"" status"
        
        1. VALIDATE SUBMITTED REIMBURSEMENT LIST TOTAL AMOUNT
            a. GET CUTOFF CAP AMOUNT given Cutoff ID
            b. compare if reimbursement list total amount is less than cutoff
        2. CREATE TRANSACTION NUMBER
            a. <Company code> (from req.user.company.code)
            b. <cut-off id> (from reimbursement list)
            c. Date Submitted<YYYYMMDD> (current date)
            d. <reimbursement id>
        3. CHANGE STATUS TO SUMBMITTED
            - Update Item in DynamoDB given Reimbursement List ID
        */

        

        // UPDATE reimbursement item in dynamodb using Reimbursement List id
        // PK: REIMBURSEMENT#{id}, SK: LIST
        // attribute to update: status = 'Submitted'
        /*
            const params = {
                TableName: "Flexben_VAMN",
                Key: {
                    'PK': "EMPLOYEE#EMAIL#" + employee_email, "SK": "REIMBURSEMENT#ID#" + flex_reimbursement_id + "#MAIN"
                },
                UpdateExpression: "set transaction_number = :x, #stts = :y",
                ExpressionAttributeNames: {
                    "#stts": "status"
                },
                ExpressionAttributeValues: {
                    ":x": transaction_number,
                    ":y": "SUBMITTED"
                }
            };
        */
        // call employee service to submit reimbursement list
    },
    // US0007: As an employee, I can generate a printable copy of my reimbursement
    generateReimbursementListCopy : async (req, res, next) => {
        /*
            REIMBURSEMENT_PK: 'REIMBURSEMENT#{reimburementListId}'
            GET in dynamoDB using REIMBURSEMENT_INDEX table
            PRINT Reimbursement Copy
            print reimbursement
            print categories
            upload to s3
        */
        // call user service to generate a copy of a reimbursement list
    },
    // US008: As an employee, I can calculate my flex points    
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

export default ReimbursementController

// ReimbursementController.addReimbursementItem({
//     body: {
//         listid: "",
//         orNumber : 5463456,
//         tinOfEstablishment : '6456453',
//         nameOfEstablishment : 'Jollibee',
//         amount: 100, 
//         category: 'Food'
//     }
// })