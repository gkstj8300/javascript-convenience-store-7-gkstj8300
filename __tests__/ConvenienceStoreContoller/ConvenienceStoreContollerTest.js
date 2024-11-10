import ConvenienceStoreContoller from "../../src/controller/ConvenienceStoreContoller.js";
import TestUtils from "../../public/test/utils/testUtils.js";
import { 
    convenienceExpectedData,
    convenienceErrorData,
} from "../../public/test/data/convenienceTestData.js";

describe("ConvenienceStoreController 클래스 테스트", () => {

    test.each(convenienceExpectedData)(
        'ConvenienceStoreController 클래스 정상 기능 테스트',
        async ({
            inputs = [],
            inputsToTerminate = [],
            expected = [],
            expectedIgnoringWhiteSpaces = [],
        }) => {
            const logSpy = TestUtils.getLogSpy();
            TestUtils.mockQuestions([...inputs, ...inputsToTerminate]);

            const convenienceStoreContoller = new ConvenienceStoreContoller();
            await convenienceStoreContoller.convenienceStoreRun();

            const output = TestUtils.getOutput(logSpy);

            if (expectedIgnoringWhiteSpaces.length > 0) {
                TestUtils.expectLogContainsWithoutSpacesAndEquals(
                    output,
                    expectedIgnoringWhiteSpaces
                );
            }
            if (expected.length > 0) {
                TestUtils.expectLogContains(output, expected);
            }            
        }
    );

    test.each(convenienceErrorData)(
        'ConvenienceStoreController 클래스 Error 테스트',
        async ({
            inputs = [],
            expectedErrorMessage = "",
        }) => {
            const INPUTS_TO_TERMINATE = ["[비타민워터-1]", "N", "N"];
            
            const logSpy = TestUtils.getLogSpy();
            TestUtils.mockQuestions([...inputs, ...INPUTS_TO_TERMINATE]);

            const convenienceStoreContoller = new ConvenienceStoreContoller();
            await convenienceStoreContoller.convenienceStoreRun();

            expect(logSpy).toHaveBeenCalledWith(
                expect.stringContaining(expectedErrorMessage)
            );
        }
    );
});