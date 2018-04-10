import * as _ from 'lodash'
// As of v0.4.0, logic checks will be an array, instead of a single rule.

module.exports = {
    
    before: '0.4.0',
    
    up: function(state) {
        state.contents = state.contents.map(content => {
            if (_.get(content, 'state.logic.condition') && !_.get(content, 'state.logic.conditions')) {
                content.state.logic.conditions = [content.state.logic.condition]
                delete content.state.logic.condition
            }
            return content
        })
        return state
    }
}