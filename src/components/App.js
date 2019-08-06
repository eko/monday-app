import '../assets/css/App.css'

import React, { Component, Fragment } from 'react'
import { ipcRenderer, remote } from 'electron'
import Header from './Header'
import { Projects } from './panes'

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isDarkMode: remote.getGlobal('sharedObject').isDarkMode,
        }

        this.events()
    }

    events() {
        ipcRenderer.on('set-dark-mode', (event, isDarkMode) => {
            this.setState({
                isDarkMode: isDarkMode,
          })
        })
    }

    render() {
        return (
            <div className={this.state.isDarkMode ? 'dark' : 'light'}>
                <div class="header-arrow"></div>
                <div class="window">
                    <Header />

                    <div class="window-content">
                        <Projects />
                    </div>

                    <footer class="toolbar toolbar-footer">
                        <div class="toolbar-actions">
                            <button class="btn btn-large btn-default pull-right">
                                Quit
                            </button>
                        </div>
                    </footer>
                </div>
            </div>
        )
    }
}

export default App
