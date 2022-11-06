export default class UserService {
    constructor({
        accountRepository,
        employeeRepository,
        roleRepository
    }) {
        this.accountRepository = accountRepository;
        this.employeeRepository = employeeRepository;
        this.roleRepository = roleRepository;
    }
    async getRoleById (roleId) {
        let role
        await this.roleRepository.getById(roleId)
            .then(entity => {
                role = entity[0]
            })
            .catch(err => {return err});
        return role
    }
    async getAccountById (accountId) {
        let account
        await this.accountRepository.getById(accountId)
            .then(entity => {
                account = entity[0]
            })
            .catch(err => {return err});
        return account
    }
    async getEmployeeById (employeeId) {
        let employee
        await this.employeeRepository.getById(employeeId)
            .then(entity => {
                employee = entity[0]
            })
            .catch(err => {return err});
        return employee
    }
}