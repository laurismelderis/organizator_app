import React, { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setOptimizedGraph, setHierarchicalGraph } from '../../state/actions.js'

function RadioGroup(props) {
    const isOptimized = useSelector((state) => state.optimizedGraph)
    const isHierarchical = useSelector((state) => state.hierarchicalGraph)
    const dispatch = useDispatch()

    const setOptimized = useCallback((event) => {
        dispatch(setOptimizedGraph(event.target.checked))
    }, [dispatch]);
    const setHierarchical = useCallback((event) => {
        dispatch(setHierarchicalGraph(event.target.checked))
    }, [dispatch]);
    return (
        <div className={props.className}>
            <label className="input-group">
                <input type="checkbox"
                    checked={isOptimized}
                    onChange={setOptimized} />
                {' '}
                Optimizēts skats
            </label>
            <label className="input-group">
                <input type="checkbox"
                    checked={isHierarchical}
                    onChange={setHierarchical} />
                {' '}
                Hierarhisks skats
            </label>
        </div>
    )
}

export default RadioGroup