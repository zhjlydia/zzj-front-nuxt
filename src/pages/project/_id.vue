<template>
  <div class="project-detail">
    <template v-if="projectDetail">
      <breadcrumb :item="breadcrumbItem">
        <span class="mar-l-5 mar-r-5">/</span>
        {{ projectDetail.category.title }}
        <span class="mar-l-5 mar-r-5">/</span>
        {{ projectDetail.name }}</breadcrumb
      >
      <div class="banner">
        <div
          class="bg"
          :style="{ 'background-image': 'url(' + projectDetail.image + ')' }"
        ></div>
        <div class="content">
          <div
            class="image"
            :style="{ 'background-image': 'url(' + projectDetail.image + ')' }"
          ></div>
          <div class="info">
            <div class="name">
              {{ projectDetail.name }}
            </div>
            <div class="description">{{ projectDetail.description }}</div>
            <tag-component
              v-for="(item, index) in projectDetail.tags"
              :key="index"
              :color="getColor(item.id)"
              :selected="true"
              >{{ item.content }}
            </tag-component>
          </div>
        </div>
      </div>
      <div class="detail-body">
        <div
          v-hljs-directive
          class="project__content"
          v-html="projectDetail.content"
        ></div>
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
    name: '项目',
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
  padding-top: 60px;
  .banner {
    height: 500px;
    width: 100%;
    position: relative;
    .bg {
      z-index: 1;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
      opacity: 0.4;
      background-position: 50%;
      background-size: cover;
      -webkit-box-shadow: 0 -40px 30px 40px #fff inset;
      box-shadow: inset 0 -40px 30px 40px #fff;
      -webkit-filter: blur(6px);
      filter: blur(6px);
      -webkit-transform: scale(1.3);
      transform: scale(1.3);
    }
    .content {
      width: 1200px;
      margin: 0 auto;
      height: 100%;
      position: relative;
      z-index: 2;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .image {
        width: 600px;
        height: 300px;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
        border-radius: 10px;
      }
      .info {
        width: 600px;
        padding: 30px 80px;
        .name {
          font-size: 24px;
          margin-bottom: 20px;
        }
        .description {
          font-size: 16px;
          margin-bottom: 20px;
        }
      }
    }
  }

  .detail-body {
    position: relative;
    width: 1200px;
    padding: 30px;
    background: #fff;
    box-shadow: 0 2px 13px 0 rgba(0, 0, 0, 0.06);
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
