<template>
  <div class="levelbar">
    <el-breadcrumb class="app-levelbar" separator="/">
      <el-breadcrumb-item v-for="(item,index) in pageInfo.breadcrumb" :key="item">
        <router-link v-if='!item.to' to="" class="no-redirect">{{item.name}}</router-link>
        <router-link v-else :to="item.to">{{item.name}}</router-link>
      </el-breadcrumb-item>
    </el-breadcrumb>
    <h1>{{pageInfo.title}}</h1>
    <h6 class="waring">{{pageInfo.desc}}</h6>
    <div class="options">

      <div v-for="option in pageInfo.options" @click="option.click" :is="option.com" :type="option.type">
        <span class="svg-container"><philm-icon :icon="option.icon" v-if="option.icon"></philm-icon></span>{{option.text}}
      </div>

    </div>
    <div style="clear:both;"></div>
  </div>
</template>

<script>
export default {
  created() {
    this.setBreadcrumb()
  },
  data() {
    return {
      pageInfo: this.$store.state.app.pageInfo
    }
  },
  computed: {
  },
  methods: {
    setBreadcrumb() {
      let matched = this.$route.matched.filter(item => item.name);
      const first = matched[0];
      if (first && (first.name !== '首页' || first.path !== '')) {
        matched = [{ name: '首页', path: '/' }].concat(matched)
      }

      this.$store.dispatch('setPageInfo', {
        title: matched[matched.length - 1].name,
        breadcrumb: matched
      });
    }
  },
  watch: {
    $route() {
      this.getBreadcrumb();
    }
  }
}

// Vue.component('options', {
//   el: '.options',
//   components: {

//   },
//   data: {
//     items: []
//   },
//   methods: {
//     add(component, text) {
//       this.items.push({
//         'component': component,
//         'text': text,
//       })
//     }
//   }
// })
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.levelbar {
  position: relative;
}

.app-levelbar.el-breadcrumb {
  display: block;
  font-size: 14px;
  line-height: 30px;
  margin: 10px 20px 0 20px;
  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}

h1 {
  display: block;
  font-size: 2.5em;
  margin: 10px 20px 0 20px;
  color: #000;
  font-weight: normal;
  float: left;
}

h6 {
  display: block;
  float: left;
  font-size: 1em;
  font-weight: normal;
  margin-top: 35px;
}

.options {
  position: absolute;
  right: 20px;
  top: 0;
  left: 0;
  text-align: right;
  line-height: 100%;
  height: 100%;
}

.options .el-button {
  margin: 50px 0 0 10px;
}
</style>
