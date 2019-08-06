import React, { Component, Fragment } from 'react'

class Header extends Component {
    render() {
        return (
            <header class="toolbar toolbar-header">
                <h1 class="title">Monday</h1>

                <div class="toolbar-actions">
                    <div class="btn-group pull-left">
                        <button class="btn btn-large btn-default active">
                            <span class="icon icon-home"></span>
                        </button>

                        <button class="btn btn-large btn-default">
                            <span class="icon icon-megaphone"></span>
                        </button>

                        <button class="btn btn-large btn-default">
                            <span class="icon icon-arrows-ccw"></span>
                        </button>
                    </div>

                    <button class="btn btn-large btn-default pull-right">
                        <span class="icon icon-cog"></span>
                    </button>
                </div>
            </header>
        )
    }
}

export default Header
