<!-- @format -->

<template>
  <div class="navBar">
    <div class="navBar-content">
      <img
        class="logo"
        src="http://cdn.zhouzhoujiang.com/blog/logo-front.png"
        @click="home"
      />
      <div class="menu-wrap">
        <div class="contact">
          <span
            class="icon iconfont"
            v-for="(item, index) in contacts"
            :key="index"
            :class="[item.icon]"
            @click="goLink(item.url)"
          ></span>
        </div>
        <div class="menu">
          <div
            class="menu-item"
            :class="{ active: item.path === activeMenu }"
            v-for="(item, index) in routes"
            :key="index"
          >
            <router-link :to="item.path">{{ item.title }}</router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="menu-mobile-icon" @click="drawer = true">
      <span class="middle"></span>
    </div>
    <el-drawer :visible.sync="drawer" direction="rtl">
      <div class="menu-mobile">
        <div
          class="menu-item"
          :class="{ active: item.path === activeMenu }"
          v-for="(item, index) in routes"
          :key="index"
        >
          <router-link :to="item.path">{{ item.title }}</router-link>
        </div>
      </div>
    </el-drawer>
  </div>
</template>
<script lang="ts">
/** @format */

import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class NavBar extends Vue {
  routes: any = [
    {
      path: '/article/list',
      title: '文章',
    },
    {
      path: '/project/list',
      title: '项目',
    },
  ]
  drawer: boolean = false
  contacts: any = [
    {
      icon: 'icon-github',
      url: 'https://github.com/zhjlydia',
    },
    {
      icon: 'icon-juejin',
      url: 'https://juejin.cn/user/4142615541842248',
    },
    {
      icon: 'icon-yuque-fill',
      url: 'https://www.yuque.com/zhouhuijuan-44lqs',
    },
  ]
  get activeMenu() {
    const route = this.$route
    const { meta, path } = route
    return path
  }
  goLink(url: string) {
    window.open(url)
  }
  home() {
    this.$router.replace({
      name: 'home',
    })
  }
}
</script>
<style lang="less" scoped>
/** @format */

.navBar {
  padding: 30px 0;
  font-size: 26px;
  overflow: hidden;
  z-index: 10;
  background: #f4f4f4;
  color: #333;
  .navBar-content {
    max-width: 1200px;
    margin: 0 auto;
    .menu-wrap {
      display: flex;
      justify-content: space-between;
      margin-top: 10px;
    }
    .contact {
      padding: 0 5px;
      .icon {
        width: 20px;
        height: 20px;
        margin: 0 5px;
        color: #666;
        cursor: pointer;
      }
    }
  }
  .logo {
    width: 140px;
    height: auto;
    cursor: pointer;
    vertical-align: middle;
  }
  .menu-mobile-icon {
    display: none;
    position: relative;
    width: 20px;
    height: 16px;
    right: 10px;
    .middle,
    &::before,
    &::after {
      position: absolute;
      width: 20px;
      height: 2px;
      left: 0;
      background: #313131;
      border-radius: 2px;
    }
    .middle {
      top: 50%;
      margin-top: -1px;
    }
    &:before {
      content: '';
      top: 0;
    }
    &:after {
      content: '';
      bottom: 0;
    }
  }
  .menu-item {
    height: 25px;
    line-height: 25px;
    font-size: 16px;
    display: inline-block;
    padding: 0 20px;
    position: relative;
    font-weight: bold;
    a {
      color: #333;
      position: relative;
      z-index: 1;
    }
    &.active:before {
      content: '';
      box-sizing: border-box;
      position: absolute;
      height: 6px;
      background: #ffe082;
      left: 5px;
      right: 5px;
      bottom: 5px;
      z-index: 0;
      border-radius: 3px;
    }
  }
}
@media (max-width: 650px) {
  .navBar {
    padding: 0 10px;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .navBar-content {
      .menu-wrap {
        display: none;
      }
    }

    .menu-mobile-icon {
      display: block;
    }
    .logo {
      width: 85px;
    }
  }
}
</style>
