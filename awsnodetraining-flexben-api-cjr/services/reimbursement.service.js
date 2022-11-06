export default class ReimbursementService {
    constructor({
        flexReimbursementRepository,
        flexReimbursementDetailRepository,
        categoryRepository,
    }) {
        this.flexReimbursementRepository = flexReimbursementRepository;
        this.flexReimbursementDetailRepository = flexReimbursementDetailRepository;
        this.categoryRepository = categoryRepository;
    }
    async checkReimbursementListId(id) {
        let isExisting = false
        this.flexReimbursementRepository.getById(id)
            .then(reimbursement => {
                if (reimbursement) { isExisting = true; }
            })
    }
    async createNewReimbursementList({
        employee_id,
        flex_cut_off_id
    }) {
        let newReimbursementList = {
            employee_id,
            flex_cut_off_id,
            total_reimbursement_amount: 0,
            date_submitted: null,
            status: 'Draft',
            date_updated: new Date(),
            transaction_number: null,
        }
        let entityId;
        await this.flexReimbursementRepository
            .insert(newReimbursementList)
            .then(id => {
                entityId = id
            })
            .catch(err => {throw err});
        return entityId
    }
    async createNewReimbursementItem({
        flex_reimbursement_id,
        category_id,
        or_number,
        name_of_establishment,
        tin_of_establishment,
        amount,
        date_added
    }) {
        let newReimbursementItem = {
            flex_reimbursement_id,
            category_id,
            or_number,
            name_of_establishment,
            tin_of_establishment,
            amount,
            status : 'Draft',
            date_added
        }
    }
    async getCategoryId (category_name) {
        let categoryId
        await this.categoryRepository.getCategoryId(category_name)
            .then(result => {
                categoryId = result
            })
            .catch(err => {throw err})
        return categoryId        
    }
    async validateReimbursementDate ({
        day,
        month,
        year
    }) {
        let dateAdded = new Date(year, month, day)
        let currentDate = new Date();
        let currentYear = currentDate.getFullYear()
        let currentMonth = currentDate.getMonth()
        let currentDay = currentDate.getDate()
        if (year != currentYear) {
            throw new Error(`Reimbursement date should fall within year '${currentYear}'`)
        }
        if (month > currentMonth) {
            throw new Error(`Reimbursement date should not be beyond the current month`)
        }
        if (day > currentDay && month == currentMonth) {
            throw new Error(`Reimbursement date should not be past the current date`)
        }
        return true;
    }

}