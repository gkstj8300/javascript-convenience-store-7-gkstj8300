import { MissionUtils } from "@woowacourse/mission-utils";
import { EOL as LINE_SEPARATOR } from "os";

const TestUtils = {
    mockQuestions(inputs) {
        const messages = [];
      
        MissionUtils.Console.readLineAsync = jest.fn((prompt) => {
            messages.push(prompt);
            const input = inputs.shift();
    
            if (input === undefined) {
                throw new Error("NO INPUT");
            }
    
            return Promise.resolve(input);
        });
    
        MissionUtils.Console.readLineAsync.messages = messages;
    },
    
    mockNowDate(date = null) {
        const mockDateTimes = jest.spyOn(MissionUtils.DateTimes, "now");
        mockDateTimes.mockReturnValue(new Date(date));
        return mockDateTimes;
    },
    
    getLogSpy() {
        const logSpy = jest.spyOn(MissionUtils.Console, "print");
        logSpy.mockClear();
        return logSpy;
    },
    
    getOutput(logSpy) {
        return [...logSpy.mock.calls].join(LINE_SEPARATOR);
    },
    
    expectLogContains(received, expects) {
        expects.forEach((exp) => {
            expect(received).toContain(exp);
        });
    },
    
    expectLogContainsWithoutSpacesAndEquals(received, expects) {
        const processedReceived = received.replace(/[\s=]/g, "");
        expects.forEach((exp) => {
            expect(processedReceived).toContain(exp);
        });
    },
}

export default TestUtils;