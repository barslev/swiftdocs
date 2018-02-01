import { connect } from '~/redux/connect'
import { getContentState } from '~/redux/actions/contents'

export default {
    mixins: [
        connect((state, scope) => {
            return getContentState(scope.id, {})
        })
    ],
    props: [
        'id', // Element ID.
        'context', // Context to hold contextual veriables to be used at render time.
    ],
}