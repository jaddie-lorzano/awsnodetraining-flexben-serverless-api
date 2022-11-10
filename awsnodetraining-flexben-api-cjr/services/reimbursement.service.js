import { REIMBURSEMENT_CUT_OFF_AMOUNT } from "../constants/index.js"

export default class ReimbursementService {
    validateBody = async ({
        dateAdded = new Date(),
        amount,
        orNumber,
        nameOfEstablishment,
        tinOfEstablishment,

    }) => {
        let cutOffAmount = REIMBURSEMENT_CUT_OFF_AMOUNT;
        const _dateAdded = dateAdded
        const _amount = amount
        const _orNumber = orNumber
        const _nameOfEstablishment = nameOfEstablishment
        const _tinOfEstablishment = tinOfEstablishment
        let isValidBody = {
            isValid: true,
            error: []
        }
        isValidBody = await this.validateIfEmptyOrNull( 'OR Number', _orNumber, isValidBody)
        isValidBody = await this.validateIfEmptyOrNull( 'Name of Establishment', _nameOfEstablishment, isValidBody)
        isValidBody = await this.validateIfEmptyOrNull( 'TIN of Establishment' , _tinOfEstablishment, isValidBody)
        isValidBody = await this.validateIfEmptyOrNull( 'Amount' , _amount, isValidBody)
        isValidBody = await this.validateReimbursementDate(_dateAdded, isValidBody);
        isValidBody = await this.validateReimbursementAmount(_amount, cutOffAmount, isValidBody,);
        let reimbursementItem = {
            _dateAdded,
            _amount,
            _orNumber,
            _nameOfEstablishment,
            _tinOfEstablishment,
        }
        console.log(`Validation: ${JSON.stringify(isValidBody)}`)
        return { reimbursementItem, isValidBody }
    }
    validateIfEmptyOrNull = async (item, value, { isValid, error }) => {
        if (value == null || value == undefined) {
            isValid = false;
            error.push(`${item} is null or undefined`)
        }
        if (value == "") {
            isValid = false;
            error.push(`${item} is empty`)
        }
        let isValidBody = { isValid, error };
        return isValidBody
    }
    validateReimbursementDate = async (date, { isValid, error }) => {
        const dateNow = new Date().toLocaleString('en', {timeZone: 'Asia/Singapore'});
        const dateToday = new Date(dateNow);
        const dateTodayString = dateToday.toDateString()
        const dateString = date.toDateString()
        if (date.getFullYear() != dateToday.getFullYear()) {
            isValid = false;
            error.push(`Reimbursement Date: ${date} does not fall in the current year`)
        }
        if ( new Date(dateString) > new Date(dateTodayString) ) {
            isValid = false;
            error.push(`Reimbursement Date: ${dateString} falls in a future date`)
        }
        let isValidBody = { isValid, error };
        return isValidBody
    }
    validateReimbursementAmount = async (amount, cutoffAmount, { isValid, error }) => {
        if ( amount > cutoffAmount ) {
            isValid = false;
            error.push(`Reimbursement Amount: ${amount} PhP is greater than the cut off amount, ${cutoffAmount} PhP`)
        }
        let isValidBody = { isValid, error };
        return isValidBody
    }
    
}

const service = new ReimbursementService()

service.validateBody({
    dateAdded : new Date("2023-11-1"),
    amount : 500,
    orNumber : '123_456_7890',
    nameOfEstablishment : 'Hello',
    tinOfEstablishment: '235-4564-34534',
})