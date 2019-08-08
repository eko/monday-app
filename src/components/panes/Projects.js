import React, { Component } from 'react'
import { ipcRenderer } from 'electron'
import ProjectItem from '../projects/ProjectItem'

class Projects extends Component {
    constructor(props) {
        super(props)

        this.state = {
            projects: [],
        }

        this.events()
    }

    events() {
        ipcRenderer.send('load-projects')

        ipcRenderer.on('projects-list', (event, projects) => {
            this.setState({
                projects: projects,
            })
        })

        ipcRenderer.on('reload-projects', (event) => {
            ipcRenderer.send('load-projects')
        })
    }

    handleInitConfigurationFile() {
        ipcRenderer.send('init-configuration-file')
    }

    handleReloadConfiguration() {
        ipcRenderer.send('reload-configuration')
    }

    render() {
        const { projects } = this.state

        let content = <div className="projects-init">
            <p>You do not seems to have any configuration file.</p>
            <p>Please click the button bellow to initialize a configuration file</p>

            <button className="btn btn-large btn-default initialize" onClick={this.handleInitConfigurationFile}>Initialize configuration</button>

            <p>Once you're done, click below to reload the configuration:</p>

            <button className="btn btn-large btn-default reload" onClick={this.handleReloadConfiguration}>Reload</button>
        </div>

        if (projects.length > 0) {
            content = <ul className="list-group">
                <li className="list-group-header">
                    <input className="form-control" type="text" placeholder="Type the name of a project..." />
                </li>

                <div id="projects-list">
                    {this.state.projects.map(name => (
                        <ProjectItem key={name} name={name} />
                    ))}
                </div>
            </ul>
        }

        return (
            <div className="pane-group">
                <div className="pane">
                    {content}
                </div>
            </div>
        )
    }
}

export default Projects
