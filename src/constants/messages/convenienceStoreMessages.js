const CONVENIENCE_STORE_MESSAGES = Object.freeze({
    input_product_and_quantity: '구매하실 상품명과 수량을 입력해 주세요. (예: [사이다-2],[감자칩-1])\n',
    input_is_membership: '멤버십 할인을 받으시겠습니까? (Y/N)\n',
    input_whether_promotion_plus: (productName) => `현재 ${productName}은(는) 1개를 무료로 더 받을 수 있습니다. 추가하시겠습니까? (Y/N)\n`,
    input_whether_promotion_discount: (whether) => `현재 ${whether.productName} ${whether.quantity}개는 프로모션 할인이 적용되지 않습니다. 그래도 구매하시겠습니까? (Y/N)\n`,
    input_additional_purchase: '감사합니다. 구매하고 싶은 다른 상품이 있나요? (Y/N)\n',
    output_welcome: '안녕하세요. W편의점입니다.',
    output_goods_in_possession: '현재 보유하고 있는 상품입니다.',
    output_goods_in_product: (product) => `- ${product.name} ${Number(product.price).toLocaleString()}원 ${product.quantity}개 ${product.promotion}`,
    output_goods_no_stock: (product) => `- ${product.name} ${Number(product.price).toLocaleString()}원 재고 없음`,
    output_receipt_header: '===========W 편의점=============',
    output_receipt_purchese_product: ([productName, quantity, price]) => `${productName}\t\t${quantity}\t${(price*quantity).toLocaleString()}`,
    output_receipt_promotion_present: '===========증	정=============',
    output_receipt_promotion_products: (product) => `${product.name}\t\t${product.freeQuantity}`,
    output_receipt_amount_start_line: '==============================',
    output_receipt_totalAmount: (totalAmount, totalQuantity) => `총구매액\t${totalQuantity}\t${totalAmount.toLocaleString()}`,
    output_receipt_discountAmount: (discountAmount) => `행사할인\t\t-${discountAmount.toLocaleString()}`,
    output_receipt_membershipDiscount: (membershipDiscount) => `멤버십할인\t\t-${membershipDiscount.toLocaleString()}`,
    output_receipt_finalAmount: (finalAmount) => `내실돈\t\t\t${finalAmount.toLocaleString()}`,
});

export default CONVENIENCE_STORE_MESSAGES;