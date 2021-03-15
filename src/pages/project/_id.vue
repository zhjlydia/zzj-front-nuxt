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
        <div class="more-info" v-for="(item, index) in infoItems" :key="index">
          <div
            class="info-item"
            v-for="(sub, subIndex) in item"
            :key="subIndex"
          >
            <div>
              <i class="icon" :class="['el-icon-' + sub.icon]"></i>
              <p class="label">{{ sub.label }}</p>
            </div>
            <div class="value">
              <span class="val">{{ sub.value }}</span>
            </div>
          </div>
        </div>
        <div
          v-hljs-directive
          class="detail-content article__content"
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

  get infoItems() {
    return [
      [
        {
          icon: 'paperclip',
          label: '项目类型',
          type: 'text',
          value: this.projectDetail.category.title,
        },
        {
          icon: 'timer',
          label: '项目状态',
          type: 'text',
          value: this.projectDetail.state,
        },
        {
          icon: 'user',
          label: '我的角色',
          type: 'text',
          value: this.projectDetail.role,
        },
      ],
      [
        {
          icon: 'watch',
          label: '项目时间',
          type: 'text',
          value: `${this.projectDetail.startedAt} 至 ${this.projectDetail.endedAt}`,
        },
        {
          icon: 'office-building',
          label: '仓库地址',
          type: 'text',
          value: this.projectDetail.github,
        },
        {
          icon: 'link',
          label: '预览地址',
          type: 'text',
          value: this.projectDetail.url,
        },
      ],
    ]
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
  overflow: hidden;
  .banner {
    height: 500px;
    width: 100%;
    position: relative;
    .bg {
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
      max-width: 1260px;
      padding: 0 30px;
      margin: 0 auto;
      height: 100%;
      position: relative;
      z-index: 2;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .image {
        width: 50%;
        height: 300px;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
        border-radius: 10px;
      }
      .info {
        width: 50%;
        padding: 30px 50px;

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
    max-width: 1200px;
    background: #fff;
    box-shadow: 0 2px 13px 0 rgba(0, 0, 0, 0.06);
    margin: 0 auto;
    overflow: hidden;
    border: 1px solid #eee;
    .more-info {
      display: flex;
      justify-content: space-around;
      .info-item {
        width: 25%;
        text-align: center;
        position: relative;
        padding: 30px 0;
        &:before {
          content: '';
          height: 1px;
          background: #ddd;
          position: absolute;
          left: 40px;
          right: 40px;
          bottom: 0;
        }
        .icon {
          font-size: 26px;
          margin-bottom: 20px;
        }
        .label {
          font-size: 16px;
          margin-bottom: 20px;
        }
        .value {
          height: 20px;
          font-size: 14px;
          line-height: 20px;
          position: relative;
          display: inline-block;
          .val {
            position: relative;
            z-index: 1;
          }
          &:before {
            content: '';
            width: 6px;
            height: 6px;
            border-radius: 6px;
            background: #ffe082;
            z-index: 0;
            position: absolute;
            left: -12px;
            top: 50%;
            transform: translateY(-50%);
          }
        }
      }
    }
    .detail-content {
      padding: 30px;
    }
  }
}
@media (max-width: 650px) {
  .project-detail {
    .banner {
      height: auto;
      .content {
        display: block;
        padding-top: 30px;
        .image {
          width: 100%;
          height: 200px;
        }
        .info {
          width: 100%;
          .name {
            font-size: 18px;
          }
          .description {
            font-size: 14px;
          }
        }
      }
    }
    .detail-body {
      .more-info {
        display: block;
        .info-item {
          width: 100%;
          padding: 20px 0;
          .icon,
          .label {
            display: inline-block;
            font-size: 14px;
            margin-bottom: 10px;
          }
        }
      }
    }
  }
}
</style>
