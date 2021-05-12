/**
 * Always have 2 digits, for clocks formattign
 * @param number
 * @returns
 */
export const ensureTwoDigits = (number: number) => `0${number}`.slice(-2);
