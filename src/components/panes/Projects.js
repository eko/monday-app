import React, { Component } from 'react'
import { ipcRenderer } from 'electron'

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
    }

    render() {
        return (
            <div className="pane-group">
                <div className="pane">
                    <ul className="list-group">
                        <li className="list-group-header">
                            <input className="form-control" type="text" placeholder="Type the name of a project..." />
                        </li>

                        <div id="projects-list">
                            {this.state.projects.map(project => (
                                <li key={project} className="list-group-item">
                                    <p>{project}</p>
                                </li>
                            ))}
                        </div>
                    </ul>
                </div>
            </div>
        )
    }
}

export default Projects
