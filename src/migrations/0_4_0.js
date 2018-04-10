// As of v0.4.0, logic checks will be an array, instead of a single rule.

module.exports = {
    
    before: '0.4.0',
    
    up: function(state) {
        alert(state)
        return state
    }
}