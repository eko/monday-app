import React from 'react'
import { Settings, Projects } from '../components/panes'
import { useStateValue } from './contexts/state'
import { ipcRenderer } from 'electron';

const Header = () => {
    const [{ pane }, dispatch] = useStateValue()

    const handleQuit = () => {
        ipcRenderer.send('quit')
    }

    return (
        <header className="toolbar toolbar-header">
            <h1 className="title">Monday</h1>

            <div className="toolbar-actions">
                <div className="btn-group pull-left">
                    <button className={'btn btn-large btn-default ' + (pane.type.name == 'Projects' ? 'active' : '')} onClick={() => dispatch({
                        type: 'changePane',
                        newPane: <Projects />,
                    })}>
                        <span className="icon icon-home"></span>
                    </button>

                    <button className={'btn btn-large btn-default ' + (pane.type.name == 'Logs' ? 'active' : '')}>
                        <span className="icon icon-megaphone"></span>
                    </button>

                    <button className={'btn btn-large btn-default ' + (pane.type.name == 'Something' ? 'active' : '')}>
                        <span className="icon icon-arrows-ccw"></span>
                    </button>
                </div>

                <div className="btn-group pull-right">
                    <button className={'btn btn-large btn-default ' + (pane.type.name == 'Settings' ? 'active' : '')} onClick={() => dispatch({
                        type: 'changePane',
                        newPane: <Settings />,
                    })}>
                        <span className="icon icon-cog"></span>
                    </button>

                    <button className="btn btn-large btn-default" onClick={handleQuit}>
                        Quit
                    </button>
                </div>
            </div>
        </header>
    )
}

export default Header
