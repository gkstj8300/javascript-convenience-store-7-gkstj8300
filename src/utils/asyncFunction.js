import OutputView from "../views/OutputView.js";

/**
 * 비동기 함수를 실행하고 에러 발생 시 재시도하는 래퍼 함수
 * @param { Function } fnc - 실행할 비동기 함수
 * @param { Object } control - 함수 실행 시 this로 바인딩될 컨텍스트 객체
 * @returns { Promise<*> } - 비동기 함수의 실행 결과를 반환하는 Promise
 * @throws { Error }
 */
const asyncFunction = async (fnc, control) => {
    try {
        return await fnc.call(control);
    } catch (error) {
        OutputView.outputPrintError(error.message);
        return asyncFunction(fnc, control);
    }
};

export default asyncFunction;