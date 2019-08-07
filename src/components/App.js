import '../assets/css/App.css'

import React, { Component, Fragment } from 'react'
import { ipcRenderer, remote } from 'electron'
import Header from './Header'
import { StateProvider } from './contexts/state'
import PaneManager from './PaneManager'

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isDarkMode: remote.getGlobal('sharedObject').isDarkMode,
        }

        ipcRenderer.on('set-dark-mode', (event, isDarkMode) => {
            this.setState({
                isDarkMode: isDarkMode,
            })
        })
    }

    render() {
        return (
            <StateProvider>
                <div className={this.state.isDarkMode ? 'dark' : 'light'}>
                    <div className="header-arrow"></div>
                    <div className="window">
                        <Header />

                        <div className="window-content">
                            <PaneManager />
                        </div>
                    </div>
                </div>
            </StateProvider>
        )
    }
}

export default App
