<template>
  <div class="breadcrumb-wrap">
    <div class="breadcrumb">
      <div class="breadcrumb-item" @click="redirect">{{ item.name }}</div>
      <div class="breadcrumb-title"><slot /></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'
import { BreadcrumbItem } from '@/model/common'
@Component
export default class Breadcrumb extends Vue {
  @Prop()
  item: BreadcrumbItem

  redirect() {
    this.$router.replace({ name: this.item.routerName })
  }
}
</script>
<style lang="less" scoped>
.breadcrumb-wrap {
  height: 60px;
  line-height: 60px;
  font-size: 14px;
  letter-spacing: 2px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: #f4f4f4;

  z-index: 100;
  box-shadow: 0 2px 13px 0 rgba(0, 0, 0, 0.06);
  .breadcrumb {
    max-width: 1240px;
    margin: 0 auto;
    padding: 0 20px;
    height: 100%;
    display: flex;
    align-items: center;
  }
  .breadcrumb-item {
    background: #ffe082;
    text-align: center;
    height: 30px;
    line-height: 30px;
    border-radius: 8px;
    margin-right: 5px;
    cursor: pointer;
    width: 60px;
  }
  .breadcrumb-title {
    height: 60px;
    line-height: 60px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
@media (max-width: 650px) {
  .breadcrumb-wrap {
    font-size: 12px;
  }
}
</style>
