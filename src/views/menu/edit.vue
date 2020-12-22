<template>
  <div class="menuEdit">
    <create-or-edit :isEdit="true"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import CreateOrEdit from './components/createOrEdit.vue'

export default Vue.extend({
    name: 'menuEdit',
    components: {
        CreateOrEdit,
    },
})
</script>

<style lang="scss" scoped></style>
