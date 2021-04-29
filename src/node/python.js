const {ipcMain} = require('electron')
const {spawn} = require('child_process')
const path = require('path')

ipcMain.handle('pyControls:parserInstalled', async (event) => {
    let installParser = spawn('python', [
        path.join(__dirname, '../py/install-parser.py'),
    ])

    return new Promise(function (resolve, reject) {
        installParser.stdout.on('data', async function (data) {
            resolve(data.toString('utf-8'))
        });
    })
})

// // Open stream:
// let py = spawn('python')
//
// py.stdout.on('data', async function (data) {
//     console.log(data.toString('utf-8'))
// });
//
// py.stdin.write('print("hello world")')
// py.stdin.end()
