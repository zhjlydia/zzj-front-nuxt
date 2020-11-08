<template>
  <div class="category-list">
    <div
      v-for="(item, index) in items"
      :key="index"
      class="category-item"
      :class="{selected: item.id === selected}"
      @click="select(item.id)"
    >
      {{ item.title }}
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'
import Category from '@/model/category'

@Component
export default class CategoryComp extends Vue {
  @Prop()
  items: Category

  @Prop()
  selected: number

  @Emit()
  select(id: number) {
    return id
  }
}
</script>
<style lang="less" scoped>
.category-list {
  position: fixed;
  background: #fff;
  border-radius: 10px;
  top: 200px;
  margin-left: -100px;
  padding: 10px;
  .category-item {
    border-radius: 10px;
    height: 20px;
    line-height: 20px;
    cursor: pointer;
    margin: 10px 0;
    position: relative;
    padding: 0 10px;
    &.selected {
      &:before {
        content: '';
        position: absolute;
        width: 3px;
        border-radius: 3px;
        left: 0;
        top: 2px;
        bottom: 2px;
        background: #ffe082;
      }
    }
  }
}
</style>
