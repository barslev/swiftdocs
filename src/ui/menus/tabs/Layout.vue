<template>
    <div>
    <h5>{{ $t('menus.layout.title') }}</h5>
    <toolbar-button icon="settings_overscan" @onClick="$modal.show('page-margins')">{{ $t('menus.layout.margins')}}</toolbar-button>
    <toolbar-button icon="color_lens" @onClick="$modal.show('page-color')">{{ $t('menus.layout.page_color')}}</toolbar-button>
    <hr>
    <toolbar-button icon="queue" @onClick="addPage()">{{ $t('menus.layout.add_new')}}</toolbar-button>
    </div>
</template>
<script>
import {addPage} from '~/redux/actions/pages'

export default {
    methods: {
		addPage() {
			addPage()
            notifySuccess($t('messages.page_added'))
		},        
    }    
}
</script>