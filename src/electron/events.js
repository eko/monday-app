const { ipcMain, ipcRenderer } = require('electron')
const { client } = require('../grpc/client')

ipcMain.on('show-window', () => {
    showWindow()
})

ipcMain.on('load-projects', (event) => {
    console.log('[window] event triggered: load-projects')

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

ipcMain.on('open-configuration-files', (event) => {
    console.log('[window] event triggered: open-configuration-files')

    client.openConfigurationFiles({}, function (error, response) {
        if (error) {
            console.log('Error when calling gRPC method openConfigurationFiles: ', error)
        }
    })
})

ipcMain.on('quit', (event) => {
    console.log('[window] event triggered: quit')
    window.destroy()
})
