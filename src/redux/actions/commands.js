import { removeContent, duplicateContent } from "~/redux/actions/contents";
import { getSelectedContent, selectContent } from "~/redux/actions/session";

export function removeSelectedContent() {
    const selected = getSelectedContent()
    if (selected) {
        removeContent(selected)
    }
}

export function duplicateSelectedContent() {
    const selected = getSelectedContent()
    if (selected) {
        duplicateContent(selected)
    }
}

export function selectParent() {
    const selected = getSelectedContent()
    if (selected && selected.container_id) {
        selectContent(selected.container_id)
    }    
}

