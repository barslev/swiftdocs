export class DataSource
{
    constructor()
    {
        this.busy = true
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

    _useHttpSource() {
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
        this.busy = true
        this.axios.get(this.url).then((response) => {
            this.busy = false
            this.data = response.data
        }).catch(() => {
            this.busy = false
        })
    }
}