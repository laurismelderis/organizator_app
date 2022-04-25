import React, { useCallback } from "react"
import { useSelector, useDispatch } from "react-redux";
import { mergeClassNames } from "../../utils"
import { setOverlayPanelVisible } from "../../state/actions";

export default function OverlayPanel() {
    const dispatch = useDispatch();
    const isHidden = ! useSelector((state) => state.showOverlayPanel);
    const hide = useCallback(() => dispatch(setOverlayPanelVisible(false)),
        [dispatch, setOverlayPanelVisible]);
    const className = mergeClassNames(
        "overlay-panel",
        isHidden ? "overlay-panel--hidden" : "",
    )
    
    const unsortedNodes = useSelector(state => state.unsortedNodes)

    return <div className={className}>
        <div onClick={hide}>
            <h2>Nesakārtotās struktūrvienības</h2>
            <br />
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Darbinieku sk.</th>
                        <th>Līmenis</th>
                    </tr>
                </thead>
                <tbody>
                    {unsortedNodes.map((unsortedNode, index) => 
                        <tr key={index}>
                            <td>{unsortedNode.id}</td>
                            <td>{unsortedNode.peopleCount}</td>
                            <td>{unsortedNode.level}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    </div>
}