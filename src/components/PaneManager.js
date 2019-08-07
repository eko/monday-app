import { ipcRenderer } from 'electron'
import React, { Fragment } from 'react'
import { useStateValue } from './contexts/state'
import { STATE_CHANGE_PROJECT } from './contexts/types'
import Runner from './panes/Runner'

const PaneManager = (props) => {
    const [{ pane }, dispatch] = useStateValue()

    ipcRenderer.on('project', (event, response) => {
        dispatch({
            type: STATE_CHANGE_PROJECT,
            project: response.project,
            pane: <Runner project={response.project} />,
        })
    })

    return (
        <Fragment>
            {pane}
        </Fragment>
    )
}

export default PaneManager
