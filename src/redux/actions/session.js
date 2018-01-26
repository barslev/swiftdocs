export const MODE_EDIT = 0
export const MODE_RENDER = 1

const modes = {
    'edit': MODE_EDIT,
    'default': MODE_EDIT,
    'render': MODE_RENDER,
    'render_only': MODE_RENDER,
    'translate': MODE_EDIT,
}

export function activateMode(mode) {
    if (!mode) {
        return // Do nothing
    }
    store.dispatch({
        type: 'SESSION_MODE_SET',
        payload: modes[mode]
    })

    if (mode === 'render_only') {
        store.dispatch({
            type: 'SESSION_SET_EDITABLE',
            payload: false
        })
    }

    if (mode === 'translate') {
        store.dispatch({
            type: 'SESSION_SET_ALTERABLE',
            payload: false
        })
    }
}

export function beginEditMode() {
    store.dispatch({
        type: 'SESSION_MODE_SET',
        payload: MODE_EDIT
    })
}

export function beginRenderMode() {
    store.dispatch({
        type: 'SESSION_MODE_SET',
        payload: MODE_RENDER
    })
    // Deselect any content currently selected
    deselectContent()
}

export function getCurrentMode() {
    return store.state.session.mode
}

export function selectContent(id) {
    store.dispatch({
        type: 'SESSION_CONTENT_SELECT',
        payload: id
    })
}

export function deselectContent() {
    store.dispatch({
        type: 'SESSION_CONTENT_DESELECT'
    })
}

export function getSelectedContentId() {
    return store.state.session.selectedId
}

export function getSelectedContent() {
    const id = getSelectedContentId()
    return id ? _.find(store.state.contents, {id}) : null
}

export function setTranslation(language) {
    store.dispatch({
        type: 'SESSION_SET_TRANSLATION',
        payload: {
            language
        }
    })
}

function showSaveSuccess() {
    notifySuccess(
        $t('messages.saved'),
        $t('messages.saved_more')
    )
}

function showSaveError(error) {
    notifyError(
        $t('messages.save_failed'),
        error.toString()
    )
}

function setSavingFlag(flag) {
    store.dispatch({
        type: 'SESSION_SET_SAVING',
        payload: flag
    })    
}

export function saveCurrentSession() {

    if (store.state.session.saving) {
        // Save in progress. Don't try it again yet.
        return
    }

    if ( ! store.state.session.changed) {
        // Nothing changed, no need to save
        return showSaveSuccess()
    }

    setSavingFlag(true)

    // Remove redundant attachments
    _swd.action.cleanUpAttachments()

    // Create a copy of the state
    const clonedState = { ...window.store.state }
    // Remove live session state from the persistent data
    delete clonedState.session

    _swd.storage.persist(_swd.documentId, clonedState)
        .then(() => {
            _swd.action.markAttachmentsAsUploaded()
            store.dispatch({ type: 'SESSION_SAVED' })
            showSaveSuccess()
        })
        .catch((error) => {
            setSavingFlag(false)
            showSaveError(error)
        })
}