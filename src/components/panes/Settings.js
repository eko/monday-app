import React, { Component } from 'react'
import { ipcRenderer } from 'electron';

class Settings extends Component {
    handleOpenConfigurationFiles() {
        ipcRenderer.send('open-configuration-files')
    }

    render() {
        return (
            <div className="padded">
                <p>Monday configuration is managed by editing YAML configuration files.</p>
                <button class="btn btn-large btn-default" onClick={this.handleOpenConfigurationFiles}>Open configuration files</button>

                <hr />
            </div>
        )
    }
}

export default Settings
