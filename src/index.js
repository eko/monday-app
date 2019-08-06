import React from 'react'
import { render } from 'react-dom'

import App from './components/App'

let root = document.createElement('div')

root.id = 'root'
document.body.appendChild(root)

render(<App />, document.getElementById('root'))
