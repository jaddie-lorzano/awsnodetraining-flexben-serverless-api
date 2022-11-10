import { ulid } from 'ulid';
import DBContext from '../config/AWS.DbContext.js';
const db = new DBContext();

export default class ReimbursementItemRepository {
    constructor() {
        this.tableName = "flexben-cris-jad-rodel";
    }
    set tableName (tableName) { }
    createReimbursementItem = async (
        reimbursementItem = {
            id: ulid(),
            listId,
            orNumber,
            nameOfEstablishment,
            tinOfEstablishment,
            amount,
            category,
            status : 'Draft',
            dateAdded,
            employeeFirstName,
            employeeLastName,
            employeeNumber
        }) => {
        console.log(`Repo Reimbursement Item: ${JSON.stringify(reimbursementItem)}`)
        let item = {
            PK: `ITEM#${reimbursementItem.id}`,
            EMPLOYEE_PK: `EMPLOYEE#${reimbursementItem.employeeId}`,
            SK: 'ITEM',
            EMPLOYEE_SK: `ITEM#${reimbursementItem.id}`,
            REIMBURSEMENT_PK: `REIMBURSEMENT#${reimbursementItem.listId}`,
            REIMBURSEMENT_SK: `ITEM#${reimbursementItem.id}`,
            '#Type': 'Reimbursement Item',
            Data: {
                ReimbursementItem: {
                    "OR Number": reimbursementItem.orNumber,
                    "Name of Establshment": reimbursementItem.nameOfEstablishment,
                    "TIN of Establshment": reimbursementItem.tinOfEstablishment,
                    "Amount": reimbursementItem.amount,
                    "Category": reimbursementItem.category,
                }
            },
            Status: reimbursementItem.status,
            DateAdded: reimbursementItem.dateAdded,
            Detail: 
                `NO#0001`+
                `#FIRST#${reimbursementItem.employeeFirstName.toUpperCase()}`+
                `#LAST#${reimbursementItem.employeeLastName.toUpperCase()}`,
            IsActive: true,
        }
        console.log(`Item: ${JSON.stringify(reimbursementItem)}`)
        let params =  {
            TableName: this.tableName,
            Item: item
        }
        return await db.create(params)
    }
}