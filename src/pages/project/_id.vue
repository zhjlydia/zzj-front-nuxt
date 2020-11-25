<template>
  <div class="project-detail">
    <div v-if="projectDetail" class="project-content">
      <breadcrumb :item="breadcrumbItem">
        <span class="mar-l-5 mar-r-5">/</span>
        {{ projectDetail.category.title }}
        <span class="mar-l-5 mar-r-5">/</span>
        {{ projectDetail.title }}</breadcrumb
      >
      <div
        class="project-image"
        :style="{ 'background-image': 'url(' + projectDetail.image + ')' }"
      ></div>
      <div class="detail-body">
        <div class="project-header">
          <div>
            <div class="title">{{ projectDetail.title }}</div>
            <tag-component
              v-for="(item, index) in projectDetail.tags"
              :key="index"
              :color="getColor(item.id)"
              :selected="true"
              >{{ item.content }}</tag-component
            >
          </div>
          <div class="time">
            <div>
              {{ projectDetail.createdAt }}
            </div>
          </div>
        </div>
        <div
          v-hljs-directive
          class="content project__content"
          v-html="projectDetail.content"
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

import Project from '@/model/project'
import Category from '@/model/category'
import Tag from '@/model/tag'
import { BreadcrumbItem } from '@/model/common'

import { COLOR_ARRAY } from '@/common/constant'
import { Loading, Catch } from '@/decorators'

const project = namespace('modules/project')
const category = namespace('modules/category')
const tag = namespace('modules/tag')

@Component({
  components: { TagComponent, Breadcrumb },
  async asyncData({ app, store, route }) {
    const { id = 0 } = route.params
    const projectId = Number(id)
    if (projectId) {
      store.commit('modules/project/M_SET_ID', projectId)
      return store.dispatch('modules/project/fetchDetail')
    }
  },
  directives: { hljsDirective },
  layout: 'detail',
})
export default class ProjectDetail extends Vue {
  @project.State
  projectDetail: Project

  @project.State
  id: number

  @project.Action('fetchDetail')
  fetchProjectDetail: ActionMethod

  @project.Action
  resetProjectDetail: ActionMethod

  breadcrumbItem: BreadcrumbItem = {
    routerName: 'project-list',
    name: '文章',
  }

  getColor(id: number) {
    const index = id % COLOR_ARRAY.length
    return COLOR_ARRAY[index]
  }

  destroyed() {
    this.resetProjectDetail()
  }
}
</script>
<style lang="less" scoped>
.project-detail {
  padding-top: 85px;
  .project-content {
    position: relative;
    width: 1200px;
    padding: 400px 30px 30px 30px;
    background: #fff;
    box-shadow: 0 2px 13px 0 rgba(0, 0, 0, 0.06);
    margin: 0 auto;
    .project-image {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 400px;
      z-index: 1;
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
    }
    .detail-body {
      position: relative;
      z-index: 2;
      margin: 0 auto;
      overflow: hidden;
      border: 1px solid #eee;
    }
    .project-header {
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
  .project-content {
    width: 100%;
    padding: 150px 0 0 0;
    .project-image {
      height: 200px;
      border-radius: 0;
    }
    .project-header {
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
