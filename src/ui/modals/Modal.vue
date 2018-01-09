<template>
  <div>
      <modal :name="name" :height="this.height" width="450" @before-open="beforeOpen">
        <div>
            <div class="modal__header">
                <div class="float-right">
                    <button class="modal__close" @click="hide()">
                        <i class="material-icons">close</i>
                    </button>
                </div>
                <div class="modal__title">
                    <slot name="title"></slot>
                </div>
            </div>
            <div class="modal__content">
                <slot name="content"></slot>
            </div>
            <div class="modal__footer">
                <slot name="footer">
                    <div class="float-right">
                        <button class="btn-default" @click="cancel()">Cancel</button>
                        <button class="btn-primary" @click="ok()">OK</button>
                    </div>
                </slot>
            </div>
        </div>
      </modal>
  </div>
</template>
<script>
export default
{
    props: ['name', 'height'],
    methods: {
        hide() {
            this.cancel();
        },
        beforeOpen() {
            this.$emit('before-open')
        },
        cancel() {
            this.$emit('on-cancel')
            this.$modal.hide(this.name)
        },
        ok() {
            this.$emit('on-ok')
            this.$modal.hide(this.name)
        }
    }
}
</script>
