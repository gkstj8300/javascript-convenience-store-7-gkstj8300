import CONVENIENCE_STORE_MESSAGES from "../constants/messages/convenienceStoreMessages.js";
import { Console } from "@woowacourse/mission-utils";

/**
 * 사용자에게 출력값 및 메세지를 보여주기 위한 js
 */
const OutputView = {
    outputPrintError(errorMessage) {
        Console.print(errorMessage);
    },

    outputPrintEmptyLine() {
        Console.print('');
    },

    outputPrintStartMessage() {
        Console.print(CONVENIENCE_STORE_MESSAGES.output_welcome);
    },

    outputPrintGoodsInPossession() {
        Console.print(CONVENIENCE_STORE_MESSAGES.output_goods_in_possession);
    },

    outputPrintProducts(products) {
        products.forEach(product => {
            if(product.quantity === 0) {
                return Console.print(CONVENIENCE_STORE_MESSAGES.output_goods_no_stock(product))
            }
            return Console.print(CONVENIENCE_STORE_MESSAGES.output_goods_in_product(product));
        });
    },
}

export default OutputView;