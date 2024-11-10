import AppError from "../errors/AppError.js";
import ERROR_MESSAGE from "../constants/messages/errorMessages.js";
import FLAG from "../constants/flag/flag.js";

class WhetherValidation {
    static whetherValidate(whetherFlag) {
        this.validateWhetherNotEmpty(whetherFlag);
        this.validateWhetherUpperCase(whetherFlag);
        this.validateWhetherFormat(whetherFlag);
    }

    static validateWhetherNotEmpty(whetherFlag) {
        if(whetherFlag === '' || whetherFlag === undefined) {
            throw new AppError(ERROR_MESSAGE.input_not_empty);
        }
    }

    static validateWhetherUpperCase(whetherFlag) {
        if(whetherFlag !== whetherFlag.toUpperCase()) {
            throw new AppError(ERROR_MESSAGE.input_whether_uppercase);
        }
    }    

    static validateWhetherFormat(whetherFlag) {
        if(whetherFlag !== FLAG.TRUE && whetherFlag !== FLAG.FALSE) {
            throw new AppError(ERROR_MESSAGE.input_whether_format);
        }
    }
}

export default WhetherValidation;