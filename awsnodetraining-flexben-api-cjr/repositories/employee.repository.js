import DBContext from '../config/AWS.DbContext.js';
const db = new DBContext();
export default class EmployeeRepository {
    constructor() {
        this.tableName = "flexben-cris-jad-rodel";
    }
    createEmployee = async (
        employee = {
            employeeId,
            email,
            firstName,
            lastName,
            number
        }) => {
        console.log(`Repo Employee: ${JSON.stringify(employee)}`)
        let item = {
            PK: `EMPLOYEE#${employee.employeeId}`,
            EMPLOYEE_PK: `EMPLOYEE#${employee.employeeId}`,
            SK: 'EMPLOYEE',
            EMPLOYEE_SK: 'EMPLOYEE',
            '#Type': 'Employee',
            Data: {
                Employee: {
                    Email: employee.email,
                    FirstName: employee.firstName,
                    LastName: employee.lastName,
                    Number: employee.number ?? null,
                }
            },
            DateAdded: new Date().toISOString(),
            Detail: 
                `NO#0001`+
                `#FIRST#${employee.firstName.toUpperCase()}`+
                `#LAST#${employee.lastName.toUpperCase()}`+
                `#EMAIL#${employee.email.toLowerCase()}`,
            IsActive: true,
        }
        console.log(`Item: ${JSON.stringify(employee)}`)
        let params =  {
            TableName: this.tableName,
            Item: item
        }
        return await db.create(params)
    }
}