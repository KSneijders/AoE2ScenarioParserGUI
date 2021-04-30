const path = require("path");
const {ipcMain} = require('electron')

function registerWindowControls(mainWindow) {
    // Handle window electron-controls via IPC
    ipcMain.on('windowControls:maximize', () => {
        if (mainWindow.isMaximized()) {
            mainWindow.restore()
        } else {
            mainWindow.maximize()
        }
    })

    ipcMain.on('windowControls:minimize', () => {
        mainWindow.minimize()
    })

    ipcMain.on('windowControls:close', () => {
        mainWindow.close()
    })

    ipcMain.on('windowControls:redirect', (event, ...args) => {
        // Todo: Remove this probably :)
        let url = args[0]
        mainWindow.loadFile(path.join(__dirname, './../' + url))
    })
}

module.exports = { registerWindowControls }
