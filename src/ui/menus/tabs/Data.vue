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

        <div v-if="!state.loading">
            <variable-displayer v-for="(variable, i) in Object.keys(state.data)"
                :key="i"
                :variable="variable"
                :value="state.data[variable]"></variable-displayer>
        </div>
        <div v-else class="text-center text-sm text-grey">{{ $t('global.loading') }}</div>
  

    </div>
</template>
<script>
import {connect} from '~/redux/connect'

export default {

    mixins: [
        connect((state, scope) => {
            return {
                data: state.data.data,
                loading: state.data.loading,
            }
        })
    ],    

    data() {
        return {
            busy: _swd.dataSource.busy,
        }
    },

    methods: {
        refresh() {
            _swd.dataSource.refresh()
                .then(() => {
                    notifySuccess(
                        $t('menus.data.msg_success_title'),
                        $t('menus.data.msg_success_text')
                    )
                })
                .catch((error) => {
                    notifyError($t('menus.data.msg_error_title'), error.toString())
                })
        }
    }
}
</script>