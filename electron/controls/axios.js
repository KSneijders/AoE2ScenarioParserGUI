const {ipcMain} = require('electron')
const axios = require("axios");

ipcMain.handle('axios:retrieveScenario', async () => {
    const response = await axios.get('http://localhost:5000/file')
    return response.data
});
