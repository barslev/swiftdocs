<template>
    <div class="fixed pin-x bg-grey-lightest px-4 py-2 border-b border-grey-light" style="z-index:2">
        <div class="float-left">
            <dropdown-menu label="FILE">
                <dropdown-option @click.native="">
                    <div class="flex items-center">
                        <i class="material-icons mr-1 text-green">add</i> New Page
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
import {beginRenderMode} from '~/redux/actions/mode';

export default {
    created() {
        this.beginRenderMode = beginRenderMode
    }
}
</script>