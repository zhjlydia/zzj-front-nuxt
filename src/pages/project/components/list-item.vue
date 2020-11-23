<!-- @format -->

<template>
  <div class="list-item" @click="detail(item.id)">
      <el-image
        v-if="item.image"
        class="image"
        :src="item.image"
        fit="cover"
      ></el-image>
      <div class="content">
        <p class="title">{{ item.name }}</p>
        <tag
        v-for="(tag, index) in item.tags"
        :key="index"
        :color="getColor(index)"
        >{{ tag.content }}
        </tag>
        <div class="time">
          {{ item.startedAt | formatDate('YYYY-MM-DD') }} 至
          {{ item.endedAt | formatDate('YYYY-MM-DD') }}
        </div>
      </div>
      <div class="content2">
        <div class="description">{{ item.description }}</div>
      </div>  
  </div>
</template>
<script lang="ts">
/** @format */

import { Component, Vue, Prop, Emit } from 'vue-property-decorator'
import { COLOR_ARRAY } from '@/common/constant'
import Tag from '@/components/tag.vue'
import Article from '@/model/article'
import { formatDate } from '@/utils/filters'

@Component({ components: { Tag } ,filters: { formatDate }})
export default class ListItem extends Vue {
  @Prop()
  item: Article

  getColor(index: number) {
    return COLOR_ARRAY[index % COLOR_ARRAY.length]
  }

  @Emit()
  detail(id: number) {
    return id
  }
}
</script>
<style lang="less" scoped>
/** @format */
.list-item {
  color: #fff;
  font-size: 14px;
  margin-bottom:30px;
  border-radius: 10px;
  text-align: center;
  overflow: hidden;
  cursor: pointer;
  position:relative;
  &:hover{
    .content2{
      opacity: 1;
      transform: scale(1);
    }
    .content{
      opacity:0;
      transform: translateY(50%);
    }
  }
  .content,.content2 {
    background:rgba(0,0,0,0.4);
    position:absolute;
    left:15px;
    top:15px;
    bottom:15px;
    right:15px;
    padding: 120px 10px 0 10px;
    -webkit-transition: all 0.4s ease-in-out;
    transition: all 0.4s ease-in-out;
  }
  .content{
    opacity:1;
  }
  .content2{
    opacity:0;
    transform: scale(0.9);
  }
  .title {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 15px;
  }
  .time {
    font-size: 10px;
    font-weight: bold;
    margin-top:10px;
  }
  .image {
    text-align: center;
    width: 100%;
    height: 250px;
  }
}
@media (max-width: 650px) {
  .list-item {
    align-items: center;
    .title {
      margin-bottom: 10px;
    }
    .image-wrap {
      padding: 5px;
    }
    .description {
      margin: 10px 0;
    }
  }
}
</style>
