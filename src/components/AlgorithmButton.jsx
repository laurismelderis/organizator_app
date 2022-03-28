import React, { Component } from 'react'

class AlgorithmButton extends Component {
    state = {}

    doAlgorithm() {
        console.log(this.props)
    }

    render() {
        return (
            <div>
                <button type="button" className="btn btn-secondary" onClick={() => this.doAlgorithm()}>Execute</button>
            </div>
        )
    }
}

export default AlgorithmButton