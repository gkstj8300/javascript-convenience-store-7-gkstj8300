import Receipt from "../../src/models/Receipt.js";
import getLoadProducts from "../../src/services/getLoadProducts.js";
import FLAG from "../../src/constants/flag/flag.js";
import { MissionUtils } from "@woowacourse/mission-utils";
import { mockPurchaseProducts, mockPromotionProducts } from "../../public/test/data/convenienceTestData.js";


const mockNowDate = (date = null) => {
    const mockDateTimes = jest.spyOn(MissionUtils.DateTimes, "now");
    mockDateTimes.mockReturnValue(new Date(date));
    return mockDateTimes;
};

describe("프로모션(Promotions) 클래스 테스트", () => {
    let products;

    beforeEach(async () => {
        products = await getLoadProducts();
    });

    test("멤버십이 없는 경우의 영수증 금액 계산", () => {
        const receipt = new Receipt(products, mockPurchaseProducts, mockPromotionProducts, FLAG.FALSE);
        const result = receipt.getReceiptAmount();

        expect(result).toEqual({
            totalAmount: 21800,
            discountAmount: 3400,
            regularAmount: 10000,
            membershipDiscount: 0,
            finalAmount: 18400
        });
    });

    test("멤버십이 있는 경우의 영수증 금액 계산", () => {
        const receipt = new Receipt(products, mockPurchaseProducts, mockPromotionProducts, FLAG.TRUE);
        const result = receipt.getReceiptAmount();

        expect(result).toEqual({
            totalAmount: 21800,
            discountAmount: 3400,
            regularAmount: 10000,
            membershipDiscount: 3000,
            finalAmount: 15400
        });
    });

    test("총 구매 수량 계산", () => {
        const receipt = new Receipt(products, mockPurchaseProducts, mockPromotionProducts, FLAG.FALSE);
        expect(receipt.getTotalQuantity()).toBe(15);
    });

    test("프로모션 기간이 아닌 경우 할인 미적용", () => {
        mockNowDate("2023-12-25");
        const receipt = new Receipt(
            products,
            mockPurchaseProducts,
            mockPromotionProducts,
            FLAG.FALSE
        );
        const result = receipt.getReceiptAmount();
        expect(result.discountAmount).toBe(0);
        expect(result.finalAmount).toBe(21800);
    });
});