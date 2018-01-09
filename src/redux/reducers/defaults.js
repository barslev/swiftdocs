const initialState = {
	margins: {
		top: 25,
		left: 25,
		right: 25,
		bottom: 25
	},
	// Default page dimensions in mm
	dimensions: {
		width: 210,
		height: 297
	},
	// Default page background color
	color: '#ffffff'    
}

export default (state = initialState, action) => {
    switch (action.type) {
		case 'DEFAULTS_UPDATE':
			return {...state, ...action.payload}
        default:
            return state
    }
}