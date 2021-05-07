export function n2br(s: string): string {
    return s.replace(/(?:\r\n|\r|\n)/g, '<br/>')
}