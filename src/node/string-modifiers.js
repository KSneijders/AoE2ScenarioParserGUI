function newlineToBreak(string) {
    return string.replace(/(?:\r\n|\r|\n)/g, '<br/>')
}

module.exports = { newlineToBreak }