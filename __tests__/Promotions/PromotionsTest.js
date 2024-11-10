import AppError from "../../src/errors/AppError.js";
import ERROR_MESSAGE from "../../src/constants/messages/errorMessages.js";
import Promotions from "../../src/models/Promotions.js";
import WhetherValidation from "../../src/validation/WhetherValidation.js";
import getLoadProducts from "../../src/services/getLoadProducts.js";
import getLoadPromotions from "../../src/services/getLoadPromotions.js";
import { first } from "../../src/utils/collection.js";
import { MissionUtils } from "@woowacourse/mission-utils";

const mockNowDate = (date = null) => {
    const mockDateTimes = jest.spyOn(MissionUtils.DateTimes, "now");
    mockDateTimes.mockReturnValue(new Date(date));
    return mockDateTimes;
};

describe("프로모션(Promotions) 클래스 테스트", () => {
    let products;
    let promotions;
    
    beforeEach(async () => {
        products = await getLoadProducts();
        const promotionData = await getLoadPromotions();
        promotions = new Promotions(promotionData);
    });

    test("프로모션 있는 상품과 없는 상품이 섞여 있을 때 프로모션 적용 가능한 상품만 필터링한다", async () => {
        const purchaseProducts = [["사이다", 2, 1000], ["물", 1, 500]];
        const filteredProducts = promotions.getIsPromotionProducts(products, purchaseProducts);
        expect(filteredProducts).toHaveLength(1);
    });

    test("프로모션이 없는 상품은 필터링 결과가 비어있다", async () => {
        const purchaseProducts = [["물", "1"]];
        const filteredProducts = promotions.getIsPromotionProducts(products, purchaseProducts);
        expect(filteredProducts).toHaveLength(0);
    });

    test("프로모션 적용 시 무료 수량이 정확히 계산된다", async () => {
        const purchaseProducts = [["사이다", 1, 1000]];
        const promotionProducts = promotions.getFilterPromotionProducts(products, purchaseProducts);
        expect(first(promotionProducts).name).toBe("사이다");
        expect(first(promotionProducts).freeQuantity).toBe(0);
    });

    test("재고 초과 구매시 가능한 최대 프로모션만 적용된다", async () => {
        /**
         * - 사이다 1,000원 8개 탄산2+1
         * - 사이다 1,000원 7개
         */
        const purchaseProducts = [["사이다", 12, 1000]];
        const promotionProducts = promotions.getIsPromotionProducts(products, purchaseProducts);
        expect(first(promotionProducts).quantity).toBe(6);
    });

    test("기간에 해당하지 않는 프로모션은 적용을 제외한다", async () => {
        mockNowDate("2023-12-25");

        const purchaseProducts = [["사이다", 12, 1000]];
        const promotionProducts = promotions.getIsPromotionProducts(products, purchaseProducts);
        expect(promotionProducts).toHaveLength(0);
    });

    test("프로모션 적용 선택시(Y) 구매 수량이 정확히 업데이트된다", async () => {
        const purchaseProducts = [["사이다", 2, 1000 ]];
        const promotionResult = { productName: '사이다', quantity: 1, whetherFlag: 2 };
        const updatedProducts = promotions.updatePurchaseProductsByPromotion(
            purchaseProducts,
            promotionResult,
            "Y"
        );
        expect(updatedProducts[0][1]).toBe(3);
    });

    test("프로모션 적용 선택시(N) 구매 수량은 현 상태를 유지한다", async () => {
        const purchaseProducts = [["사이다", 2, 1000 ]];
        const promotionResult = { productName: '사이다', quantity: 1, whetherFlag: 2 };
        const updatedProducts = promotions.updatePurchaseProductsByPromotion(
            purchaseProducts,
            promotionResult,
            "N"
        );
        expect(updatedProducts[0][1]).toBe(2);
    });

    describe("프로모션 예외처리 테스트", () => {
        test("입력값이 Y혹은 N이 아닌 다른 값일 경우 예외가 발생한다.", async () => {
            const input = 'A';
            expect(() => {
                WhetherValidation.whetherValidate(input);
            }).toThrow(new AppError(ERROR_MESSAGE.input_whether_format));
        });

        test("입력값이 공백일 경우 예외가 발생한다.", async () => {
            const input = '';
            expect(() => {
                WhetherValidation.whetherValidate(input);
            }).toThrow(new AppError(ERROR_MESSAGE.input_not_empty));
        });

        test("입력값이 소문자일 경우 예외가 발생한다.", async () => {
            const input = 'y';
            expect(() => {
                WhetherValidation.whetherValidate(input);
            }).toThrow(new AppError(ERROR_MESSAGE.input_whether_uppercase));
        }); 
        
        test("입력값이 특수문자 등 다른 값일 경우 예외가 발생한다.", async () => {
            const input = '@';
            expect(() => {
                WhetherValidation.whetherValidate(input);
            }).toThrow(new AppError(ERROR_MESSAGE.input_whether_format));
        });         
    });    
});