import React from 'react'
import { useSelector } from 'react-redux'
import { graphNodeUnselected } from '../../state/actions'

import DataEntryPanel from './DataEntryPanel'
import NodeRelationsPanel from './NodeRelationsPanel'

export default function RightPanelSwitcher(props) {
    const selectedNode = useSelector((state) => state.selectedGraphNodeId)
    if (selectedNode === null) {
        return <DataEntryPanel {...props} />
    } else {
        return <NodeRelationsPanel {...props} />
    }
}