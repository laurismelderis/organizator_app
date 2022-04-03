import React from 'react'

function Signalizer(props) {
    const { text, isGood } = props
    const backColor = isGood ? "#00CC66" : "#FF3333"
    return (
        <div style={{
            backgroundColor: backColor,
            borderRadius: "0.9em",
            border: "none",
            margin: "auto",
            textAlign: "center",
            fontWeight: "600",
            width: "100%"
            }}>
            {text}
        </div>
    )
}

export default Signalizer