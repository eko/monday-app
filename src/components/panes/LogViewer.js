import { ipcRenderer } from 'electron'
import React, { Component, Fragment } from 'react'

class Runner extends Component {
    constructor(props) {
        super(props)

        this.state = {
            logs: null,
        }

        this.events = this.events.bind(this)
        this.events()
    }

    scrollToBottom = () => {
        if (!this.logsElement) {
            return
        }

        const scrollHeight = this.logsElement.scrollHeight;
        const height = this.logsElement.clientHeight;
        const maxScrollTop = scrollHeight - height;

        this.logsElement.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    }

    componentDidMount() {
        const { view } = this.props

        ipcRenderer.send(`get-${view}-logs`)

        this.timerID = setInterval(() => {
            ipcRenderer.send(`get-${view}-logs`)
        }, 2000)
    }

    componentDidUpdate() {
        this.scrollToBottom()
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    events() {
        const { view } = this.props

        ipcRenderer.on(`${view}-logs`, (event, content) => {
            content = content
                .replace(/(\r\n|\n|\r)/gmi, '<br />')
                .replace(/\[31m/gmi, '<span class="log-error">')
                .replace(/\[32m/gmi, '<span class="log-success">')
                .replace(/\[0m/gmi, '</span>')

            this.setState({
                ...this.state,
                logs: content,
            })
            this.scrollToBottom()
        })
    }

    render() {
        const { logs } = this.state

        return (
            <Fragment>
                <div className="logs-content" ref={(pre) => { this.logsElement = pre }} dangerouslySetInnerHTML={{ __html: logs }}></div>
            </Fragment>
        )
    }
}

export default Runner
