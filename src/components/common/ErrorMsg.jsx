import React from 'react'

import { ERROR_CODE, getErrorCode } from '../../constants/errorCodes'

function ErrorMsg(props) {
    const { errorCode } = props
    return (
        <div style={{color: "#CC0000", fontWeight: "600"}}>{getErrorCode(errorCode)}</div>
    )
}

export default ErrorMsg