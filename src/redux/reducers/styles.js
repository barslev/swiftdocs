const initialState = {}

function defaultStyle(element) {

    let styles = {
        position: 'relative',
        // Default properties for the element
        marginTop: 10,
        marginLeft: 0,
        marginRight: 0,
        marginBottom: 10,
        //
        paddingTop: 0,
        paddingLeft: 0,
        paddingRight: 0,
        paddingBottom: 0,
        //
        borderWidth: 0,
        borderColor: null,
        borderRadius: 0,
        borderTop: false,
        borderLeft: false,
        borderRight: false,
        borderBottom: false,
        //
        backgroundColor: null,
    }

    if (element === 'container') {
        styles.borderWidth = 1
        styles.borderTop = true
        styles.borderLeft = true
        styles.borderRight = true
        styles.borderBottom = true
        styles.borderColor = '#ebebeb'
        styles.backgroundColor = '#f4f4f4'
        styles.paddingTop = 10
        styles.paddingLeft = 5
        styles.paddingRight = 5
        styles.paddingBottom = 10
    }

    return styles
}

export default (state = initialState, action) => {
    switch (action.type) {
        
        case 'CONTENT_INSERT':
            return {
                ...state,
                // Inject the new content's style
                [action.payload.content.id]: {
                    // Get the default style
                    ...defaultStyle(action.payload.content.element),
                    // And override with any custom style that's been passed
                    ...action.payload.style,
                }
            }

        case 'CONTENT_REMOVE':
            let clone = {...state}
            delete clone[action.payload.id]
            return clone
        
        case 'STYLE_UPDATE':
            const change = {[action.payload.prop]: action.payload.value}
            const updatedStyle = {...state[action.payload.id], ...change}
            return {...state, [action.payload.id]: updatedStyle}
        
        default:
            return state
    }
}