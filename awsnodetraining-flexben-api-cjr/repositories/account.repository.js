import DBContext from '../config/AWS.DbContext.js';
const db = new DBContext();
export default class AccountRepository {
    constructor() {
        this.tableName = "flexben-cris-jad-rodel";
    }
}