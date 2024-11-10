import FLAG from "../constants/flag/flag.js";
import { isDateInRange } from "../utils/date.js";

class Receipt {
    // 멤버십 할인율 (30%)
    static MEMBERSHIP_DISCOUNT_RATE = 0.3;

    /**
     * @type { Object[] } 상품 목록
     */  
    #products;

    /**
     * @type { Array } 구매할 상품 목록
     */    
    #purchaseProducts;

    /**
     * @type { Array } 프로모션 적용 상품 목록
     */    
    #promotionProducts;

    /**
     * @type { Boolean } 멤버쉽 할인 적용 여부
     */    
    #isMembership;

    constructor(products, purchaseProducts, promotionProducts, isMembership) {
        this.#products = products;
        this.#purchaseProducts = purchaseProducts;
        this.#promotionProducts = promotionProducts;
        this.#isMembership = isMembership;
    }

    /**
     * 영수증의 최종 금액을 계산하여 반환
     * @returns { Object } 총액, 할인액, 정상가 상품 금액, 멤버십 할인액, 최종 금액을 포함한 객체
     */    
    getReceiptAmount() {
        const { totalAmount, regularAmount } = this.#calculateAmounts();
        const discountAmount = this.#getDiscountAmount();
        const membershipDiscount = this.#getMembershipDiscount(regularAmount);
        const finalAmount = totalAmount - discountAmount - membershipDiscount;
        return { 
            totalAmount, discountAmount, regularAmount, membershipDiscount, finalAmount
        };
    }

    /**
     * 구매한 모든 상품의 수량을 계산하여 반환
     */    
    getTotalQuantity() {
        return this.#purchaseProducts.reduce((sum, [, quantity]) => sum + Number(quantity), 0);
    }

    /**
     * 정상가 상품과 프로모션 상품의 총 금액을 계산
     * @returns { Object } totalAmount(총 금액)와 regularAmount(정상가 상품 금액)를 포함한 객체
     * @private
     */    
    #calculateAmounts() {
        const amounts = this.#purchaseProducts.reduce((acc, [productName, quantity]) => {
            const product = this.#products.find(p => p.name === productName);
            const amount = this.#getProductAmount(product.price, quantity);
            return {
                totalAmount: acc.totalAmount + amount,
                regularAmount: acc.regularAmount + (product.promotion ? 0 : amount)
            };
        }, { totalAmount: 0, regularAmount: 0 });
        return amounts;
    }

    #getProductAmount(price, quantity) {
        return price * quantity;
    }

    /**
     * 프로모션으로 인한 총 할인 금액을 계산
     * @returns { number }
     * @private
     */    
    #getDiscountAmount() {
        return this.#promotionProducts.reduce((total, product) => {
            if(isDateInRange(product.start_date, product.end_date)) {
                return total + (product.freeQuantity * product.price);
            }
            return total + 0;
        }, 0);
    }

    /**
     * 멤버십 할인 금액을 계산
     * 정상가 상품에 대해서만 멤버십 할인이 적용됨
     * @param { number } regularAmount - 정상가 상품의 총 금액
     * @returns { number } 멤버십 할인 금액
     * @private
     */    
    #getMembershipDiscount(regularAmount) {
        if(this.#isMembership === FLAG.TRUE) {
            return Math.floor(regularAmount * Receipt.MEMBERSHIP_DISCOUNT_RATE);
        }
        return 0;
    }
}

export default Receipt;