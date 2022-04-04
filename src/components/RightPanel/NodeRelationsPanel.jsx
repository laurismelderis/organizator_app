import React, { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { mergeClassNames } from '../../utils'
import ScrollableTable from '../common/ScrollableTable'
import { graphNodeUnselected } from '../../state/actions'

export default function NodeRelationsPanel(props) {
    const dispatch = useDispatch();
    const goBack = useCallback(() => {
        dispatch(graphNodeUnselected());
    }, [dispatch]);

    let nodeName = "Nosaukums";
    let personCount = "X";

    let className = mergeClassNames(props.className, "node-relations");

    return <div className={props.className}>
        <button onClick={goBack}
            style={{
                position: 'absolute',
                right: '1em',
                top: '1em',
            }}>Atpakaļ</button>
        <h1>{nodeName}</h1>
        <h2>Cilvēku skaits: {personCount}</h2>
        <h1>Attiecības</h1>
        <ScrollableTable
            headings={["Saite no", "Saite uz", "Svars", "Līmenis"]}
        />
    </div>
}