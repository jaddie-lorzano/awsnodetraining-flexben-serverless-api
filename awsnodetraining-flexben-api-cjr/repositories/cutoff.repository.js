import DBContext from '../config/AWS.DbContext.js';
const db = new DBContext();
export default class CutOffRepository {
    constructor() {
        this.tableName = "flexben-cris-jad-rodel";
    }
    getCutOff = async () => {
        let item = {
            PK: `CATEGORY#${id}`,
            SK: 'CATEGORY',
            '#Type': 'Category',
            Code: code,
            Data: {
                Category: {
                    Code: code,
                    Name: name,
                    Description: description,
                    DateAdded: dateAdded ?? new Date().toISOString(),
                    AddedBy: addedBy ?? 'System',
                    UpdatedDate: updatedDate ?? null, 
                    UpdatedBy: updatedBy ?? null,

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