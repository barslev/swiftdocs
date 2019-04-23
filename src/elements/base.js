import { connect } from '~/redux/connect'
import { getContentState } from '~/redux/actions/contents'

const defaultSelector = (state, scope) => getContentState(scope.id, {})

export default (customSelector) => {

    let selector = defaultSelector

    if (customSelector) {
        selector = (state, scope) => ({
            ...getContentState(scope.id, {}),
            ...customSelector(state, scope),
        })
    }

    return {
        props: [
            'id', // Element ID.
            'context', // Context to hold contextual veriables to be used at render time.
            'children',
        ],
        mixins: [
            connect(selector)
        ]
    }
}