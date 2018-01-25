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
        let clone = {...state}
        // Only include not uploaded attachments
        for (let i in clone.attachments) {
            let attachment = clone.attachments[i]
            if (attachment.uploaded) {
                // If the attachment is marked as uploaded,
                // Then don't resend its data to the server
                attachment.data = null
            }
        }
        return clone
    }

    persist(documentId, state) {
        // Clean up already uploaded attachments
        state = this._nullifyUploadedAttachments(state)
        // Submit the state to the web service
        return this.axios.put(this.baseUrl + '/' + documentId, {
            state
        })
    }
}