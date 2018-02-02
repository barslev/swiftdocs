import cloneDeep from 'lodash/cloneDeep';

export const connect = (selector, props) => {
    return {
        data: () => ({ state: {} }),
        created() {

            this.onStateDidUpdate = this.onStateDidUpdate
            
            this._cache = selector(store.getState(), this);
            this.state = Object.keys(this._cache).reduce((prev, key, index) =>
                ({ ...prev, [key]: cloneDeep(this._cache[key]) }), {})

            if (this.id) {
                this.idWatcher = this.$watch('id', this.onStateDidUpdate)
            }
            
            this.unsubscribe = store.subscribe(this.onStateDidUpdate)
        },
        beforeDestroy() {
            this.unsubscribe();
            
            if (this.idWatcher) {
                this.idWatcher()
            }
        },
        methods: {
            onStateDidUpdate() {
                let next = selector(store.getState(), this);
                Object.keys(this._cache).forEach(key => {
                    if (this._cache[key] !== next[key]) {
                        this.$set(this.state, key, cloneDeep(next[key]));
                    }
                });
                this._cache = next;
            }
        }
    }
}