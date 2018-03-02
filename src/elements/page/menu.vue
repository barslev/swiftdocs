<template>
  <div>
    <h5>Add to group</h5>
    <select class="form-control" v-model="groupId">
        <option :value="null">No group</option>
        <option v-for="group in state.groups" :key="group.id" :value="group.id">{{ group.state.name }}</option>
    </select>
    <button class="btn btn-primary" @click="addToGroup()">Add to group</button>
  </div>
</template>
<script>
import {connect} from '~/redux/connect'
import {moveContent} from '~/redux/actions/contents'


export default {
  props: ['id'],
  mixins: [
    connect((state, scope) => {
      return {
        groups: state.contents.filter(content => content.element === 'group')
      }
    })
  ],
  data() {
      return {
          groupId: null,
      }
  },
  methods: {
      addToGroup() {
          moveContent(this.id, this.groupId);
      }
  }
}
</script>
