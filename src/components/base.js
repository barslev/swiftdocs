import { getElementState, updateElementState } from '~/redux/actions/contents'

export default function(defaultState) {
    return {
        props: ['id'],
        data() {
            return {
                contents: this.$select('contents')
            }
        },
        computed: {
            state() {
                let state = _.get(_.find(this.contents, { id: this.id }), 'state')
                if (!state) {
                    state = updateElementState(this.id, defaultState)
                }
                return state
            }
        }
    }   
}