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

    outputPrintReceiptHeader() {
        Console.print(CONVENIENCE_STORE_MESSAGES.output_receipt_header);
    },

    outputPrintReceipPurcheseProduct(purchaseProducts) {
        purchaseProducts.forEach(product => Console.print(CONVENIENCE_STORE_MESSAGES.output_receipt_purchese_product(product)));
    },

    outputPrintReceipPromotionPresent() {
        Console.print(CONVENIENCE_STORE_MESSAGES.output_receipt_promotion_present);
    },

    outputPrintReceipPromotionProducts(promotionProducts) {
        promotionProducts.forEach(product => Console.print(CONVENIENCE_STORE_MESSAGES.output_receipt_promotion_products(product)));
    },

    outputPrintReceipAmount(amount, totalQuantity) {
        Console.print(CONVENIENCE_STORE_MESSAGES.output_receipt_amount_start_line);
        Console.print(CONVENIENCE_STORE_MESSAGES.output_receipt_totalAmount(amount.totalAmount, totalQuantity));
        Console.print(CONVENIENCE_STORE_MESSAGES.output_receipt_discountAmount(amount.discountAmount));
        Console.print(CONVENIENCE_STORE_MESSAGES.output_receipt_membershipDiscount(amount.membershipDiscount));
        Console.print(CONVENIENCE_STORE_MESSAGES.output_receipt_finalAmount(amount.finalAmount));
    }    
}

export default OutputView;