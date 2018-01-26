import { removeContent } from '~/redux/actions/contents'
import { isDocumentAlterable, getSelectedContent } from '~/redux/actions/session'

export default {
    key: 8, // backspace
    invoke: () => {
        removeContent(
            getSelectedContent()
        )
    }
}