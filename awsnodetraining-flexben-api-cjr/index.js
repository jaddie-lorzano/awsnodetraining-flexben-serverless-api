import express from "express";
import serverless from "serverless-http";
import { faker } from '@faker-js/faker';
import { ulid } from "ulid";
import EmployeeRepository from "./repositories/employee.repository.js";

const app = express();
app.use(express.json()); // always put Content-Type:application/json in API Gateway when testing

app.post('/api/v1/hr/employee/create', async (req, res) => {

    // to be deleted
    class Employee {
        constructor() {
            this.employeeId = ulid();
            this.firstName = faker.name.firstName();
            this.lastName = faker.name.lastName();
            this.email = faker.internet.email(this.firstName.toLowerCase(), this.lastName.toLowerCase(), 'pointwest.com.ph')
            this.password = faker.internet.password(12);
            this.details = () => {
                return {
                    employeeId: this.employeeId,
                    firstName: this.firstName,
                    lastName: this.lastName,
                    email: this.email,
                    password: this.password
                }
            }
        }

    }

    let employee = new Employee();
    const employeeRepo = new EmployeeRepository({ tableName: 'flexben-cris-jad-rodel'})
    const data = await employeeRepo.createEmployee(employee.details())
        .then((data) => { return data })
        .catch((err) => { return err });
    return res.status(201).json({
        status: 201,
        statusText: 'Created',
        message: 'Employee created',
        data: {
            employee: data.params
        } 
    })
})
export const api = serverless(app);