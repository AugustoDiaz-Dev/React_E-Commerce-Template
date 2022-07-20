import React from 'react'
import ReactDom from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'

import { StateProvider } from './context/StateProvider'
import initialState from './context/initialState'
import reducer from './context/reducer'

import './index.css'
import App from './App'

ReactDom.render(
    <Router>
        <StateProvider initialState={initialState} reducer={reducer}>
            <App />
        </StateProvider>
    </Router>,
    document.getElementById('root')
)