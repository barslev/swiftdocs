import { getElementState } from '~/redux/actions/contents'

export default {
    props: [
        'id', // Element ID.
        'context', // Context to hold contextual veriables to be used at render time.
    ],
    data() {
        return {
            contents: this.$select('contents')
        }
    },
    computed: {
        state() {
            let state = _.get(_.find(this.contents, { id: this.id }), 'state')
            return state
        }
    }
}