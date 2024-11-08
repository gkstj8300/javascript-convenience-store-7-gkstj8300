/**
 * 배열의 첫번째를 가지고 오는 함수
 * @param {*} array 
 * @returns array
 */
export const first = (array) => {
    return array[0];
}

export const fileLineSplit = (line, limit) => {
    return line.trim().split(limit)
}

export const convert = (header, data) => {
    if(header === 'promotion' && data === 'null') {
        return '';
    }
    if(header === 'price' || header === 'quantity' || header === 'buy' || header === 'get') {
        return Number(data);
    }
    return data;
}