const { app } = require('electron')
const { spawn } = require('child_process')
const sudo = require('sudo-prompt')

const { createTray, createWindow } = require('./src/ui/window')

app.on('ready', () => {
  var launched = false

  // Ask for root permissions
  sudo.exec('echo ok', { name: 'Monday' },
    function (error, stdout, stderr) {
      if (error) throw error

      // If authentication is successful, run the gRPC server
      const server = spawn('./build/server')

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
  createWindow()
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})
