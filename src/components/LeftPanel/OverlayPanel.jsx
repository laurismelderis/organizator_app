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

    return <div className={className}>
        <div onClick={hide}>a</div>
    </div>
}