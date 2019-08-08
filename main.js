'use strict'

const { app, systemPreferences } = require('electron')
const { exec } = require('child_process')
const path = require('path')
const sudo = require('sudo-prompt')

const { createTray, createWindow, updateTrayIcon, updateDarkMode } = require('./src/electron/window')

app.on('ready', () => {
    global.sharedObject = {
        isDarkMode: systemPreferences.isDarkMode()
    }

    // Ask for root permissions
    const serverpath = path.join(__dirname, 'dist', 'monday-server')
    sudo.exec(serverpath + ' &', { name: 'Monday' },
        function (error, stdout, stderr) {
            if (error) throw error
            launchApplication()
        }
    )
})

const launchApplication = () => {
    createTray()
    createWindow(app)
}

const themeHasChanged = () => {
    global.sharedObject.isDarkMode = systemPreferences.isDarkMode()

    updateTrayIcon()
    updateDarkMode()
}

systemPreferences.subscribeNotification('AppleInterfaceThemeChangedNotification', themeHasChanged)

app.on('window-all-closed', () => {
    app.quit()
})
