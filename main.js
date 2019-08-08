'use strict'

const { app, systemPreferences } = require('electron')
const shellEnv = require('shell-env')
const path = require('path')
const sudo = require('sudo-prompt')

const { createTray, createWindow, updateTrayIcon, updateDarkMode } = require('./src/electron/window')

app.on('ready', () => {
    global.sharedObject = {
        isDarkMode: systemPreferences.isDarkMode()
    }

    const envVars = shellEnv.sync()

    // Ask for root permissions
    const serverpath = path.join(__dirname, 'dist', 'monday-server')
    sudo.exec(`${serverpath} &`, {
        name: 'Monday',
        env: {
            'HOME': envVars.HOME || '',
            'GOPATH': envVars.GOPATH || '',
            'MONDAY_CONFIG_PATH': envVars.MONDAY_CONFIG_PATH || '',
            'MONDAY_KUBE_CONFIG': envVars.MONDAY_KUBE_CONFIG || '',
            'PATH': envVars.PATH || '',
            'TERM': 'xterm',
        },
    },
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
