const initialState = {}

function defaultStyle(element) {
    const defaults = {
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

    const elementStyles = _swd.registry.defaultStyle(element)
    return {...defaults, ...elementStyles}
}

export default (state = initialState, action) => {
    switch (action.type) {
        
        case 'CONTENT_INSERT':
            return {
                ...state,
                // Inject the new content's style
                [action.payload.content.id]: defaultStyle(
                    action.payload.content.element
                )
            }

        case 'CONTENT_REMOVE':
            let clone = {...state}
            delete clone[action.payload.id]
            return clone
        
        case 'STYLE_UPDATE':
            const change = {[action.payload.prop]: action.payload.value}
            const updatedStyle = {...state[action.payload.id], ...change}
            return {...state, [action.payload.id]: updatedStyle}

        case 'STYLE_SET':
            return {...state, [action.payload.id]: action.payload.style}

        default:
            return state
    }
}