
import { AccountRepository, EmployeeRepository, RoleRepository } from "../repositories/index.js";
import { AuthenticationService } from "../services/index.js";
import UserService from "../services/user.service.js";

const authService = new AuthenticationService();
const accountRepository = new AccountRepository()
const employeeRepository = new EmployeeRepository()
const roleRepository = new RoleRepository();
const userService = new UserService({
    accountRepository, 
    employeeRepository,
    roleRepository,
});

let refreshTokens = [];

const UserController = {
    validateAccountId : async (req, res, next) => {
        const accountId = req.body.accountId;
        if (accountId == null) {
            return next(new Error('No account ID provided'))
        }
        if (isNaN(accountId)) {
            return next(new Error('Please enter a valid account ID'))
        }
        req.user = {
            account_id : accountId,
        }
        next();
    },
    validateAccountById : async (req, res, next) => {
        let user = req.user
        let account
        if (user) {
            let accountId = user.account_id
            await userService
                .getAccountById(accountId)
                .then(data => account = data)
                .catch(err => next(err));
        }
        if (!account) {
            res.status(404).json({
                status: 404,
                statusText: "Not Found",
                message: `The account id ${user.account_id} notfound.`,
                error: {
                    code: "NOT_FOUND",
                    message: `The account id ${user.account_id} notfound.`
                }
            })
        } else {
            req.user.employee_id = account.employee_id
            req.password = account.password
            next();
        }
    },
    validatePassword : async (req, res, next) => {
        let enteredPassword = req.body.password;
        let accountPassword = req.password;
        if (accountPassword != enteredPassword) {
            res.status(401).json({
                status: 401,
                statusText: 'Unauthorized',
                message: 'Password is incorrect.',
                error: {
                    code: 'UNAUTHORIZED',
                    message: 'Password is incorrect.'
                }
            })
        } else {
            next();
        }
    },
    getUserNameAndRoleByEmployeeId: async (req, res, next) => {
        let employeeId = req.user.employee_id
        let employee
        await userService
            .getEmployeeById(employeeId)
            .then(data => employee = data)
            .catch(err => { return next(err) });
        if (!employee) {
            res.status(404).json({
                status: 404,
                statusText: "Not Found",
                message: `The employee id ${employeeId} not found.`,
                error: {
                    code: "NOT_FOUND",
                    message: `The employee id ${employeeId} not found.`
                }
            })
        } else {
            req.user.firstname = employee.firstname;
            req.user.lastname = employee.lastname;
            req.user.role_id = employee.role_id;
            next();
        }
    },
    getUserRoleNameById : async (req, res, next) => {
        let roleId = req.user.role_id;
        let role
        await userService
            .getRoleById(roleId)
            .then(data => role = data)
            .catch(err => { return next(err) });
        if (!role) {
            res.status(404).json({
                status: 404,
                statusText: "Not Found",
                message: `The role id ${roleId} not found.`,
                error: {
                    code: "NOT_FOUND",
                    message: `The role id ${roleId} not found.`
                }
            })
        } else {
            req.user.role = role.name;
            next();
        }

    },
    generateUserToken : async (req, res, next) => {
        let user = req.user
        const accessToken = await authService.generateAccessToken(user)
        const refreshToken = await authService.generateRefreshToken(user)
        refreshTokens.push(refreshToken)
        req.user.token = {
            accessToken: accessToken,
            refreshToken: refreshToken
        }
        next();
    },
    login : async (req, res, next) => {
        let user = req.user
        if (!user) {
            res.status(404).json({
                status: 404,
                statusText: "Not Found",
                message: `User not found.`,
                error: {
                    code: "NOT_FOUND",
                    message: `User not found.`
                }
            })
        } else {
            res.status(200).json({
                status: 200,
                statusText: "OK",
                message: `User '${user.firstname} ${user.lastname}' successfully logged in`,
                token: user.token
            })
        }
    },
    logout : async (req, res, next) => {
        refreshTokens = refreshTokens.filter(token => token !== req.body.token)
        res.sendStatus(204)
    },
    authenticateToken : async (req, res, next) => {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        let user
        if (token == null) return res.sendStatus(401)
        await authService.getUserfromToken(token)
            .then(data => {
                user = data;
            })
            .catch(err => next(err));
        if (!user) {
            return res.status(401).json({
                status: 401,
                ststusText: 'Unauthorized',
                message: 'You are not authorized to access this website',
                error: {
                    code: 'UNAUTHORIZED',
                    message: 'You are not authorized to access this website',
                }
            })
        } else {
            req.user = user;
            next();
        }
    },
    refreshToken : async (req, res, next) => {
        const refreshToken = req.body.token
        if (refreshToken == null) return res.sendStatus(401)
        if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
        let accessToken = await authService.refreshToken(refreshToken)
            .then(accessToken => {
                return accessToken
            })
            .catch(err => next(err));
        if (accessToken == null) return res.sendStatus(403)
        else {
            res.json({ accessToken: accessToken })
        }
    },
    retrieveEmployeeDetails : async (req, res, next) => {
        let firstName = req.user.firstname;
        let lastName = req.user.lastname;
        let role = req.user.role;
        let data = {
            firstName,
            lastName,
            role
        }
        let response = {
            status: 200,
            statusText: 'OK',
            message: "Employee Details Retrieved",
            data
        }
        res.status(200).json(response)
    },
};

export default UserController;