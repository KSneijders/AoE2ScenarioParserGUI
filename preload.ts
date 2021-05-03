const {contextBridge, ipcRenderer} = require('electron')

// Set up context bridge between the renderer process and the main process
contextBridge.exposeInMainWorld('windowControls', {
    close: () => ipcRenderer.send('windowControls:close'),
    maximize: () => ipcRenderer.send('windowControls:maximize'),
    minimize: () => ipcRenderer.send('windowControls:minimize'),
    redirect: (url) => ipcRenderer.send('windowControls:redirect', url)
})

contextBridge.exposeInMainWorld('pyControls', {
    parserInstalled: () =>  ipcRenderer.invoke('pyControls:parserInstalled')
})
