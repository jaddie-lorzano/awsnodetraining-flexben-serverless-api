const checkResult = () =>{
    class Result {
        constructor(isSuccess, error, value) {
            if (isSuccess && error) {
                throw new Error("InvalidOperation: A result cannot be \n        successful and contain an error");
            }
            if (!isSuccess && !error) {
                throw new Error("InvalidOperation: A failing result \n        needs to contain an error message");
            }
            this.isSuccess = isSuccess;
            this.isFailure = !isSuccess;
            this.error = error;
            this._value = value;
            Object.freeze(this);
        }
        static ok(value) {
            return new Result(true, null, value);
        }
        static fail(error) {
            return new Result(false, error);
        }
        static combine(results) {
            for (var _i = 0, results_1 = results; _i < results_1.length; _i++) {
                var result = results_1[_i];
                if (result.isFailure)
                    return result;
            }
            return Result.ok();
        }
        getValue() {
            if (!this.isSuccess) {
                throw new Error("Cant retrieve the value from a failed result.");
            }
            return this._value;
        }
    }
    return Result;
}

export default checkResult;