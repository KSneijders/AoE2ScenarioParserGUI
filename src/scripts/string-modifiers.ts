export function n2br(s: string): string {
    return s.replace(/(?:\r\n|\r|\n)/g, '<br/>')
}

export function _2dash(s: string): string {
    return s.replaceAll('_', '-')
}

/**
 * Converts snake_case_text to Spaced Pascal Case Text
 *
 * @author kamoroso94 @ https://stackoverflow.com/a/44084313/7230293
 * @param str the string to convert
 */
export function snakeToSpacedPascal(str: string) {
    return str.split("/")
        .map(snake => snake.split("_")
            .map(substr => substr.charAt(0)
                    .toUpperCase() +
                substr.slice(1))
            .join(" "))
        .join("/");
}