import { DynamoDB } from "@aws-sdk/client-dynamodb"; // ES6 import
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb"; // ES6 import

// Set the AWS Region.
const REGION = 'ap-southeast-1'
// Create DynamoDB document client
const dbClient = new DynamoDB({ region: REGION });
// client is DynamoDB client
const ddbDocClient = DynamoDBDocument.from(dbClient);

class DBContext {
    constructor() {
        this.db = ddbDocClient;
    }
    scan = async (params) => {
        return this.db.scan(params)
            .then((data) => { return data })
            .catch((err) => { throw new Error(err)});;
    }
    query = async (params) => {
        return this.db.query(params)
            .then((data) => { return data })
            .catch((err) => { throw new Error(err)});;
    }
    update = async (params) => {
        return this.db.update(params)
            .then((data) => { return data })
            .catch((err) => { throw new Error(err)});;
    }
    remove = async (params) => {
        return this.db.delete(params)
            .then((data) => { return data })
            .catch((err) => { throw new Error(err)});;
    }
    create = async (params) => {
        return this.db.put(params)
            .then((data) => { data.params = params; return data })
            .catch((err) => { throw new Error(err) });
    }
    get = async (params) => {
        return this.db.get(params)
            .then((data) => { return data })
            .catch((err) => { throw new Error(err)});;
    }
}

ddbDocClient.destroy(); // no-op
dbClient.destroy(); // destroys DynamoDBClient

export default DBContext
