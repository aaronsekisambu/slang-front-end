
export const calculatePercentage = (total: any, passed: any) => {
    const eachMark = Math.ceil(100 / parseInt(total));
    const marksGotOutOf100 = parseInt(passed) * eachMark;
    return `${marksGotOutOf100}%`;

}