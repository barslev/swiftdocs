import { connect } from '~/redux/connect'
import { getContentState } from '~/redux/actions/contents'

export default (selector) => {

    if (!selector) {
        selector = () => {}
    }

    return {
        props: [
            'id', // Element ID.
            'context', // Context to hold contextual veriables to be used at render time.
        ],        
        mixins: [
            connect((state, scope) => {
                return {
                    ...getContentState(scope.id, {}),
                    ...selector(state, scope),
                }
            })
        ]
    }
}