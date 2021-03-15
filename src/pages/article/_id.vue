<template>
  <div class="article-detail">
    <template v-if="articleDetail">
      <breadcrumb :item="breadcrumbItem">
        <span class="breadcrumb-slider">/</span>
        {{ articleDetail.category.title }}
        <span class="breadcrumb-slider">/</span>
        {{ articleDetail.title }}</breadcrumb
      >
      <div class="article-banner" :style="bannerStyle">
        <img class="article-image" :src="articleDetail.image" alt="" />
      </div>

      <div class="article-content">
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
    </template>
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

  get bannerStyle() {
    if (
      this.articleDetail &&
      this.articleDetail.config &&
      this.articleDetail.config.style &&
      this.articleDetail.config.style.banner
    ) {
      return this.articleDetail.config.style.banner
    }
    return {
      background:
        'linear-gradient( 135deg, rgb(195,44,47) 0%,rgb(61,16,18) 75% )',
    }
  }

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
  .breadcrumb-slider {
    margin: 0 5px;
  }
  .article-banner {
    height: 300px;
    position: relative;
  }
  .article-image {
    width: 450px;
    height: 250px;
    object-fit: cover;
    position: absolute;
    border-radius: 10px;
    left: 50%;
    transform: translateX(-50%);
    top: 90px;
    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.4);
  }
  .article-content {
    max-width: 1200px;
    margin: 0 auto;
    .detail-body {
      background: #fff;
      box-shadow: 0 2px 13px 0 rgba(0, 0, 0, 0.06);
      overflow: hidden;
      border: 1px solid #eee;
    }
    .article-header {
      color: #333;
      padding: 80px 30px 20px 30px;
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
  .article-detail {
    .breadcrumb-slider {
      margin: 0 2px;
    }
    .article-banner {
      height: 250px;
    }
    .article-image {
      width: 250px;
      height: 150px;
      top: 50%;
      margin-top: -75px;
    }
    .article-content {
      width: 100%;
      .content {
        padding: 20px;
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
}
</style>
