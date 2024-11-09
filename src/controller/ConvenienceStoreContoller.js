import InventoryManagement from "../models/InventoryManagement.js";
import getLoadProducts from "../services/getLoadProducts.js";
import asyncFunction from "../utils/asyncFunction.js";
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

    async convenienceStoreRun() {
        this.#printStartMessage();
        await asyncFunction(this.#getProducts, this);
        this.#printProductsList();
        await asyncFunction(this.#getPurchaseProducts, this);
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
}

export default ConvenienceStoreContoller;