import { saveCurrentSession } from '~/redux/actions/session'

export default {
    key: 83, // d key
    invoke: () => {
        saveCurrentSession()
    }
}