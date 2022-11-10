import { ulid } from 'ulid';
import DBContext from '../config/AWS.DbContext.js';
const db = new DBContext();

export default class ReimbursementListRepository {
    constructor() {
        this.tableName = "flexben-cris-jad-rodel";
        this.employee = null;
    }
    getTableName () { return this.tableName; }
    getReimbursementList (id) {
        return this.employee
    }
}

let repo = new ReimbursementListRepository();
console.log(repo.employee)
console.log(repo.getReimbursementList(1))
repo.employee = "Jaddie"
console.log(repo.employee)
console.log(repo.getReimbursementList(1))