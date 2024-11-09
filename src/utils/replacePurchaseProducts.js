/**
 * 구매 상품 문자열을 배열 형태로 변환하는 함수
 * @param { string } purchaseProducts - 구매할 상품 목록
 * @returns { Array<[string, number]> } - 각 상품명과 수량을 담은 배열
 */
const replacePurchaseProducts = (purchaseProducts) => {
    return purchaseProducts.replace(/[\[\]]/g, '').split(',').map(product => {
        const [name, quantity] = product.split('-');
        return [name, Number(quantity)];
    });
}

export default replacePurchaseProducts;