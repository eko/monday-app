import React, { Fragment } from 'react'
import { useStateValue } from './contexts/state'

const PaneManager = (props) => {
    const [{ pane }] = useStateValue()

    return (
        <Fragment>
            {pane}
        </Fragment>
    )
}

export default PaneManager
