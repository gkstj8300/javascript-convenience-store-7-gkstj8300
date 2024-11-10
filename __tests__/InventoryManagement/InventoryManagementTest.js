import AppError from "../../src/errors/AppError.js";
import ERROR_MESSAGE from "../../src/constants/messages/errorMessages.js";
import InventoryManagement from "../../src/models/InventoryManagement.js";
import getLoadProducts from "../../src/services/getLoadProducts.js";

describe("재고(InventoryManagement) 클래스 테스트", () => {

    test("재고 정상 기능 테스트", async () => {
        const input = "[콜라-13]";
        const LOAD_PRODUCTS = await getLoadProducts();
        const expectedResult = [ [ '콜라', 13, 1000 ] ];
        const inventoryManagement = new InventoryManagement(LOAD_PRODUCTS, input);
        const result = inventoryManagement.getPurchaseProducts();
        expect(result).toStrictEqual(expectedResult);
    });

    test("재고 정상 기능 테스트2", async () => {
        const input = "[사이다-4],[오렌지주스-1],[초코바-5],[에너지바-5]";
        const LOAD_PRODUCTS = await getLoadProducts();
        const expectedResult = [
            [ '사이다', 4, 1000 ],
            [ '오렌지주스', 1, 1800 ],
            [ '초코바', 5, 1200 ],
            [ '에너지바', 5, 2000 ]
        ];
        const inventoryManagement = new InventoryManagement(LOAD_PRODUCTS, input);
        const result = inventoryManagement.getPurchaseProducts();
        expect(result).toStrictEqual(expectedResult);
    });

    test("구매할 상품과 수량 형식이 올바르지 않을 경우 예외가 발생한다.", async () => {
        const input = "[컵라면--]";
        const LOAD_PRODUCTS = await getLoadProducts();
        expect(() => {
            new InventoryManagement(LOAD_PRODUCTS, input);
        }).toThrow(new AppError(ERROR_MESSAGE.input_purchase_products_format));
    });

    test("구매할 상품과 수량이 존재하지 않는 상품일 경우 예외가 발생한다.", async () => {
        const input = "[썬키스트-3]";
        const LOAD_PRODUCTS = await getLoadProducts();
        expect(() => {
            new InventoryManagement(LOAD_PRODUCTS, input);
        }).toThrow(new AppError(ERROR_MESSAGE.input_existing_products));
    });

    test("구매할 상품과 수량이 공백일 경우 예외가 발생한다.", async () => {
        const input = "";
        const LOAD_PRODUCTS = await getLoadProducts();
        expect(() => {
            new InventoryManagement(LOAD_PRODUCTS, input);
        }).toThrow(new AppError(ERROR_MESSAGE.input_not_empty));
    });

    test("구매할 상품과 수량이 재고 수량을 초과한 경우 예외가 발생한다.", async () => {
        const input = "[정식도시락-12]";
        const LOAD_PRODUCTS = await getLoadProducts();
        expect(() => {
            new InventoryManagement(LOAD_PRODUCTS, input);
        }).toThrow(new AppError(ERROR_MESSAGE.input_storck_avilability));
    });
});