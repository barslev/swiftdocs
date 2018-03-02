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

export function updateAllPageMargins(newMargins) {
    updateDefaults({margins: newMargins})
}

export function updateAllPageColors(newColor) {
    updateDefaults({color: newColor})
}

export function updateAllPageDimensions(newDimensions) {
    updateDefaults({dimensions: newDimensions})
}

export function findPage(id) {
    return _.find(store.getState().pages, { id })    
}