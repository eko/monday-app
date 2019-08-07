import React, { Component } from 'react'
import { ipcRenderer } from 'electron';

class ProjectItem extends Component {
    constructor(props) {
        super(props)

        this.state = {
            current: false,
        }

        this.handleOnMouseEnter = this.handleOnMouseEnter.bind(this)
        this.handleOnMouseLeave = this.handleOnMouseLeave.bind(this)
        this.handleRunProject = this.handleRunProject.bind(this)
    }

    handleOnMouseEnter() {
        this.setState({
            current: true,
        })
    }

    handleOnMouseLeave() {
        this.setState({
            current: false,
        })
    }

    handleRunProject() {
        const { name } = this.props
        ipcRenderer.send('run-project', name)
    }

    render() {
        const { name } = this.props
        const { current } = this.state

        let className = 'list-group-item'

        if (current) {
            className += ' currrent'
        }

        return (
            <li className={className} onMouseEnter={this.handleOnMouseEnter} onMouseLeave={this.handleOnMouseLeave}>
                {current &&
                    <button className="btn btn-default pull-right" onClick={this.handleRunProject}>Run this project</button>}
                <p>{name}</p>
            </li>
        )
    }
}

export default ProjectItem
