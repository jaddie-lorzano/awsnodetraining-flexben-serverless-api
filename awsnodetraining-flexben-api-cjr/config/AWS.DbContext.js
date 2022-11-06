import AWS from 'aws-sdk';
AWS.config.update({region: 'ap-southeast-1'});

// Create DynamoDB document client
const dbClient = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});

class DBContext {
    constructor() {
        this.db = dbClient;
    }
    async scan (params) {
        return new Promise((resolve, reject) => {
            this.db.scan(params, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data.Items)
                }
            })
        })
    }
    async query (params) {
        return new Promise((resolve, reject) => {
            this.db.query(params, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data.Items)
                }
            })
        })
    }
    async update (params) {
        return new Promise((resolve, reject) => {
            this.db.update(params, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        })
    }
    async remove (params) {
        return new Promise((resolve, reject) => {
            this.db.delete(params, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        })
    }
    async create (params) {
        return new Promise((resolve, reject) => {
            this.db.put(params, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        })
    }
    async get (params) {
        return new Promise((resolve, reject) => {
            this.db.get(params, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        })
    }
}

// const db = {
//     scan : async (params) => {
//         try {
//             const data = await dbClient.scan(params).promise();
//             return data['Items'];
//         }
//         catch (err) {
//             return err;
//         }
//     },
//     query : async (params) => {
//         try {
//             const data = await dbClient.query(params).promise();
//             return data['Items'];
//         }
//         catch (err) {
//             return err;
//         }
//     },
//     create : async (params) => {
//         try {
//             await dbClient.put(params, function(data) {
//                 return data;
//             });
//         }
//         catch (err) {
//             return err;
//         }
//     },
//     update : async (params) => {
//         try {
//             await dbClient.update(params, function (data) {
//             return data;
//             });
//         }
//         catch (err) {
//             return err;
//         }
//     },
//     remove : async (params) => {
//         try {
//           const data = await dbClient.delete(params).promise();
//           return data;
//         }
//         catch (err) {
//           return err;
//         }
//     }
// }

// export default db

export default DBContext