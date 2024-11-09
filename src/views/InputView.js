import CONVENIENCE_STORE_MESSAGES from "../constants/messages/convenienceStoreMessages.js";
import { Console } from "@woowacourse/mission-utils" 

/**
 * 사용자 입력을 위한 js
 */
const InputView = {
    async inputReadLinePurchaseProducts() {
        return await Console.readLineAsync(CONVENIENCE_STORE_MESSAGES.input_product_and_quantity);
    },
}

export default InputView;