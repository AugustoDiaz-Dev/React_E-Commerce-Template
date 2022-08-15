import React from 'react'
// import ReactDom from 'react-dom'
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from 'react-router-dom'

import { StateProvider } from './context/StateProvider'
import initialState from './context/initialState'
import reducer from './context/reducer'

import './index.css'
import App from './App'

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(
    <Router>
        <StateProvider initialState={initialState} reducer={reducer}>
            <App />
        </StateProvider>
    </Router>,
);

// ReactDom.render(
//     <Router>
//         <StateProvider initialState={initialState} reducer={reducer}>
//             <App />
//         </StateProvider>
//     </Router>,
//     document.getElementById('root')
// )
