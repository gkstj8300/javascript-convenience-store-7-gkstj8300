import { DateTimes } from "@woowacourse/mission-utils";

export const isDateInRange = (startDate, endDate) => {
    const today = DateTimes.now();
    const start = new Date(startDate);
    const end = new Date(endDate);
    return today >= start && today <= end;
}