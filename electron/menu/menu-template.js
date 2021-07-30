const {createMenuFunction} = require("./menu-functions");

function createMainTemplate(win) {
    return [
        {
            label: 'Triggers',
            submenu: [
                {
                    label: 'Update order using display order',
                    click: createMenuFunction(win, {
                        type: 'update-order-to-do'
                    })
                }
            ]
        }
    ]
}

module.exports = { createMainTemplate }
