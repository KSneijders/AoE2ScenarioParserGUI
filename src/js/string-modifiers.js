export function n2br(string) {
    return string.replace(/(?:\r\n|\r|\n)/g, '<br/>')
}