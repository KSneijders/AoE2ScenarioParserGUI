# What to do when you want to add a context bridge element.

1. Select a proper name and add:  
   `ipcMain.handle('SomethingControls:ActionName', {...})` in `electron/controls/...`
2. Add the actual functionality in the same file.
3. Add the actual context bridge in `electron/preload.js`
4. Add the function definition for TS in `src/main.ts`
5. If you added a new file to `electron/controls/...`, add it at the bottom of `electron/`