import AppError from "../errors/AppError.js";
import DELIMITERS from "../constants/delimiters/delimiters.js";
import ERROR_MESSAGE from "../constants/messages/errorMessages.js";

class InventoryValidation {
    inventoryValidate(products, purchaseProducts) {
        if (!this.#isPurchaseProductsValid(purchaseProducts)) {
            throw new AppError(ERROR_MESSAGE.input_not_empty);
        }
        const parsedProducts = this.#parsePurchaseProducts(purchaseProducts);
        this.#validateProductRules(products, parsedProducts);
    }

    #isPurchaseProductsValid(purchaseProducts) {
        return purchaseProducts && purchaseProducts.trim() !== '';
    }

    #parsePurchaseProducts(purchaseProducts) {
        try {
            return purchaseProducts.split(DELIMITERS.PRODUCT_SEPARATOR).map(product => this.#parseProduct(product));
        } catch (error) {
            throw new AppError(ERROR_MESSAGE.input_purchase_products_format);
        }
    }

    #parseProduct(product) {
        if (!this.#isValidProductFormat(product)) {
            throw new AppError(ERROR_MESSAGE.input_purchase_products_format);
        }
        const [name, quantity] = product.slice(1, -1).split(DELIMITERS.INPUT_SEPARATOR);
        return [name, quantity];
    }

    #isValidProductFormat(product) {
        return product.startsWith(DELIMITERS.BRACKET_START) &&
               product.endsWith(DELIMITERS.BRACKET_END) &&
               this.#isValidProductContent(product.slice(1, -1));
    }

    #isValidProductContent(content) {
        const [name, quantity] = content.split(DELIMITERS.INPUT_SEPARATOR);
        return /^[가-힣]+$/.test(name) && /^\d+$/.test(quantity);
    }

    #validateProductRules(products, parsedProducts) {
        this.#validateExistingProducts(products, parsedProducts);
        this.#validateStockAvailability(products, parsedProducts);
    }

    #validateExistingProducts(products, parsedProducts) {
        const hasInvalidProduct = parsedProducts.some(([name]) => 
            !products.some(product => product.name === name)
        );
        if (hasInvalidProduct) {
            throw new AppError(ERROR_MESSAGE.input_existing_products);
        }
    }

    #validateStockAvailability(products, parsedProducts) {
        const hasInsufficientStock = parsedProducts.some(([productName, quantity]) => {
            const matchingProducts = products.filter(product => product.name === productName);
            const totalQuantity = matchingProducts.reduce((sum, product) => sum + product.quantity, 0);
            return Number(quantity) > Number(totalQuantity);
        });
        if (hasInsufficientStock) {
            throw new AppError(ERROR_MESSAGE.input_storck_avilability);
        }
    }
}

export default InventoryValidation;