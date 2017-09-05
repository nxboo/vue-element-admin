<template>
  <div>

    <div class="card-container">
      <el-row :gutter="20" style="margin-bottom: 20px;">

        <el-col :md="6">
          <el-input style="width: 100%" placeholder="名称" v-model="keyword"></el-input>
        </el-col>

        <el-col :md="3">
          <el-button type="primary" style="width: 100%" @click="search">
            <philm-icon icon="search" size="small"></philm-icon>&nbsp;&nbsp;搜索
          </el-button>
        </el-col>

      </el-row>
    </div>

    <el-table :data="list" v-loading.body="listLoading" :default-sort="{prop: 'seq', order: 'descending'}" element-loading-text="加载中" stripe highlight-current-row sortable>

      <el-table-column label="ID" :sortable="true" prop="cat_id" width="80"></el-table-column>
      <el-table-column label="名称" prop="name">
        <template scope="scope">
          <span><philm-icon :icon="scope.row.icon"></philm-icon>{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column label="添加人" width="120" prop="staff_name"></el-table-column>
      <el-table-column label="添加时间" :sortable="true" width="150" prop="create_time"></el-table-column>
      <el-table-column label="序号" :sortable="true" width="80" prop="seq"></el-table-column>

      <el-table-column :render-header="addOption" align="center" prop="created_at" label="操作" width="180">
        <template scope="scope">

          <el-tooltip class="item" effect="dark" content="修改" placement="top">
            <el-button type="info" :plain="true" class="philm-option" @click="edit(scope.row.cat_id)">
              <philm-icon icon="pencil2"></philm-icon>
            </el-button>
          </el-tooltip>

          <el-tooltip class="item" effect="dark" content="删除" placement="top">
            <el-button type="danger" :plain="true" class="philm-option" @click="del(scope.row.cat_id)">
              <philm-icon icon="bin"></philm-icon>
            </el-button>
          </el-tooltip>

        </template>
      </el-table-column>
    </el-table>

  </div>
</template>
<script>
import { catList, catInfo, catEdit, catDelete } from '../../api/report';
import lodash from 'lodash';

export default {
  name: 'reportList',
  data() {
    return {
      list: null,
      listData: null,
      listLoading: true,

      keyword: ''
    }
  },
  created() {
    this.$store.dispatch('setPageInfo', {
      title: '分类管理',
      options: [{
        'com': 'el-button',
        'type': 'primary',
        'text': '添加分类',
        'icon': 'plus',
        'click': function() {
          this.$router.push('/report/cat/edit');
        }.bind(this),
      }]
    });
    this.fetchData();
  },
  methods: {

    fetchData() {
      this.listLoading = true;
      catList(this.keyword).then(response => {
        this.list = response.data;
        this.listLoading = false;
      });
    },
    search() {
      this.fetchData();
    },
    edit(catId) {
      this.$router.push('cat/edit/' + catId);
    },
    del(catId) {
      this.$confirm('删除将不能恢复，您是否确认删除？', '确认', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        catDelete(catId).then(response => {
          if (response.code == 0) {
            this.list = lodash.filter(this.list, row => {
              return row.cat_id !== catId;
            });
          }
        });
      }).catch(() => {

      });
    }
  }
};

</script>
