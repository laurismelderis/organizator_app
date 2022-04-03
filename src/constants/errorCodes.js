const ERROR_CODE = {
    NOT_XLSX: 0,
    WRONG_TEMPLATE: 1
}

const getErrorCode = (errorCode) => {
    switch (errorCode) {
        case ERROR_CODE.NOT_XLSX:
            return "Neatbilst .xls vai .xlsx formātam"
        case ERROR_CODE.WRONG_TEMPLATE:
            return "Neatbilst šablona piemēram"
    }
}

export { ERROR_CODE, getErrorCode }