import { duplicateContent } from '~/redux/actions/contents'
import { getSelectedContent, selectContent } from '~/redux/actions/session'

export default {
    key: 80, // d key
    invoke: () => {
        const selected = getSelectedContent()
        if (selected && selected.container_id) {
            selectContent(selected.container_id)
        }
    }
}