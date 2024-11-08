import AppError from "../errors/AppError.js";
import ERROR_MESSAGE from "../constants/messages/errorMessages.js";
import { promises as fs } from "fs";

const loadFile = async (filePath) => {
    try {
        const data = await fs.readFile(filePath, "utf8");
        return data.trim();
    } catch (error) {
        throw new AppError(ERROR_MESSAGE.load_file_error);
    }
};

export default loadFile;