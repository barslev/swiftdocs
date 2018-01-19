export class DataSource
{
    constructor()
    {
        this.busy = true
        this.context = {}
        this.refresh = this.refresh.bind(this)
    }

    use() {
        if (typeof arguments[0] === 'string') {
            // Looks like an URL
            return this._useHttpSource.apply(this, arguments)
        }
        if (typeof arguments[0] === 'object') {
            return this._useRawSource.apply(this, arguments)
        }
        throw new Error('Can\'t recognize the type of data source.')
    }

    _useHttpSource(url, axios) {
        this.url = url
        this.axios = axios
        this.refresh()
    }

    _useRawSource(data) {
        this.busy = false
        this.data = data
    }

    refresh()
    {
        if (!this.axios) {
            return Promise.reject('You are using a static data source.')
        }        
        this.busy = true
        return this.axios.get(this.url).then((response) => {
            this.busy = false
            this.data = response.data
        }).catch((error) => {
            this.busy = false
            // Rethrow error for debugging
            throw error
        })
    }
}