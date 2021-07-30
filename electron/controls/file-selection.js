const {dialog, ipcMain} = require('electron');

ipcMain.handle('fileControls:select',  () => {
    return new Promise(async function (resolve, reject) {
        dialog.showOpenDialog({properties: ['openFile']}).then(function (response) {
            if (!response.canceled) {
                resolve({
                    'filepath': response.filePaths[0]
                });
            } else {
                reject({
                    'reason': 'no_file_selected'
                })
            }
        });
    });
});