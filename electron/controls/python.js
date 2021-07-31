const {ipcMain} = require('electron')
const path = require('path')
const axios = require("axios");
const {spawn} = require('child_process')
const kill = require('tree-kill');
const fs = require('fs');

/* -------------------------------------- PYTHON LOGGING -------------------------------------- */
const pythonLogFilePath = './logs/python-output.log'

fs.truncate(pythonLogFilePath, () => {console.log(`Emptied "${pythonLogFilePath}"`)})
/* ------------------------------------ PYTHON LOGGING END ------------------------------------ */


ipcMain.handle('pyControls:parserInstalled', (event) => {
    let installParser = spawn('python', [
        path.join(__dirname, './../../src/scripts/python/install-parser.py'),
    ])

    return new Promise(function (resolve, reject) {
        try {
            installParser.stdout.on('data', function (data) {
                resolve(data.toString('utf-8'))
            });
        } catch (e) {
            reject()
        }
    })
})

let killNext = false;
let API_REF;
ipcMain.handle('pyControls:startAPI',  async (event, scenarioPath) => {
    if (API_REF) {
        console.log('API already alive. [KillNext Enabled]')

        if (killNext) {
            console.log('Killing API... [KillNext Disabled]')
            kill(API_REF.pid)
            API_REF = undefined
        }
        killNext = !killNext

        return;
    } else {
        fs.appendFile(pythonLogFilePath, '\n--------------- NEW API CALL ---------------\n', () =>{ })
        console.log('Starting API...')
    }

    // // Has to be inverted if I'll actually use this :)
    // let otherLiveProcessFound = false;
    // await axios.get('http://localhost:5000/alive')
    //     .catch((reason) => {
    //         if (reason?.errno !== 'ECONNREFUSED') {
    //             otherLiveProcessFound = true;
    //         }
    //     })
    // if (otherLiveProcessFound) return;

    const out = fs.openSync(pythonLogFilePath, 'a');
    const err = fs.openSync(pythonLogFilePath, 'a');

    console.log(`Spawning: ${scenarioPath}`)

    process.chdir('./AoE2ScenarioParserAPI/');
    API_REF = spawn('python', ['-m', "AoE2ScenarioParserAPI", `-f "${scenarioPath}"`],
        {
            detached: true,
            // stdio: 'ignore'
            stdio: [ 'ignore', out, err ]  // For debugging
        }
    )
    process.chdir('../');
})
