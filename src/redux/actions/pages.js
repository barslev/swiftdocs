import cuid from 'cuid'
import {updateDefaults} from './defaults'

export function addPage() {
    store.dispatch({
        type: 'PAGE_ADD',
        payload: {
            id: cuid(),
            color: store.state.defaults.color,
            margins: store.state.defaults.margins,
            dimensions: store.state.defaults.dimensions,
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
    return _.find(store.state.pages, { id })    
}