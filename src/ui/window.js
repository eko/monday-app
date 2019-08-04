const { BrowserWindow, Menu, MenuItem, Tray, ipcMain, ipcRenderer } = require('electron')
const { client } = require('../grpc/client')

const createTray = () => {
    tray = new Tray('./assets/icon.png')
    tray.on('click', function (event) {
        toggleWindow()
    })
}

const createWindow = () => {
    window = new BrowserWindow({
        width: 350,
        height: 310,
        show: false,
        frame: false,
        fullscreenable: false,
        resizable: false,
        transparent: false,
        movable: false,
        webPreferences: {
            nodeIntegration: true,
        }
    })
    window.webContents.openDevTools()
    window.loadURL('file://' + __dirname + '/main.html');

    window.on('blur', () => {
        if (!window.webContents.isDevToolsOpened()) {
            window.hide()
        }
    })
}

const toggleWindow = () => {
    if (window.isVisible()) {
        window.hide()
    } else {
        showWindow()
    }
}

const showWindow = () => {
    const position = getWindowPosition()
    window.setPosition(position.x, position.y, false)
    window.show()
    window.focus()
}

const getWindowPosition = () => {
    const windowBounds = window.getBounds()
    const trayBounds = tray.getBounds()

    // Center window horizontally below the tray icon
    const x = Math.round(trayBounds.x + (trayBounds.width / 2) - (windowBounds.width / 2))

    // Position window 4 pixels vertically below the tray icon
    const y = Math.round(trayBounds.y + trayBounds.height + 3)

    return { x: x, y: y }
}

ipcMain.on('show-window', () => {
    showWindow()
})

ipcMain.on('load-projects', (event) => {
    console.log('[window] event load-projects triggered!')

    client.getProjects({}, function (error, response) {
        if (error) {
            console.log('Error when calling gRPC method getProjects: ', error)
            return
        }

        var names = []

        response.projects.forEach(project => {
            names.push(project.name)
        })

        event.reply('projects-list', names)
    })
})

module.exports = {
    createTray,
    createWindow,
}
