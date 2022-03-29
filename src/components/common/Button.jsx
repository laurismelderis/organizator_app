import React from 'react'

const Button = (props) => {
    return (
        <React.Fragment>
            <button 
                type="button" 
                className="btn btn-secondary"
                onClick={props.onClick}
            >
                {props.text}
            </button>
        </React.Fragment>
    )
}

export default Button