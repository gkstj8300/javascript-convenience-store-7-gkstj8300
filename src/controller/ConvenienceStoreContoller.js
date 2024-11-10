import InventoryManagement from "../models/InventoryManagement.js";
import Promotions from "../models/Promotions.js";
import getLoadProducts from "../services/getLoadProducts.js";
import getLoadPromotions from "../services/getLoadPromotions.js";
import asyncFunction from "../utils/asyncFunction.js";
import WhetherValidation from "../validation/WhetherValidation.js";
import InputView from "../views/InputView.js";
import OutputView from "../views/OutputView.js";

class ConvenienceStoreContoller {

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

    async convenienceStoreRun() {
        this.#printStartMessage();
        await asyncFunction(this.#getProducts, this);
        this.#printProductsList();
        await asyncFunction(this.#getPurchaseProducts, this);
        await asyncFunction(this.#getPromotionProducts, this);
        await asyncFunction(this.#getIsMembership, this);
    }

    #printStartMessage() {
        OutputView.outputPrintStartMessage();
        OutputView.outputPrintGoodsInPossession();
        OutputView.outputPrintEmptyLine();
    }

    async #getProducts() {
        if(!this.#products) {
            this.#products = await getLoadProducts();
        }
    }

    #printProductsList() {
        OutputView.outputPrintProducts(this.#products);
        OutputView.outputPrintEmptyLine();
    }

    async #getPurchaseProducts() {
        const INPUT_PURCHASE_PRODUCTS = await InputView.inputReadLinePurchaseProducts();
        const inventoryManagement = new InventoryManagement(this.#products, INPUT_PURCHASE_PRODUCTS);
        this.#purchaseProducts = inventoryManagement.getPurchaseProducts();
        OutputView.outputPrintEmptyLine();
    }

    async #getPromotionProducts() {
        const loadPromotions = await getLoadPromotions();
        const promotions = new Promotions(loadPromotions);
        const promotionResults = promotions.getIsPromotionProducts(this.#products, this.#purchaseProducts);
        if(promotionResults.length > 0) {
            await this.#getWhetherResult(promotions, promotionResults);
        }
        this.#promotionProducts = promotions.getFilterPromotionProducts(this.#products, this.#purchaseProducts);
    }

    async #getWhetherResult(promotions, promotionResults) {
        for (const result of promotionResults) {
            const INPUT_WHETHER_RESULT = await InputView.inputReadLineWhetherResult(result);
            WhetherValidation.whetherValidate(INPUT_WHETHER_RESULT);
            this.#purchaseProducts = promotions.updatePurchaseProductsByPromotion(this.#purchaseProducts, result, INPUT_WHETHER_RESULT);
            OutputView.outputPrintEmptyLine();
        }
    }    

    async #getIsMembership() {
        this.#isMembership = await InputView.inputReadLineIsMembership();
        WhetherValidation.whetherValidate(this.#isMembership);
        OutputView.outputPrintEmptyLine();
    }
}

export default ConvenienceStoreContoller;