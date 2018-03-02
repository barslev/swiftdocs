<template>
    <div>
    <h5>{{ $t('menus.layout.title') }}</h5>
    <toolbar-button icon="settings_overscan" @onClick="$modal.show('page-margins')">{{ $t('menus.layout.margins')}}</toolbar-button>
    <toolbar-button icon="color_lens" @onClick="$modal.show('page-color')">{{ $t('menus.layout.page_color')}}</toolbar-button>
    <hr>
    <toolbar-button icon="queue" @onClick="addPage()">{{ $t('menus.layout.add_new')}}</toolbar-button>
    <toolbar-button icon="folder" @onClick="addGroup()">Add New Group</toolbar-button>
    
    </div>
</template>
<script>
import {connect} from '~/redux/connect'
import {addPage} from '~/redux/actions/pages'
import {insertContent, updateContentState} from '~/redux/actions/contents'

export default {
    methods: {
		addPage() {
			addPage()
            notifySuccess($t('messages.page_added'))
        }, 
        addGroup() {
            var name = prompt('Name this group');
            const groupId = insertContent('group', null)
            updateContentState(groupId, {
                name: name ? name : 'Unnamed Group'
            })
        }       
    }    
}
</script>