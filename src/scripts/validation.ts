export function hasOnlyDigits(value: string): boolean {
    return /^-?\d+$/.test(value);
}