const { BrowserWindow, Tray, ipcMain } = require('electron')
const path = require('path')
const url = require('url')

require('./events')

let dev = false

if (process.defaultApp || /[\\/]electron-prebuilt[\\/]/.test(process.execPath) || /[\\/]electron[\\/]/.test(process.execPath)) {
  dev = true
}

const createTray = () => {
    tray = new Tray(getIcon())
    tray.on('click', function (event) {
        toggleWindow()
    })
}

const getIcon = () => global.sharedObject.isDarkMode
    ? path.join(__dirname, '..', 'assets', 'img', 'dark', 'icon.png')
    : path.join(__dirname, '..', 'assets', 'img', 'icon.png')

const updateTrayIcon = () => {
    tray.setImage(getIcon())
}

const updateDarkMode = () => {
    window.webContents.send('set-dark-mode', global.sharedObject.isDarkMode)
}

const createWindow = (app, server) => {
    window = new BrowserWindow({
        width: 600,
        height: 380,
        show: false,
        frame: false,
        resizable: false,
        transparent: true,
        movable: false,
        closable: false,
        minimizable: false,
        titleBarStyle: 'customButtonsOnHover',
        webPreferences: {
            nodeIntegration: true,
        }
    })

    window.on('closed', () => {
        window = null
        server.kill(15)
        app.quit()
    });

    if (dev) {
        window.webContents.openDevTools()
    }

    let indexPath

    if (dev && process.argv.indexOf('--noDevServer') === -1) {
        indexPath = url.format({
            protocol: 'http:',
            host: 'localhost:8080',
            pathname: 'index.html',
            slashes: true
        })
    } else {
        indexPath = url.format({
            protocol: 'file:',
            pathname: path.join(__dirname, '/../../dist', 'index.html'),
            slashes: true
        })
    }

    window.loadURL(indexPath)

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

module.exports = {
    createTray,
    createWindow,
    updateTrayIcon,
    updateDarkMode,
}
