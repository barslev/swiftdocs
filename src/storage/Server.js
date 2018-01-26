export default class Server
{
    constructor() {
        this.configure = this.configure.bind(this)
    }

    configure(baseUrl, axios) {
        this.axios = axios
        this.baseUrl = baseUrl
    }

    load(documentId) {
        return this.axios.get(this.baseUrl + '/' + documentId)
            .then((response) => {
                return response.data
            })
    }

    _nullifyUploadedAttachments(state) {
        const attachmentsMap = {}
        const clone = { ...state, attachments: {} }

        // Only include not uploaded attachments
        for (let i in state.attachments) {
            attachmentsMap[i] = { ...state.attachments[i] }
            if (attachmentsMap[i].uploaded) {
                // If the attachment is marked as uploaded,
                // Then don't resend its data to the server
                attachmentsMap[i].data = null
            }
        }

        clone.attachments = attachmentsMap
        return clone
    }

    persist(documentId, state) {
        // Clean up already uploaded attachments
        const clone = this._nullifyUploadedAttachments(state)
        // Submit the state to the web service
        return this.axios.put(this.baseUrl + '/' + documentId, {
            state: clone
        })
    }
}