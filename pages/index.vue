
<template>

</template>
<script lang="ts">

import {Component, Vue} from 'vue-property-decorator'

@Component
export default class Index extends Vue {
  created(){
    this.$router.push({name:'home'})
  }
}
</script>