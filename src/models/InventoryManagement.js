import replacePurchaseProducts from "../utils/replacePurchaseProducts.js";
import InventoryValidation from "../validation/InventoryValidation.js";

class InventoryManagement {
    /**
     * @type { Object[] } 상품 목록
     */  
    #products;

    /**
     * @type { Array } 구매할 상품 목록
     */     
    #purchaseProducts;

    /**
     * @type { InventoryValidation } 구매할 상품 목록에 대한 유효성 검증 클래스
     */  
    #inventoryValidation = new InventoryValidation();

    constructor(products, purchaseProducts) {
        this.#products = products;
        this.#purchaseProducts = purchaseProducts;
        this.#inventoryValidate()
    }

    /**
     * 구매 상품 목록에 가격 정보를 추가하여 반환
     * @returns {Array} 가격이 추가된 구매 상품 목록
     */    
    getPurchaseProducts() {
        const enrichedPurchaseProducts = replacePurchaseProducts(this.#purchaseProducts);
        return this.#addPricesToPurchases(enrichedPurchaseProducts);
    }

    /**
     * 구매 처리 후 재고 업데이트
     * 프로모션 상품을 우선적으로 처리한 후, 일반 상품 처리
     */    
    updateProducts() {
        this.#purchaseProducts.forEach(this.#processPurchase.bind(this));
        return this.#products;
    }

    #inventoryValidate() {
        if(typeof this.#purchaseProducts === "string") {
            this.#inventoryValidation.inventoryValidate(this.#products, this.#purchaseProducts);
        }
    }

    #addPricesToPurchases(purchases) {
        return purchases.map(purchase => {
            const [productName] = purchase;
            const product = this.#findProductByName(productName);
            if(product) {
                return [...purchase, product.price];
            }
            return purchase;
        });
    }

    #findProductByName(name) {
        return this.#products.find(product => product.name === name);
    }

    /**
     * 구매 처리 후 재고 업데이트
     * 프로모션 상품을 우선적으로 처리한 후, 일반 상품 처리
     */    
    #processPurchase([productName, quantity]) {
        let remainingQuantity = parseInt(quantity);
        remainingQuantity = this.#updateProductQuantity(productName, remainingQuantity, true);
        if (remainingQuantity > 0) {
            remainingQuantity = this.#updateProductQuantity(productName, remainingQuantity, false);
        }
    }

    /**
     * 상품의 재고 수량 업데이트
     * @param {string} productName - 상품명
     * @param {number} remainingQuantity - 남은 구매 수량
     * @param {boolean} hasPromotion - 프로모션 상품 여부
     * @returns {number} 처리 후 남은 수량
     */    
    #updateProductQuantity(productName, remainingQuantity, hasPromotion) {
        const matchingProducts = this.#findMatchingProducts(productName, hasPromotion);
        matchingProducts.forEach(product => {
            if (remainingQuantity > 0) {
                remainingQuantity -= this.#deductQuantity(product, remainingQuantity);
            }
        });
        return remainingQuantity;
    }

    #findMatchingProducts(productName, hasPromotion) {
        return this.#products.filter(product => 
            product.name === productName && Boolean(product.promotion) === hasPromotion
        );
    }

    /**
     * 실제 재고 차감 처리
     * @param {Object} product - 상품 객체
     * @param {number} remainingQuantity - 차감할 수량
     * @returns {number} 실제 차감된 수량
     */    
    #deductQuantity(product, remainingQuantity) {
        const deduction = Math.min(product.quantity, remainingQuantity);
        product.quantity -= deduction;
        return deduction;
    }
}

export default InventoryManagement;