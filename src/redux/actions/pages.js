import cuid from 'cuid'
import {updateDefaults} from './defaults'
import { insertContent } from './contents'

export function addPage() {
    insertContent('page', null)
}


export function addInitialPage() {
    const pages = store.getState().contents.filter((c) => c.element === 'page')
    
    if ( ! pages.length) {
        addPage()
    }
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