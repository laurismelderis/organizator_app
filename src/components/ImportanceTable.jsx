import React from 'react'

import Table from './common/Table'

const ImportanceTable = (props) => {
    if (props.data[0]) {
        return (
            <React.Fragment>
                <Table title={"Sorted importance table"} data={props.data}/>
            </React.Fragment>
        )
    }
    return <React.Fragment></React.Fragment>
}

export default ImportanceTable