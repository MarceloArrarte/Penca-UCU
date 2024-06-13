function isInteger(str: string): boolean {
    return /^\d+$/.test(str);
}

export const numberUtils = {
    isInteger
}