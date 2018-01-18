<template>
    <div>
        <div class="text-center">
            <button class="btn-primary" style="margin-top:0" @click="refresh()" :disabled="busy">
                <i class="material-icons float-left mr-1" style="margin-top:-2px">refresh</i> {{ busy ? 'Loading' : 'Refresh' }} Data
            </button>
        </div>
        <hr>
        <h5>Data Explorer</h5>

        <div v-if="variables">
            <variable-displayer v-for="(variable, i) in Object.keys(variables)"
                :key="i"
                :variable="variable"
                :value="variables[variable]"></variable-displayer>
        </div>
        <div v-else class="text-center text-sm text-grey">Loading</div>
  

    </div>
</template>
<script>
export default {
    data() {
        return {
            variables: null,
            busy: _swd.dataSource.busy,
        }
    },

    created() {
        this.variables = _swd.dataSource.data
    },

    methods: {
        refresh() {
            _swd.dataSource.refresh()
                .then(() => {
                    this.variables = _swd.dataSource.data
                    notifySuccess('Data Refreshed', 'Data has been reloaded')
                })
                .catch((error) => {
                    notifyError('Data Can\'t Be Loaded', error.toString())
                })
        }
    }
}
</script>