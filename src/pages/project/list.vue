<template>
  <div class="project-list main">
    <div class="list">
      <div v-for="(item, index) in projects" :key="index" class="project-item">
        <list-item :item="item" @detail="detail"></list-item>
      </div>
    </div>
    <div v-if="loadListAbled" class="more" @click="more">加载更多</div>
    <div v-if="listLoading" class="loading">
      <i class="el-icon-bicycle mar-r-10"></i>加载中...
    </div>
    <category-comp
      :items="categories"
      :selected="currentCategory"
      @select="selectCategory"
    ></category-comp>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { namespace, State, Action } from 'vuex-class'
import { ActionMethod } from 'vuex'

import Project from '@/model/project'
import Category from '@/model/category'

import { Loading, Catch } from '@/decorators'
import listItem from './components/list-item.vue'
import categoryComp from './components/category.vue'

const project = namespace('modules/project')

@Component({
  components: { listItem, categoryComp },
  async asyncData({ app, store }) {
    return Promise.all([
      store.dispatch('modules/project/fetchList', true),
      store.dispatch('modules/project/fetchCategory'),
    ])
  },
  layout: 'index',
})
export default class Projects extends Vue {
  @project.State
  projects: Project[]

  @project.State
  index: number

  @project.State
  size: number

  @project.State
  total: number

  @project.State
  listLoading: boolean

  @project.Getter
  loadListAbled: boolean

  @project.Action
  fetchList: ActionMethod

  @project.State
  categories: Category[]

  @project.State
  currentCategory: number

  @project.Mutation('M_SET_CURRENTCATEGORY')
  setCurrentCategory: ActionMethod

  @project.Action
  fetchCategory: ActionMethod

  more() {
    this.fetchList(false)
  }

  @Catch
  @Loading
  async selectCategory(categoryId: number) {
    this.setCurrentCategory(categoryId)
    await this.fetchList(true)
  }

  detail(id: number) {
    this.$router.push({ name: 'project-id', params: { id: String(id) } })
  }
}
</script>

<style lang="less" scoped>
.project-list {
  max-width: 1100px;
  margin: 0 auto;
  min-height: 100vh;
  .list {
    min-height: 300px;
    padding: 30px 0;
  }
  .project-item{
    width:33.3%;
    float:left;
    padding:0 15px;
  }
  .more,
  .loading {
    height: 40px;
    line-height: 40px;
    width: 300px;
    background: #ffe082;
    text-align: center;
    margin: 10px auto;
    border-radius: 20px;
  }
  .more {
    cursor: pointer;
  }
}
@media (max-width: 650px) {
  .project-list {
    .list {
      padding: 20px;
    }
    .more,
    .loading {
      width: 60%;
      height: 30px;
      line-height: 30px;
    }
  }
}
</style>
