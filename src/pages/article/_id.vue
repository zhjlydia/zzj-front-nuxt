<template>
  <div class="article-detail">
    <div v-if="articleDetail" class="article-content">
      <breadcrumb :item="breadcrumbItem">
        <span class="mar-l-5 mar-r-5">/</span>
        {{ articleDetail.category.title }}
        <span class="mar-l-5 mar-r-5">/</span>
        {{ articleDetail.title }}</breadcrumb
      >
      <div
        class="article-image"
        :style="{ 'background-image': 'url(' + articleDetail.image + ')' }"
      ></div>
      <div class="detail-body">
        <div class="article-header">
          <div>
            <div class="title">{{ articleDetail.title }}</div>
            <tag-component
              v-for="(item, index) in articleDetail.tags"
              :key="index"
              :color="getColor(item.id)"
              :selected="true"
              >{{ item.content }}</tag-component
            >
          </div>
          <div class="time">
            <div>
              {{ articleDetail.createdAt }}
            </div>
          </div>
        </div>
        <div
          v-hljs-directive
          class="content article__content"
          v-html="articleDetail.content"
        ></div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { namespace, State, Action } from 'vuex-class'
import { ActionMethod } from 'vuex'

import { hljsDirective } from '@/directives'
import 'highlight.js/styles/ocean.css'

import TagComponent from '@/components/tag.vue'
import Breadcrumb from '@/components/breadcrumb.vue'

import Article from '@/model/article'
import Category from '@/model/category'
import Tag from '@/model/tag'
import { BreadcrumbItem } from '@/model/common'

import { COLOR_ARRAY } from '@/common/constant'
import { Loading, Catch } from '@/decorators'

const article = namespace('modules/article')
const category = namespace('modules/category')
const tag = namespace('modules/tag')

@Component({
  components: { TagComponent, Breadcrumb },
  async asyncData({ app, store, route }) {
    const { id = 0 } = route.params
    const articleId = Number(id)
    if (articleId) {
      store.commit('modules/article/M_SET_ID', articleId)
      return store.dispatch('modules/article/fetchDetail')
    }
  },
  directives: { hljsDirective },
  layout: 'detail',
})
export default class ArticleDetail extends Vue {
  @article.State
  articleDetail: Article

  @article.State
  id: number

  @article.Action('fetchDetail')
  fetchArticleDetail: ActionMethod

  @article.Action
  resetArticleDetail: ActionMethod

  breadcrumbItem: BreadcrumbItem = {
    routerName: 'article-list',
    name: '文章',
  }

  getColor(id: number) {
    const index = id % COLOR_ARRAY.length
    return COLOR_ARRAY[index]
  }

  destroyed() {
    this.resetArticleDetail()
  }
}
</script>
<style lang="less" scoped>
.article-detail {
  padding-top: 60px;
  .article-content {
    position: relative;
    .article-image {
      height: 400px;
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
    }
    .detail-body {
      position: relative;
      width: 1200px;
      background: #fff;
      box-shadow: 0 2px 13px 0 rgba(0, 0, 0, 0.06);
      margin: -150px auto 0 auto;
      overflow: hidden;
      border-radius: 30px;
      padding: 0 30px 30px;
      border: 1px solid #eee;
    }
    .article-header {
      color: #333;
      padding: 30px;
      display: flex;
      background: #fff;
      justify-content: space-between;
      border-bottom: 1px dashed #c7c5c5;
      .title {
        font-size: 22px;
        font-weight: 600;
        margin-bottom: 15px;
      }
      .time {
        font-size: 14px;
        padding: 10px;
        border: 1px dashed #c7c5c5;
        width: 100px;
        text-align: center;
        font-weight: bold;
        text-align: center;
        display: flex;
        align-items: center;
      }
    }
    .content {
      background: #fff;
      padding: 30px;
    }
  }
}
@media (max-width: 650px) {
  .article-content {
    width: 100%;
    padding: 150px 0 0 0;
    .article-image {
      height: 200px;
      border-radius: 0;
    }
    .article-header {
      padding: 20px;
      .title {
        font-size: 16px;
      }
      .time {
        border: none;
        font-size: 12px;
        width: auto;
        padding: 0;
      }
    }
  }
}
</style>
