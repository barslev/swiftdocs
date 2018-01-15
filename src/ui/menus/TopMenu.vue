<template>
    <div class="fixed pin-x pin-t bg-grey-lightest px-4 py-2 border-b border-grey-light" style="z-index:6">
        <div class="float-left">
            <dropdown-menu label="FILE">
                <template v-if="inRenderMode">
                <dropdown-option @click.native="beginEditMode()">
                    <div class="flex items-center">
                        <i class="material-icons mr-1 text-blue">edit</i> Edit Document
                    </div>
                </dropdown-option>                    
                </template>
                <template v-if="!inRenderMode">
                <dropdown-option @click.native="save()">
                    <div class="flex items-center">
                        <i class="material-icons mr-1 text-green">save</i> Save
                    </div>
                </dropdown-option>                    
                <dropdown-option @click.native="">
                    <div class="flex items-center">
                        <i class="material-icons mr-1 text-blue">add</i> New Page
                    </div>
                </dropdown-option>
                <dropdown-option @click.native="">
                    <div class="flex items-center">
                    <i class="material-icons mr-1 text-purple" style="margin-top:-3px">content_copy</i> Document Settings
                    </div>
                </dropdown-option>
                <dropdown-option @click.native="beginRenderMode()">
                    <div class="flex items-center">
                    <i class="material-icons mr-1 text-orange" style="margin-top:-3px">remove_red_eye</i> Render Document
                    </div>
                </dropdown-option>
                </template>
            </dropdown-menu>
        </div>

        <div class="float-left">
            <h4 class="mt-2">Untitled Document</h4>
        </div>



        
        <div class="float-right">
            <dropdown-menu icon="settings" align="pin-r">
                <dropdown-option @click.native="$modal.show('page-color')">Screen Language</dropdown-option>
            </dropdown-menu>
        </div>

        <div class="clearfix"></div>

        
    </div>
</template>
<script>
import {beginRenderMode, beginEditMode} from '~/redux/actions/mode';

export default {
    created() {
        this.beginEditMode = beginEditMode
        this.beginRenderMode = beginRenderMode
    },
    methods: {
        save() {
            _swd.save()
        }
    }
}
</script>