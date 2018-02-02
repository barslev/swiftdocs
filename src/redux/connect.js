import cloneDeep from 'lodash/cloneDeep';

export const connect = (selector, props) => {
    let state = undefined;
    return {
        data: () => ({ state: {} }),
        created() {
            state = selector(store.getState(), this);
            this.state = Object.keys(state).reduce((prev, key, index) =>
                ({ ...prev, [key]: cloneDeep(state[key]) }), {})

            this.unsubscribe = store.subscribe(() => {
                let next = selector(store.getState(), this);
                Object.keys(state).forEach(key => {
                    this.$set(this.state, key, cloneDeep(next[key]));
                });
                state = next;
            });
        },
        beforeDestroy() {
            this.unsubscribe();
        }
    }
}