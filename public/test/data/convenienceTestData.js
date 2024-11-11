import ERROR_MESSAGE from "../../../src/constants/messages/errorMessages";

export const convenienceExpectedData = [
    {
        inputs: ["[콜라-5],[탄산수-5],[비타민워터-3],[컵라면-2]", "Y", "Y", "Y", "Y", "N"],
        expectedIgnoringWhiteSpaces: [
            "콜라66,000",
            "탄산수67,200",
            "비타민워터34,500",
            "컵라면23,400",
            "콜라2",
            "탄산수1",
            "컵라면0",
            "총구매액1721,100",
            "행사할인-3,200",
            "멤버십할인-1,350",
            "내실돈16,550",
        ]
    },
    {
        inputs: ["[콜라-10],[초코바-5]", "N", "N", "N"],
        expectedIgnoringWhiteSpaces: [
            "콜라1010,000",
            "초코바56,000",
            "콜라3",
            "초코바2",
            "총구매액1516,000",
            "행사할인-5,400",
            "멤버십할인-0",
            "내실돈10,600",
        ]
    },
    {
        inputs: ["[사이다-8],[콜라-10]", "Y", "N", "Y", "[비타민워터-1]", "N", "N"],
        expected: [
            "- 콜라 1,000원 재고 없음",
            "- 콜라 1,000원 10개",
            "- 사이다 1,000원 재고 없음",
            "- 사이다 1,000원 6개",
            "- 오렌지주스 1,800원 9개 MD추천상품",
            "- 오렌지주스 1,800원 재고 없음",
            "- 탄산수 1,200원 5개 탄산2+1",
            "- 탄산수 1,200원 재고 없음",
            "- 물 500원 10개",
            "- 비타민워터 1,500원 6개",
            "- 감자칩 1,500원 5개 반짝할인",
            "- 감자칩 1,500원 5개",
            "- 초코바 1,200원 5개 MD추천상품",
            "- 초코바 1,200원 5개",
            "- 에너지바 2,000원 5개",
            "- 정식도시락 6,400원 8개",
            "- 컵라면 1,700원 1개 MD추천상품",
            "- 컵라면 1,700원 10개",            
        ]
    },
    {
        inputs: ["[사이다-3],[감자칩-3]", "Y", "N", "N"],
        expectedIgnoringWhiteSpaces: [
            "총구매액79,000",
            "행사할인-4,000",
            "멤버십할인-0",
            "내실돈5,000",
        ]
    },
    {
        inputs: ["[콜라-10],[물-10],[정식도시락-8]", "Y", "N"],
        expectedIgnoringWhiteSpaces: [
            "총구매액2866,200",
            "행사할인-3,000",
            "멤버십할인-8,000",
            "내실돈55,200",
        ]
    },
    {
        inputs: ["[콜라-3],[에너지바-5]", "Y", "Y", "[콜라-10]", "Y", "N", "Y", "[오렌지주스-1]", "Y", "Y", "N"],
        expectedIgnoringWhiteSpaces: [
            "내실돈9,000",
            "내실돈8,000",
            "내실돈1,800",
        ]
    },
    {
        inputs: ["[콜라-1]", "N", "N"],
        expectedIgnoringWhiteSpaces: [
            "총구매액11,000",
            "행사할인-0",
            "멤버십할인-0",
            "내실돈1,000",
        ]
    },
    {
        inputs: ["[오렌지주스-8],[탄산수-5]", "N", "N", "N"],
        expectedIgnoringWhiteSpaces: [
            "총구매액1320,400",
            "행사할인-8,400",
            "멤버십할인-0",
            "내실돈12,000",
        ]
    },
    {
        inputs: ["[정식도시락-3]", "Y", "N"],
        expectedIgnoringWhiteSpaces: [
            "총구매액319,200",
            "행사할인-0",
            "멤버십할인-5,760",
            "내실돈13,440",
        ]
    },
    {
        inputs: ["[콜라-3],[사이다-3],[오렌지주스-3]", "Y", "Y", "N"],
        expectedIgnoringWhiteSpaces: [
            "총구매액1013,200",
            "행사할인-5,600",
            "멤버십할인-0",
            "내실돈7,600",
        ]
    },
    {
        inputs: ["[물-10]", "N", "N"],
        expectedIgnoringWhiteSpaces: [
            "총구매액105,000",
            "행사할인-0",
            "멤버십할인-0",
            "내실돈5,000",
        ]
    },
];

export const convenienceErrorData = [
    {
        inputs: [""],
        expectedErrorMessage: ERROR_MESSAGE.input_not_empty
    },
    {
        inputs: ["[사이다;;]"],
        expectedErrorMessage: ERROR_MESSAGE.input_purchase_products_format
    },
    {
        inputs: ["[삶은계란-4]"],
        expectedErrorMessage: ERROR_MESSAGE.input_existing_products
    },
    {
        inputs: ["[물-20]"],
        expectedErrorMessage: ERROR_MESSAGE.input_storck_avilability
    },
];

export const mockPurchaseProducts = [
    [ '사이다', 4, 1000 ],
    [ '오렌지주스', 1, 1800 ],
    [ '초코바', 5, 1200 ],
    [ '에너지바', 5, 2000 ]
];

export const mockPromotionProducts = [
    {
        name: '사이다',
        buy: 2,
        get: 1,
        start_date: '2024-01-01',
        end_date: '2024-12-31',
        freeQuantity: 1,
        price: 1000
    },
    {
        name: '오렌지주스',
        buy: 1,
        get: 1,
        start_date: '2024-01-01',
        end_date: '2024-12-31',
        freeQuantity: 0,
        price: 1800
    },
    {
        name: '초코바',
        buy: 1,
        get: 1,
        start_date: '2024-01-01',
        end_date: '2024-12-31',
        freeQuantity: 2,
        price: 1200
    }
];