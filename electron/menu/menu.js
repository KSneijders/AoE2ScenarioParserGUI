const {createMainTemplate} = require("./menu-template");
const {Menu} = require("electron");

function setupWindowMenu(win) {
    Menu.setApplicationMenu(Menu.buildFromTemplate(
        createMainTemplate(win)
    ))
}

module.exports = { setupWindowMenu }
