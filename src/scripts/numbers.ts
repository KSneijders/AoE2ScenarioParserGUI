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
