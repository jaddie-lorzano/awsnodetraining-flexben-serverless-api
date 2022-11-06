import { FLEX_BEN } from '../constants/index.js'

export default class FlexPointCalculator {
    constructor(monthlyRate, flexCredit) {
        this._monthlyRate = monthlyRate ? monthlyRate : NaN;
        this._flexCredit = flexCredit ? flexCredit : NaN;
        this._flexPoints = 0;
        this.taxRate = FLEX_BEN.TAX ? (FLEX_BEN.TAX / 100) : 0;
        this.isValidFlexCredit = false;
        this.isValidMonthlyRate = false;
        this.isValidOperation = false;
    }
    get monthlyRate() { return this._monthlyRate }
    get flexCredit() { return this._flexCredit }
    get flexPoints() { return this._flexPoints; }
    set monthlyRate(monthlyRate) {
        this._monthlyRate = monthlyRate;
        return this;
    }
    set flexCredit(flexCredit) {
        this._flexCredit = flexCredit;
    }
    calculateFlexPoints() {
        let flexPointBeforeTax = (this._monthlyRate /21.75) * this._flexCredit;
        this._flexPoints = flexPointBeforeTax * (1 - this.taxRate)
    }
    validateValues() {
        this._flexCredit = this._flexCredit > 0 ? this._flexCredit : NaN; 
        this._monthlyRate = this._monthlyRate > 0 ? this._monthlyRate : NaN;

        this.isValidFlexCredit = !isNaN(this._flexCredit);
        this.isValidMonthlyRate = !isNaN(this._monthlyRate);

        this.isValidOperation = this.isValidFlexCredit && this.isValidMonthlyRate
        this._flexPoints = this.isValidOperation ? this._flexPoints : NaN;
    }
    async getResult () {
        this.validateValues();
        if (this.isValidOperation) {
            this.calculateFlexPoints();
        }
        return this
    }
}