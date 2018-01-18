<template>
    <div>
        <div class="text-center">
            <button class="btn-primary" style="margin-top:0" @click="refresh()" :disabled="busy">
                <i class="material-icons float-left mr-1" style="margin-top:-2px">refresh</i>
                {{ busy ? $t('menus.data.loading') : $t('menus.data.refresh') }}
            </button>
        </div>
        <hr>
        <h5>{{ $t('menus.data.explorer') }}</h5>

        <div v-if="variables">
            <variable-displayer v-for="(variable, i) in Object.keys(variables)"
                :key="i"
                :variable="variable"
                :value="variables[variable]"></variable-displayer>
        </div>
        <div v-else class="text-center text-sm text-grey">{{ $t('global.loading') }}</div>
  

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
                    notifySuccess(
                        $t('menus.data.msg_success_title'),
                        $t('menus.data.msg_success_text')
                    )
                })
                .catch((error) => {
                    notifyError($('menus.data.msg_error_title'), error.toString())
                })
        }
    }
}
</script>