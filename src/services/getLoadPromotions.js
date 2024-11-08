import loadFile from "../utils/loadFile.js";
import { first, fileLineSplit, convert } from "../utils/collection.js";

const getLoadPromotions = async () => {
    const PROMOTION_PATH = "./public/promotions.md";
    const data = await loadFile(PROMOTION_PATH);
    return parsePromotionsData(data);
};

const parsePromotionsData = (data) => {
    const lines = fileLineSplit(data, "\n");
    const headers = getPromotionHeaders(first(lines));
    return lines.slice(1).map((line) => {
        const values = fileLineSplit(line, ",");
        return mapHeadersToValues(headers, values);
    });
};

const getPromotionHeaders = (line) => {
    return fileLineSplit(line, ",");
}

const mapHeadersToValues = (headers, values) => {
    return headers.reduce((obj, header, index) => {
        obj[header] = convert(header, values[index]);
        return obj;
    }, {});
};

export default getLoadPromotions;
