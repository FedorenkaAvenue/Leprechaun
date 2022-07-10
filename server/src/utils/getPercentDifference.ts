function getPercentDifference(prevAmount: number, nextAmount: number): string;
function getPercentDifference(prevAmount: number, nextAmount: number, byString: boolean): number;

/**
 * @description get percent difference between two numbers
 * @param byString get result as string with '%'
 * @returns percents between previous and incoming value
 */
function getPercentDifference(
    prevAmount: number,
    nextAmount: number,
    byString: boolean = true
): number | string {
    const res: number =  Math.ceil((nextAmount - prevAmount) / prevAmount * 100);

    return byString ? `${res}%` : res;
}

export default getPercentDifference;
