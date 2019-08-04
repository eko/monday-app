var { ipcRenderer } = require('electron')

ipcRenderer.on('projects-list', (event, projects) => {
  console.log(projects)

  var html = ''
  const itemHTML = '<li class="list-group-item"><p>{project-name}</p></li>'

  projects.forEach(projectName => {
    html += itemHTML.replace('{project-name}', projectName)
  })

  document.getElementById('projects-list').innerHTML = html
})

document.addEventListener('DOMContentLoaded', function () {
  ipcRenderer.send('load-projects')

  // document.querySelector('.js-context-menu').addEventListener('click', function (event) {
  //   menu.popup(remote.getCurrentWindow());
  // })
})
