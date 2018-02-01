import cuid from 'cuid'
import {updateDefaults} from './defaults'

export function addPage() {
    
    const state = store.getState()

    store.dispatch({
        type: 'PAGE_ADD',
        payload: {
            id: cuid(),
            color: state.defaults.color,
            margins: state.defaults.margins,
            dimensions: state.defaults.dimensions,
        }
    })
}

export function removePage(id) {
    store.dispatch({
        type: 'PAGE_REMOVE',
        payload: {id}
    })
    window.notifySuccess($t('messages.page_removed'))
}

export function updatePageMargin(newMargins) {
    store.dispatch({
        type: 'PAGE_UPDATE_MARGINS',
        payload: {
            margins: newMargins
        }
    })
}

export function updateAllPageMargins(newMargins) {
    updatePageMargin(newMargins)
    updateDefaults({margins: newMargins})
}

export function updatePageColor(newColor, id) {
    store.dispatch({
        type: 'PAGE_UPDATE_COLOR',
        payload: {
            id,
            color: newColor
        }
    })
}

export function updateAllPageColors(newColor) {
    updatePageColor(newColor, null)
    updateDefaults({color: newColor})
}

export function updateAllPageDimensions(newDimensions) {
    store.dispatch({
        type: 'PAGE_UPDATE_DIMENSIONS',
        payload: {
            id: null,
            dimensions: newDimensions
        }
    })
    updateDefaults({dimensions: newDimensions})
}

export function findPage(id) {
    return _.find(store.getState().pages, { id })    
}