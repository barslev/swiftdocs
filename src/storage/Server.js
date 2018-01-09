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
        return this.axios.put(this.baseUrl + '/' + documentId, {
            state
        })
    }
}