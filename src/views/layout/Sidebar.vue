<template>
    <el-menu default-active="1-4-1" style="width:100%" :collapse="!sidebar.opened" theme="dark">
      <template v-for="cat in disignMenus">
        <el-submenu :index="cat.design_cat_id">
          <template slot="title">
              <philm-icon :icon="cat.icon"></philm-icon>&nbsp;&nbsp;<span slot="title">{{cat.name}}</span>
          </template>
          <router-link v-for="design in cat.designs" :key="design.design_id" class="title-link" :to="'/stat/'+design.design_id">
            <el-menu-item :index="'/stat/'+design.design_id">
              <span slot="title">{{design.name}}</span>
            </el-menu-item>
          </router-link>
        </el-submenu>
      </template>

      <template v-for="item in permissionRoutes" v-if="!item.hidden">
          <el-submenu :index="item.name" v-if="!item.noDropdown">
            <template slot="title">
              <philm-icon :icon="item.icon"></philm-icon>&nbsp;&nbsp;<span slot="title">{{item.name}}</span>
            </template>
            <router-link v-for="child in item.children" :key="child.path" v-if="!child.hidden" class="title-link" :to="item.path+'/'+child.path">
              <el-menu-item :index="item.path+'/'+child.path">
                {{child.name}}
              </el-menu-item>
            </router-link>
          </el-submenu>
          <router-link v-if="item.noDropdown&&item.children.length>0" :to="item.path+'/'+item.children[0].path">
            <el-menu-item :index="item.path+'/'+item.children[0].path">
              {{item.children[0].name}}
            </el-menu-item>
          </router-link>
        </template>

    </el-menu>

  <!-- <el-menu mode="vertical" default-active="1-4-1" @open="handleOpen" @close="handleClose" :collapse="isCollapse"
    :default-active="$route.path">

    <template v-for="cat in disignMenus">
      <el-submenu :index="cat.design_cat_id">
        <template slot="title">
          <philm-icon :icon="cat.icon || search"></philm-icon> {{cat.name}}
        </template>
        <router-link v-for="design in cat.designs" :key="design.design_id" class="title-link" :to="'/stat/'+design.design_id">
          <el-menu-item :index="'/stat/'+design.design_id">
            {{design.name}}
          </el-menu-item>
        </router-link>
      </el-submenu>
    </template>

    <template v-for="item in permissionRoutes" v-if="!item.hidden">
      <el-submenu :index="item.name" v-if="!item.noDropdown">
        <template slot="title">
          <wscn-icon-svg :icon-class="item.icon||'wenzhang1'" /> {{item.name}}
        </template>
        <router-link v-for="child in item.children" :key="child.path" v-if="!child.hidden" class="title-link" :to="item.path+'/'+child.path">
          <el-menu-item :index="item.path+'/'+child.path">
            {{child.name}}
          </el-menu-item>
        </router-link>
      </el-submenu>
      <router-link v-if="item.noDropdown&&item.children.length>0" :to="item.path+'/'+item.children[0].path">
        <el-menu-item :index="item.path+'/'+item.children[0].path">
          <wscn-icon-svg :icon-class="item.icon||'geren1'" /> {{item.children[0].name}}
        </el-menu-item>
      </router-link>
    </template>
  </el-menu> -->
</template>

<script>
  import permissionRoutes from 'store/permission';
  import PhilmIcon from "../../components/Icon-svg/philm-icon";
  import { getMenus } from 'api/stat';

  export default {
    name: 'Sidebar',
    data() {
      return {
        permissionRoutes: permissionRoutes.get(),
        disignMenus: [],
        isCollapse: true
      }
    },
    components: {
        PhilmIcon,
    },
    computed: {
      sidebar() {
        return this.$store.state.app.sidebar;
      },
    },
    created() {
      getMenus().then(response => {
        this.disignMenus = response.data;
      });
    }
  }

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .el-menu {
    min-height: 100%;
  }

  .wscn-icon {
    margin-right: 10px;
  }

  .hideSidebar .title-link {
    display: inline-block;
    padding-left: 10px;
  }
</style>
