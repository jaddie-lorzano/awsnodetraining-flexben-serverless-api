import express, { json } from "express";
// import AppRoute from "./routes/index.js";
// import { logErrors, clientErrorHandler, errorHandler } from './helpers/error.helper.js';
import serverless from "serverless-http";

const app = express();
app.use(json());

app.use((req, res, next) => {
    res.send("Create Employee")
})

// // app.use('/api/v1/', authenticateToken , AppRoute);
// app.use('/api/v1/' , AppRoute);

// // Configure exception logger
// app.use(logErrors);
// // Configure client error handler
// app.use(clientErrorHandler);
// // Configure catch-all exception middleware last
// app.use(errorHandler);

export const api = serverless(res.send("Hello"));

// export const api = async (event) => {
//   return {
//     statusCode: 200,
//     body: JSON.stringify(
//       {
//         message: 'Go Serverless v3.0! Your function executed successfully!',
//         input: event,
//       },
//       null,
//       2
//     ),
//   };
// }