import CONVENIENCE_STORE_MESSAGES from "../constants/messages/convenienceStoreMessages.js";
import PROMOTION from "../constants/promotion/promotion.js";
import { Console } from "@woowacourse/mission-utils" 

/**
 * 사용자 입력을 위한 js
 */
const InputView = {
    async inputReadLinePurchaseProducts() {
        return await Console.readLineAsync(CONVENIENCE_STORE_MESSAGES.input_product_and_quantity);
    },

    async inputReadLineWhetherResult(promotionResult) {
        const { whetherFlag, productName } = promotionResult;
        if (whetherFlag === PROMOTION.DISCOUNT) {
            return Console.readLineAsync(CONVENIENCE_STORE_MESSAGES.input_whether_promotion_discount(promotionResult));
        }
        return Console.readLineAsync(CONVENIENCE_STORE_MESSAGES.input_whether_promotion_plus(productName));
    },

    async inputReadLineIsMembership() {
        return await Console.readLineAsync(CONVENIENCE_STORE_MESSAGES.input_is_membership);
    },
}

export default InputView;