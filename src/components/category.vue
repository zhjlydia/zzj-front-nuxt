<template>
  <div class="category-list">
    <div
      v-for="(item, index) in items"
      :key="index"
      class="category-item"
      :class="{ selected: item.id === selected }"
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
  display: flex;
  background: #fff;
  .category-item {
    height: 20px;
    line-height: 20px;
    cursor: pointer;
    margin: 10px;
    position: relative;
    padding: 0 10px;
    &.selected {
      &:before {
        content: '';
        position: absolute;
        width: 5px;
        border-radius: 3px;
        left: 0;
        top: 6px;
        bottom: 6px;
        background: #ffe082;
      }
    }
  }
}
@media (max-width: 650px) {
  .category-list {
    display: none;
  }
}
</style>
