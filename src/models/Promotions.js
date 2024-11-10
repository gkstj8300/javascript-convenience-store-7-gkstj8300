import PROMOTION from "../constants/promotion/promotion.js";
import FLAG from "../constants/flag/flag.js";
import { first } from "../utils/collection.js";
import { isDateInRange } from "../utils/date.js";

class Promotions {
    /**
     * @type { Object[] } 프로모션 목록
     */  
    #promotions;

    constructor(promotions) {
        this.#promotions = promotions;
    }

    /**
     * 구매 상품 중 프로모션 적용이 필요한 상품들을 필터링합니다.
     * @param {Object[]} products - 전체 상품 목록
     * @param {Array[]} purchaseProducts - 구매한 상품 목록 [상품명, 수량]
     * @returns {Object[]} 프로모션 적용이 필요한 상품 목록
     */    
    getIsPromotionProducts(products, purchaseProducts) {
        return purchaseProducts.map((purchase) => this.#processPromotionProduct(products, purchase)).filter(Boolean);
    }

    /**
     * 프로모션이 적용된 최종 상품 목록을 생성합니다.
     * @param {Object[]} products - 전체 상품 목록
     * @param {Array[]} purchaseProducts - 구매한 상품 목록 [상품명, 수량]
     * @returns {Object[]} 프로모션이 적용된 상품 목록
     */    
    getFilterPromotionProducts(products, purchaseProducts) {
        return purchaseProducts
            .map(([ productName, quantity ]) => this.#createFilteredProduct(products, productName, quantity))
            .filter(Boolean);
    }

    /**
     * 프로모션 적용 결과에 따라 구매 상품 목록을 업데이트합니다.
     * @param {Array[]} purchaseProducts - 현재 구매 상품 목록
     * @param {Object} promotionResult - 프로모션 적용 결과
     * @param {string} inputWhetherResult - 사용자의 프로모션 적용 여부 선택
     * @returns {Array[]} 업데이트된 구매 상품 목록
     */    
    updatePurchaseProductsByPromotion(purchaseProducts, promotionResult, inputWhetherResult) {
        const updatedProducts = [...purchaseProducts];
        const productIndex = this.#findProductIndex(updatedProducts, promotionResult.productName);
        
        return this.#applyPromotionUpdate(updatedProducts, productIndex, promotionResult, inputWhetherResult);
    }    

    #createFilteredProduct(products, productName, quantity) {
        const product = this.#findPromotionProduct(products, productName);
        if(!product) return;
        
        const promotion = this.#findPromotion(product.promotion);
        return this.#calculateFilteredProduct(promotion, productName, quantity, product);
    }

    /**
     * 프로모션이 적용된 상품의 무료 수량을 계산합니다.
     * @private
     */    
    #calculateFilteredProduct(promotion, productName, quantity, product) {
        if(!this.#findIsDateInRange(promotion)) {
            return { ...promotion, name: productName, freeQuantity: 0, price: product.price };
        }
        
        const maxPromotionQuantity = Math.min(quantity, product.quantity);
        const freeQuantity = Math.floor(maxPromotionQuantity / (promotion.buy + promotion.get));
        return { ...promotion, name: productName, freeQuantity, price: product.price };
    }

    #applyPromotionUpdate(products, index, result, inputResult) {
        if (this.#isDiscountRemoval(result.whetherFlag, inputResult)) {
            products.splice(index, 1);
        } else if (this.#isPlusIncrease(result.whetherFlag, inputResult)) {
            this.#incrementQuantity(products, index);
        }
        return products;
    }

    #isDiscountRemoval(whetherFlag, inputResult) {
        return whetherFlag === PROMOTION.DISCOUNT && FLAG.FALSE === inputResult;
    }

    #isPlusIncrease(whetherFlag, inputResult) {
        return whetherFlag === PROMOTION.PLUS && FLAG.TRUE === inputResult;
    }

    #incrementQuantity(products, index) {
        const currentQuantity = parseInt(products[index][1]);
        products[index][1] = currentQuantity + 1;
    }

    #findProductIndex(products, productName) {
        return products.findIndex(([name]) => name === productName);
    }

    /**
     * 상품의 프로모션 적용 가능 여부를 검증하고 결과를 계산합니다.
     * @private
     */
    #processPromotionProduct(products, purchase) {
        const validProduct = this.#validatePromotionProduct(products, purchase[0]);
        if (!validProduct) {
            return null
        };
        return this.#calculatePromotionResult(purchase, validProduct.quantity, validProduct.promotion);
    }

    #calculatePromotionResult(purchase, productQuantity, promotion) {
        const [productName, purchaseQuantity] = purchase;
        return this.#determinePromotionResult(productName, promotion, purchaseQuantity, productQuantity);
    }

    /**
     * 프로모션 적용 조건을 확인하고 결과를 결정합니다.
     * @private
     * @returns {Object|null} 프로모션 적용 결과 또는 null
     */    
    #determinePromotionResult(productName, promotion, purchaseQuantity, productQuantity) {
        const promotionUnit = promotion.buy + promotion.get;
        if (purchaseQuantity > productQuantity) {
            return this.#createPromotionResult(productName, this.#calculateExcessQuantity(productQuantity, purchaseQuantity, promotionUnit), 1);
        }
        if ((purchaseQuantity === promotion.buy) || (purchaseQuantity > promotionUnit && purchaseQuantity % promotionUnit === promotion.buy)) {
            return this.#createPromotionResult(productName, 1, 2);
        }
        return null;
    }

    #validatePromotionProduct(products, productName) {
        const promotionProduct = this.#findPromotionProduct(products, productName);
        if (!promotionProduct) {
            return null;
        }
        return this.#validatePromotion(promotionProduct);
    }

    #validatePromotion(promotionProduct) {
        const promotion = this.#findPromotion(promotionProduct.promotion);
        if (!promotion || !this.#findIsDateInRange(promotion)) {
            return null;
        }
        return { ...promotionProduct, promotion };
    }

    #findPromotionProduct(products, productName) {
        return first(products.filter(product => product.name === productName && product.promotion));
    }

    #findPromotion(promotionName) {
        return first(this.#promotions.filter(product => product.name === promotionName));
    }

    #findIsDateInRange(promotion) {
        return isDateInRange(promotion.start_date, promotion.end_date);
    }

    #createPromotionResult(productName, quantity, whetherFlag) {
        return { productName, quantity, whetherFlag };
    }

    /**
     * 초과 구매 수량을 계산합니다.
     * 재고 수량을 초과하여 구매한 경우 프로모션 단위를 고려하여 계산합니다.
     * @private
     */    
    #calculateExcessQuantity(productQuantity, purchaseQuantity, promotionUnit) {
        return (productQuantity % promotionUnit) + (purchaseQuantity - productQuantity);
    }
}

export default Promotions;