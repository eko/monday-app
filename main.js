'use strict'

const { app, systemPreferences } = require('electron')
const sudo = require('sudo-prompt')

const { createTray, createWindow, updateTrayIcon, updateDarkMode } = require('./src/electron/window')

let server = null

app.on('ready', () => {
    global.sharedObject = {
        isDarkMode: systemPreferences.isDarkMode()
    }

    var launched = false

    // Ask for root permissions
    sudo.exec('./builds/server &', { name: 'Monday' },
        function (error, stdout, stderr) {
            if (error) {
                console.log(error)
                throw error
            }

            // If authentication is successful, run the gRPC server
            console.log('gRPC server started')
            console.log(`gRPC server stdout: ${stdout}`)

            if (!launched) {
                launchApplication()
            }

            launched = true
        })
})

const launchApplication = () => {
    createTray()
    createWindow(app, server)
}

const themeHasChanged = () => {
    global.sharedObject.isDarkMode = systemPreferences.isDarkMode()

    updateTrayIcon()
    updateDarkMode()
}

systemPreferences.subscribeNotification('AppleInterfaceThemeChangedNotification', themeHasChanged)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
