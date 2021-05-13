'use strict'
// Docs: https://www.electronjs.org/docs/api/context-bridge#usage

const {contextBridge, ipcRenderer} = require('electron')

// !!! REMEMBER !!!
// ALL THE CONTEXT BRIDGE CONSTRUCTIONS NEED TO BE DEFINED IN: '/src/main.ts'

// Set up context bridge between the renderer process and the main process
contextBridge.exposeInMainWorld('pyControls', {
    parserInstalled: () => ipcRenderer.invoke('pyControls:parserInstalled')
})

contextBridge.exposeInMainWorld('axios', {
    retrieveScenario: () => ipcRenderer.invoke('axios:retrieveScenario'),
    getRequest: (url) => ipcRenderer.invoke('axios:getRequest', url),
    sendScenario: (scenarioContent) => ipcRenderer.invoke('axios:sendScenario', scenarioContent)
})
