/**
 * @file main.jsx
 * @description The entry point for the React application.
 * This file bootstraps the React app by rendering the root component into the DOM.
 */

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

/**
 * ReactDOM.createRoot: Initializes the React root at the 'root' element in index.html.
 * .render(): Renders the App component inside the root.
 * <React.StrictMode>: A wrapper component that helps identify potential problems in the application
 * during development by activating additional checks and warnings.
 */
ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
)

