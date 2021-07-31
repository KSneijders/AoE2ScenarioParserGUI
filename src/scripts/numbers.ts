/**
 * Function to do: n % m. But works with negatives like: `mod(-1, 4) === 3`.
 * Instead of the default JS implementation: `-1 % 4 === -1`
 *
 * @param n
 * @param m
 * @author https://stackoverflow.com/a/17323608/7230293
 */
export function mod(n: number, m: number): number {
    return ((n % m) + m) % m;
}


/**
 * Almost equivalent of the range function in Python. Generate a list of numbers counting upwards.
 * Starts at `startAt` param (default 0) and counts `n` (param: size) up.
 *
 * @param size the number of entries in the returned list
 * @param startAt The number to start at
 * @author https://stackoverflow.com/a/10050831/7230293
 */
export function range(size: number, startAt = 0): Array<number> {
    return [...Array(size).keys()].map(i => i + startAt);
}

