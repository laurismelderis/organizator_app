import React, { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
// import { mergeClassNames } from '../../utils'
import { graphNodeUnselected } from '../../state/actions'

export default function NodeRelationsPanel(props) {
    const dispatch = useDispatch();
    const goBack = useCallback(() => {
        dispatch(graphNodeUnselected());
    }, [dispatch]);

    // let nodeName = "Nosaukums";
    let personCount = "X";

    // let className = mergeClassNames(props.className, "node-relations");

    const state = useSelector(state => state)

    return <div className={props.className}>
        <button onClick={goBack}
            style={{
                position: 'absolute',
                right: '1em',
                top: '1em',
            }}>Atpakaļ</button>
        <h1>{state.selectedGraphNodeId}</h1>
        <h2>Cilvēku skaits: {personCount}</h2>
        <h1>Attiecības</h1>
        <table>
            <thead>
                <tr>
                    <th>Saite no</th>
                    <th>Saite uz</th>
                    <th>Svars</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>d_1</td>
                    <td>d_2</td>
                    <td>5</td>
                    <td>X</td>
                </tr>
            </tbody>
        </table>
        {/* <ScrollableTable
            headings={["Saite no", "Saite uz", "Svars", "Līmenis"]}
        /> */}
    </div>
}