const { ipcMain } = require('electron')
const { client } = require('../grpc/client')

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
