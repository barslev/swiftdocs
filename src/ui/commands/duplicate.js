import { duplicateContent } from '~/redux/actions/contents'
import { getSelectedContent } from '~/redux/actions/session'

export default {
    key: 68, // d key
    invoke: () => {
        const selected = getSelectedContent()
        if (selected) {
            duplicateContent(selected)
        }
    }
}