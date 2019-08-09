import React, { Fragment } from 'react'
import { useStateValue } from './contexts/state'
import Forwarder from '../components/panes/Forwarder'
import Projects from '../components/panes/Projects'
import Proxy from '../components/panes/Proxy'
import Runner from '../components/panes/Runner'
import Settings from '../components/panes/Settings'
import { STATE_CHANGE_PANE, STATE_CHANGE_PROJECT } from './contexts/types'
import { ipcRenderer } from 'electron'

const Header = () => {
    const [{ pane, project }, dispatch] = useStateValue()

    const handleStop = () => {
        ipcRenderer.send('stop')

        dispatch({
            type: STATE_CHANGE_PROJECT,
            pane: <Projects />,
            project: null,
        })
    }

    const handleQuit = () => {
        ipcRenderer.send('quit')
    }

    let currentPane = 'Projects'
    if (pane.type) {
        currentPane = pane.type.name
    }

    return (
        <header className="toolbar toolbar-header">
            <h1 className="title">Monday</h1>

            <div className="toolbar-actions">
                <div className="btn-group pull-left">
                    {project === null &&
                        <button className={'btn btn-large btn-default ' + (currentPane == 'Projects' ? 'active' : '')} onClick={() => dispatch({
                            type: STATE_CHANGE_PANE,
                            pane: <Projects />,
                        })}>
                            <span className="icon icon-home"></span> &nbsp; Projects
                        </button>
                    }

                    {project !== null &&
                        <Fragment>
                            <button className={'btn btn-large btn-default ' + (currentPane == 'Runner' ? 'active' : '')} onClick={() => dispatch({
                                type: STATE_CHANGE_PANE,
                                pane: <Runner project={project} />,
                            })}>
                                <span className="icon icon-megaphone"></span> &nbsp; Runner
                            </button>

                            <button className={'btn btn-large btn-default ' + (currentPane == 'Forwarder' ? 'active' : '')} onClick={() => dispatch({
                                type: STATE_CHANGE_PANE,
                                pane: <Forwarder project={project} />,
                            })}>
                                <span className="icon icon-switch"></span> &nbsp; Forwarder
                            </button>

                            <button className={'btn btn-large btn-default ' + (currentPane == 'Proxy' ? 'active' : '')} onClick={() => dispatch({
                                type: STATE_CHANGE_PANE,
                                pane: <Proxy project={project} />,
                            })}>
                                <span className="icon icon-flow-parallel"></span> &nbsp; Proxy
                            </button>

                            <button className="btn btn-large btn-negative btn-default" onClick={handleStop}>
                                <span className="icon icon-stop"></span> &nbsp; Stop
                            </button>
                        </Fragment>
                    }
                </div>

                <div className="btn-group pull-right">
                    <button className={'btn btn-large btn-default ' + (currentPane == 'Settings' ? 'active' : '')} onClick={() => dispatch({
                        type: STATE_CHANGE_PANE,
                        pane: <Settings />,
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
