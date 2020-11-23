<template>
  <div class="article-list main">
    <div class="list">
      <div v-for="(item, index) in articles" :key="index">
        <list-item :item="item" @detail="detail"></list-item>
        <el-divider v-if="index < articles.length - 1"
          ><i class="el-icon-sunrise"></i
        ></el-divider>
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

import Article from '@/model/article'
import Category from '@/model/category'

import { Loading, Catch } from '@/decorators'
import listItem from './components/list-item.vue'
import categoryComp from './components/category.vue'

const article = namespace('modules/article')

@Component({
  components: { listItem, categoryComp },
  async asyncData({ app, store }) {
    return Promise.all([
      store.dispatch('modules/article/fetchList', true),
      store.dispatch('modules/article/fetchCategory'),
    ])
  },
  layout: 'index',
})
export default class Articles extends Vue {
  @article.State
  articles: Article[]

  @article.State
  index: number

  @article.State
  size: number

  @article.State
  total: number

  @article.State
  listLoading: boolean

  @article.Getter
  loadListAbled: boolean

  @article.Action
  fetchList: ActionMethod

  @article.State
  categories: Category[]

  @article.State
  currentCategory: number

  @article.Mutation('M_SET_CURRENTCATEGORY')
  setCurrentCategory: ActionMethod

  @article.Action
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
    this.$router.push({ name: 'article-id', params: { id: String(id) } })
  }
}
</script>

<style lang="less" scoped>
.article-list {
  max-width: 1200px;
  margin: 0 auto;
  min-height: 100vh;
  .list {
    min-height: 300px;
    background: #fff;
    padding: 30px;
    box-shadow: 0 2px 13px 0 rgba(0, 0, 0, 0.06);
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
  .article-list {
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
