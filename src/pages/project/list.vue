<template>
  <div class="project-list main">
    <category-comp
      :items="categories"
      :selected="currentCategory"
      @select="selectCategory"
    ></category-comp>
    <div class="list clearfix">
      <div v-for="(item, index) in projects" :key="index" class="project-item">
        <list-item :item="item" @detail="detail"></list-item>
      </div>
    </div>
    <div v-if="loadListAbled" class="more" @click="more">加载更多</div>
    <div v-if="listLoading" class="loading">
      <i class="el-icon-bicycle mar-r-10"></i>加载中...
    </div>
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
import categoryComp from '@/components/category.vue'

const project = namespace('modules/project')

@Component({
  components: { listItem, categoryComp },
  async asyncData({ app, store }) {
    return Promise.all([
      store.dispatch('modules/project/fetchList', true),
      store.dispatch('modules/project/fetchCategory'),
    ])
  },
  layout: 'list',
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
  max-width: 1200px;
  margin: 0 auto;
  min-height: 100vh;
  .list {
    min-height: 300px;
    background: #fff;
    padding: 30px;
    box-shadow: 0 2px 13px 0 rgba(0, 0, 0, 0.06);
  }
  .project-item {
    width: 32%;
    float: left;
    margin-right: 2%;
    &:nth-child(3n + 3) {
      margin-right: 0;
    }
  }
  .more,
  .loading {
    height: 40px;
    line-height: 40px;
    width: 300px;
    background: #ffe082;
    text-align: center;
    margin: 20px auto 0 auto;
    border-radius: 20px;
  }
  .more {
    cursor: pointer;
  }
}
@media (max-width: 650px) {
  .project-list {
    .project-item {
      width: 100%;
    }
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
