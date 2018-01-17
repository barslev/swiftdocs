<template>
    <div>
    <h5>Page Layout</h5>
    <toolbar-button icon="settings_overscan" @onClick="$modal.show('page-margins')">Margins</toolbar-button>
    <toolbar-button icon="tab_unselected" @onClick="$modal.show('page-size')">Page Size</toolbar-button>
    <toolbar-button icon="color_lens" @onClick="$modal.show('page-color')">Color</toolbar-button>
    <hr>
    <toolbar-button icon="queue" @onClick="addPage()">Add New Page</toolbar-button>
    </div>
</template>
<script>
import {addPage} from '~/redux/actions/pages'

export default {
    methods: {
		addPage() {
			addPage()
		},        
    }    
}
</script>