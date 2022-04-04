import React, { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
// import { mergeClassNames } from '../../utils'
import { graphNodeUnselected } from '../../state/actions'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRemove, faPencil } from '@fortawesome/free-solid-svg-icons'

export default function NodeRelationsPanel(props) {
    const dispatch = useDispatch();
    const goBack = useCallback(() => {
        dispatch(graphNodeUnselected());
    }, [dispatch]);

    // let nodeName = "Nosaukums";

    // let className = mergeClassNames(props.className, "node-relations");

    const nodeId = useSelector(state => state.selectedGraphNodeId)
    const nodes = useSelector(state => state.nodes)

    const peopleCount = nodes.find(node => node.id === nodeId).peopleCount
    const level = nodes.find(node => node.id === nodeId).level

    return <div className={props.className}>
        <button onClick={goBack}
            style={{
                position: 'absolute',
                right: '1em',
                top: '1em',
            }}>Atpakaļ</button>
        <h1>{nodeId}</h1>
        <h2>Cilvēku skaits: {peopleCount}</h2>
        <h2>Līmenis: {level}</h2>
        <h1>Attiecības</h1>
        <table>
            <thead>
                <tr>
                    <th>Saite no</th>
                    <th>Saite uz</th>
                    <th>Svars</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><input type="text" value="d_1" /></td>
                    <td><input type="text" value="d_2" /></td>
                    <td><input type="text" value="5" /></td>
                    <td>
                        <button style={{background: "blue"}}>
                            <FontAwesomeIcon icon={faPencil} />
                        </button>
                    </td>
                    <td>
                        <button style={{background: "red"}}>
                            <FontAwesomeIcon icon={faRemove} />
                        </button>
                    </td>
                </tr>
                <tr>
                    <td>d_2</td>
                    <td>d_3</td>
                    <td>3</td>
                    <td>
                        <button style={{background: "blue"}}>
                            <FontAwesomeIcon icon={faPencil} />
                        </button>
                    </td>
                    <td>
                        <button style={{background: "red"}}>
                            <FontAwesomeIcon icon={faRemove} />
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
}