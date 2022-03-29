import React from 'react'

import Table from './common/Table'

const SortedNodeTable = (props) => {
    if (props.data[0]) {
        return (
            <React.Fragment>
                <Table title={"Sorted nodes table"} data={props.data}/>
            </React.Fragment>
        )
    }
    return <React.Fragment></React.Fragment>
}

export default SortedNodeTable