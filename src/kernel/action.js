import actions from '~/redux/actions'

export default class Action {
    constructor() {
        for(let action in actions) {
            this[action] = actions[action]
        }
    }
}