import getLoadProducts from "../services/getLoadProducts.js";
import asyncFunction from "../utils/asyncFunction.js";
import OutputView from "../views/OutputView.js";

class ConvenienceStoreContoller {

    #products;

    async convenienceStoreRun() {
        this.#printStartMessage();
        await asyncFunction(this.#getProducts, this);
        this.#printProductsList();
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
}

export default ConvenienceStoreContoller;