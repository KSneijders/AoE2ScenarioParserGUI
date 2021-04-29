const {ipcMain} = require('electron')
const {spawn} = require('child_process')
const path = require('path')

ipcMain.handle('pyControls:parserInstalled', async (event) => {
    let installParser = spawn('python', [
        path.join(__dirname, '../python-scripts/install-parser.py'),
    ])

    return new Promise(function (resolve, reject) {
        installParser.stdout.on('data', async function (data) {
            resolve(data.toString('utf-8'))
        });
    })
})

