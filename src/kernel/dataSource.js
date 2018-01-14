export class DataSource
{
    constructor()
    {
        this.refresh = this.refresh.bind(this)
    }

    use(url, axios) {
        this.url = url
        this.axios = axios
        this.refresh()
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