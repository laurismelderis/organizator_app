import './App.css';
import React, { Component } from 'react'
import { Provider } from 'react-redux'

import NavBar from './components/NavBar/NavBar'
import LeftPanel from './components/LeftPanel/LeftPanel';
import OverlayPanel from './components/LeftPanel/OverlayPanel';
import RightPanelSwitcher from './components/RightPanel/RightPanelSwitcher';
import store from './state/state.js';

class App extends Component {
    state = {
        windowWidth: window.innerWidth
    }

    componentDidMount() {
        window.onresize = () => {
            this.setState({ windowWidth: window.innerWidth })
        }     
    }

    render() {
        return (
            <Provider store={store}>
                <NavBar />
                <div className="main-container">
                    <div className="left-panel">
                        <LeftPanel width={this.state.windowWidth}/>
                        <OverlayPanel />
                    </div>
                    <RightPanelSwitcher
                        className="main-container_right"
                    />
                </div>
            </Provider>
        )
    }
}

export default App;
