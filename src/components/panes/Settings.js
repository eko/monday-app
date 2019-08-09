import React, { Component } from 'react'
import { ipcRenderer } from 'electron'
import pkgJson from '../../../package.json'

class Settings extends Component {
    handleOpenConfigurationFiles() {
        ipcRenderer.send('open-configuration-files')
    }

    render() {
        return (
            <div className="padded">
                <p>🎁 Version {pkgJson.version}</p>
                <hr />
                <p>Monday configuration is managed by editing YAML configuration files.</p>
                <button className="btn btn-large btn-default" onClick={this.handleOpenConfigurationFiles}>Open configuration files</button>
            </div>
        )
    }
}

export default Settings
