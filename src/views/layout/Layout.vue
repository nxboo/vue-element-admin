<template>
  <div class="app-wrapper" :class="{hideSidebar:!sidebar.opened}">
    <div class="sidebar-wrapper">
      <Sidebar class="sidebar-container" />
    </div>
    <div class="main-container">
      <Navbar/>
      <div class="top" v-if="!this.$route.matched[0].meta.hideLevelbar">
        <levelbar></levelbar>
      </div>
      <App-main/>
    </div>
    <div class="right-wrapper" :class="{hide:layout.rightPanel==''}">
      <Msg v-if="layout.rightPanel=='Msg'" />
      <Setting v-if="layout.rightPanel=='Setting'" />
      <UserInfo v-if="layout.rightPanel=='UserInfo'" />
    </div>
  </div>
</template>

<script>
  import { Navbar, Sidebar, AppMain, Setting, Msg, UserInfo } from 'views/layout';
  import Levelbar from './Levelbar';
  import store from 'store';
  import router from 'router';
  import permission from 'store/permission';
  // import { Loading } from 'element-ui';
  // let loadingInstance;
  export default {
    name: 'layout',
    components: {
      Navbar,
      Sidebar,
      AppMain,
      Setting,
      Msg,
      UserInfo,
      Levelbar
    },
    computed: {
      sidebar() {
        return this.$store.state.app.sidebar;
      },
      layout() {
        return this.$store.state.app.layout;
      }
    },
    mounted() {
    },
    beforeRouteEnter: (to, from, next) => {
      const roles = store.getters.roles;
      if (roles.length !== 0) {
        next();
        return
      }

      // loadingInstance = Loading.service({ fullscreen: true, text: '玩命加载中' });
      store.dispatch('GetInfo').then(() => {
        permission.init({
          roles: store.getters.roles,
          router: router.options.routes
        });
        //   loadingInstance.close();
        next();
      }).catch(err => {
        //   loadingInstance.close();
        console.log(err);
      });
    }
  }

</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    padding-left: 220px;
    &.hideSidebar {
      padding-left: 40px;
      .sidebar-wrapper {
        transform: translate(-180px, 0);
        .sidebar-container {
          transform: translate(172px, 0);
        }
        &:hover {
          transform: translate(0, 0);
          z-index: 1001;
          .sidebar-container {
            transform: translate(0, 0);
          }
        }
      }
    }
    .sidebar-wrapper {
      width: 220px;
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      z-index: 2;
      overflow-x: hidden;
      transition: all .28s ease-out;
      @include scrollBar;
    }
    .sidebar-container {
      transition: all .28s ease-out;
    }
    .main-container {
      width: 100%;
      min-height: 100%;
      transition: all .28s ease-out;

      h1 {
        font-size: 3em;
        margin: 0 .2em .2em .2em;
      }
    }
  }

  .right-wrapper {
    background: #324157;
    width: 360px;
    position: fixed;
    top: 50px;
    bottom: 0;
    right: 0;
    z-index: 1000000;
    overflow-x: hidden;
    transition: all .28s ease-out;
    @include scrollBar;
  }

  .hide {
    display: none;
  }
</style>
