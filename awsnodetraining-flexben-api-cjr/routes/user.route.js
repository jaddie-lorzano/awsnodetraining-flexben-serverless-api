import { Router } from "express"
import { UserController } from "../controllers/index.js"

const UserRoute = Router();
UserRoute
    .route('/login')
    .post(
        UserController.validateAccountId,
        UserController.validateAccountById,
        UserController.validatePassword,
        UserController.getUserNameAndRoleByEmployeeId,
        UserController.getUserRoleNameById,
        UserController.generateUserToken,
        UserController.login
        )
    .all((req, res, next) => {
        next(new Error('Bad Request'))
    })
UserRoute
    .route('/logout')
    .all(UserController.logout)
UserRoute
    .route('/token')
    .post(UserController.refreshToken)
    .all((req, res, next) => {
        next(new Error('Bad Request'))
    })
UserRoute
    .use(
        UserController.authenticateToken
    )
// US0001: 
// The application should be able to retrieve 
// the user information
UserRoute
    .route('/info')
    .get(UserController.retrieveEmployeeDetails)

export default UserRoute