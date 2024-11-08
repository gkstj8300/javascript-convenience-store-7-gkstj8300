import loadFile from "../utils/loadFile.js";
import { first, fileLineSplit, convert } from "../utils/collection.js";

const getLoadProducts = async () => {
    const PRODUCT_PATH = "./public/products.md";
    const data = await loadFile(PRODUCT_PATH);
    const parseProducts = parseProductData(data);
    return filterLoadProducts(parseProducts);
};

const parseProductData = (data) => {
    const lines = fileLineSplit(data, "\n");
    const headers = getProductHeaders(first(lines));
    return lines.slice(1).map((line) => {
        const values = fileLineSplit(line, ",");
        return mapHeadersToValues(headers, values);
    });
};

const getProductHeaders = (line) => {
    return fileLineSplit(line, ",");
};

const mapHeadersToValues = (headers, values) => {
    return headers.reduce((obj, header, index) => {
        obj[header] = convert(header, values[index]);
        return obj;
    }, {});
};

const filterLoadProducts = (products) => {
    return products.reduce((filtered, product, index, array) => {
        filtered.push(product);
        if (product.promotion && (index + 1 >= array.length || array[index + 1].name !== product.name)) {
            filtered.push({ ...product, quantity: 0, promotion: '' });
        }
        return filtered;
    }, []);
};

export default getLoadProducts;