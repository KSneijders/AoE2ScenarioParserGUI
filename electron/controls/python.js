const {ipcMain} = require('electron')
const {spawn} = require('child_process')
const path = require('path')

ipcMain.handle('pyControls:parserInstalled',  (event) => {
    let installParser = spawn('python', [
        path.join(__dirname, './../../src/scripts/python/install-parser.py'),
    ])

    return new Promise(function (resolve, reject) {
        try {
            installParser.stdout.on('data',  function (data) {
                resolve(data.toString('utf-8'))
            });
        } catch (e) {
            reject(e)
        }
    })
})
