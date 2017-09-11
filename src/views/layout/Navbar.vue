<template>
  <el-menu class="navbar" mode="horizontal">

    <Hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></Hamburger>

    <ErrLog v-if="log.length>0" class="errLog-container" :logsList="log"></ErrLog>

    <a class="tool-wrapper" :class="{'active':layout.rightPanel=='UserInfo'}" v-on:click="toggleRightPanel('UserInfo')">
            <img class="user-avatar" :src="baseUrl+userinfo.portrait">
        </a>

    <!--<a class="tool-wrapper" :class="{'active':layout.rightPanel=='Setting'}" v-on:click="toggleRightPanel('Setting')">-->
    <!--<i class="el-icon-setting"></i>-->
    <!--</a>-->

    <a class="tool-wrapper" :class="{'active':layout.rightPanel=='Msg'}" v-on:click="toggleRightPanel('Msg')">
      <el-badge :value="12" class="badge">
        <i class="el-icon-message"></i>
      </el-badge>
    </a>
  </el-menu>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Levelbar from './Levelbar';
  import Hamburger from 'components/Hamburger';
  import ErrLog from 'components/ErrLog';
  import errLogStore from 'store/errLog';
  import PhilmIcon from "../../components/Icon-svg/philm-icon";

  export default {
    components: {
      PhilmIcon,
      Levelbar,
      Hamburger,
      ErrLog
    },

    props: {
    },

    data() {
      return {
        log: errLogStore.state.errLog
      }
    },
    computed: {
      ...mapGetters([
        'sidebar',
        'layout',
        'userinfo',
        'baseUrl'
      ])
    },

    mounted() {
    },
    methods: {
      toggleSideBar() {
        this.$store.dispatch('ToggleSideBar')
      },
      toggleRightPanel(panel) {
        this.$store.dispatch('ToggleRightPanel', panel);
      },
      logout() {
        this.$store.dispatch('LogOut').then(() => {
          this.$router.push({ path: '/login' })
        });
      }
    }
  }

</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .navbar {
    height: 50px;
    line-height: 50px;
    border-radius: 0px !important;

    .tool-wrapper {
      float: right;
      width: 50px;
      height: 50px;
      text-align: center;
      line-height: 50px;
      &:hover {
        color: #FFF;
        background: #324157;
      }
      &.active {
        color: #FFF;
        background: #324157;
      }

      .el-badge {
        display: block;
        margin: 20% 30%;
        width: 40%;
        height: 60%;
        line-height: 30px;
      }



      .user-avatar {
        display: block;
        width: 30px;
        height: 30px;
        margin: 10px auto;
        border-radius: 15px;
        display: block;
      }
    }

    .hamburger-container {
      line-height: 50px;
      height: 50px;
      float: left;
    }
    .errLog-container {
      display: inline-block;
      position: absolute;
      right: 150px;
    }
  }
</style>
