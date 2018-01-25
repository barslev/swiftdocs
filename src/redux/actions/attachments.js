import md5 from 'blueimp-md5'

function readFileFromInput(file) {
    return new Promise((resolve, reject) => {
        if (!file) {
            return reject('File not selected')
        }
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result)
        // TODO: Handle read error
        reader.readAsDataURL(file)
    })
}

function dispatchAdd(id, data) {
    store.dispatch({
        type: 'ATTACHMENTS_ADD',
        payload: {
            id: md5(data),
            data,
        }
    })
    return id
}

export function attachFileFromInput(file) {
    return readFileFromInput(file)
        .then((data) => {
            return dispatchAdd(
                md5(data),
                data
            )
        })
}

export function markAttachmentsAsUploaded() {
    store.dispatch({ type: 'ATTACHMENTS_MARK_UPLOADED'})
}

export function attachmentData(id) {
    return _.get(store, 'state.attachments.' + id + '.data')
}