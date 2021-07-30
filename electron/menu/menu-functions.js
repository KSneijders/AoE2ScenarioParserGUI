function createMenuFunction(win, content) {
    return function () {
        win.webContents.send('menu-action-clicked', content)
    }
}

module.exports = {createMenuFunction}
