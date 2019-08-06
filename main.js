'use strict'

const { app, systemPreferences } = require('electron')
const { spawn } = require('child_process')
const sudo = require('sudo-prompt')

const { createTray, createWindow, updateTrayIcon, updateDarkMode } = require('./src/electron/window')

let server = null

app.on('ready', () => {
  global.sharedObject = {
    isDarkMode: systemPreferences.isDarkMode()
  }

  var launched = false

  // Ask for root permissions
  sudo.exec('echo ok', { name: 'Monday' },
    function (error, stdout, stderr) {
      if (error) throw error

      // If authentication is successful, run the gRPC server
      server = spawn('./builds/server')

      server.stdout.on('data', (data) => {
        console.log(`gRPC server stdout: ${data}`)

        if (!launched) {
          launchApplication()
        }

        launched = true
      })

      server.stderr.on('data', (data) => {
        console.log(`gRPC server stderr: ${data}`)
        app.quit()
      })

      server.on('close', (code) => {
        console.log(`gRPC server exited with code ${code}`)
        app.quit()
      })
    }
  )
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
