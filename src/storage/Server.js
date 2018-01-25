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

    persist(documentId, state) {
        
        // Only include not uploaded attachments
        state.attachments = _.pickBy(
            state.attachments,
            value => !value.uploaded
        )

        return this.axios.put(this.baseUrl + '/' + documentId, {
            state
        })
    }
}