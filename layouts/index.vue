<!-- @format -->

<template>
  <div>
    <nav-bar></nav-bar>
    <app-main />
    <footer-bar />
  </div>
</template>
<script lang="ts">
/** @format */

import {Component, Vue} from 'vue-property-decorator'
import {namespace, State, Action} from 'vuex-class'
import {ActionMethod} from 'vuex'
import navBar from '@/layouts/components/navbar/index.vue'
import appMain from '@/layouts/components/appmain/index.vue'
import footerBar from '@/layouts/components/footerBar/index.vue'
import User from '@/model/user'


const user = namespace('user')

@Component({components: {navBar, appMain, footerBar}})
export default class LayOut extends Vue {
  @user.State
  user: User

  @user.Action
  logout: ActionMethod
  
  async logoutMethod() {
    await this.logout()
    this.$router.replace({name: 'Login'})
  }
}
</script>
