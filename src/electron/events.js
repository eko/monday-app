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

        event.reply('projects-list', response.names)
    })
})

ipcMain.on('run-project', (event, name) => {
    console.log('[window] event triggered: run-project')

    client.runProject({ name: name }, function (error, response) {
        if (error) {
            console.log('Error when calling gRPC method runProject: ', error)
            return
        }

        event.reply('project', response)
    })
})

ipcMain.on('open-configuration-files', (event) => {
    console.log('[window] event triggered: open-configuration-files')

    client.openConfigurationFiles({}, function (error, response) {
        if (error) {
            console.log('Error when calling gRPC method openConfigurationFiles: ', error)
            return
        }
    })
})

ipcMain.on('get-runner-logs', (event) => {
    console.log('[window] event triggered: get-runner-logs')

    client.getLogs({view: 'runner'}, function (error, response) {
        if (error) {
            console.log('Error when calling gRPC method getLogs: ', error)
            return
        }

        event.reply('runner-logs', response.content)
    })
})

ipcMain.on('get-forwarder-logs', (event) => {
    console.log('[window] event triggered: get-forwarder-logs')

    client.getLogs({ view: 'forwarder' }, function (error, response) {
        if (error) {
            console.log('Error when calling gRPC method getLogs: ', error)
            return
        }

        event.reply('forwarder-logs', response.content)
    })
})

ipcMain.on('get-proxy-logs', (event) => {
    console.log('[window] event triggered: get-proxy-logs')

    client.getLogs({ view: 'proxy' }, function (error, response) {
        if (error) {
            console.log('Error when calling gRPC method getLogs: ', error)
            return
        }

        event.reply('proxy-logs', response.content)
    })
})

ipcMain.on('stop', (event) => {
    console.log('[window] event triggered: stop')

    client.stopProject({}, function (error, response) {
        if (error) {
            console.log('Error when calling gRPC method stopProject: ', error)
            return
        }
    })
})

ipcMain.on('quit', (event) => {
    console.log('[window] event triggered: quit')

    client.quit({}, (error, response) => {
        if (error) {
            console.log('Error when calling gRPC method quit: ', error)
        }

        window.destroy()
    })
})
