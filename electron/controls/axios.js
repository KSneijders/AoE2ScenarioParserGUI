const {ipcMain} = require('electron')
const axios = require("axios");

ipcMain.handle('axios:retrieveScenario',  () => {
    return new Promise(async function (resolve, reject) {
        try {
            const response = await axios.get('http://localhost:5000/file')
            resolve(response.data)
        } catch (e) {
            reject(e)
        }
    })
});

ipcMain.handle('axios:getRequest', (_, args) => {
    const url = args
    return new Promise(async function (resolve, reject) {
        try {
            const response = await axios.get('http://localhost:5000/' + url)
            resolve(response.data)
        } catch (e) {
            reject(e)
        }
    })
})

ipcMain.handle('axios:sendScenario', async (scenario) => {
    // const response = await axios.post('http://localhost:5000/login', scenario, {
    //     headers: {
    //         'content-type': 'text/json'
    //     }
    // })

    const response = axios({
        method: 'post',
        url: 'http://localhost:5000/login',
        data: scenario,
        headers: {
            'Content-Type': `multipart/form-data`,
        },
    });
    console.log("Success?!")
    console.log(response)
});
