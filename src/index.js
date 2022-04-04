import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import reportWebVitals from './reportWebVitals'
ReactDOM.render(
    // Strict mode removed because of case:
    // https://github.com/crubier/react-graph-vis/issues/92
    
    // <React.StrictMode>
        <App />,
    // </React.StrictMode>,
    document.getElementById('root')
);

reportWebVitals();
