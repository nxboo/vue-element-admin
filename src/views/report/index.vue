<template>
  <div>

    <div class="card-container">
      <el-row :gutter="20" style="width:100%">
        <el-col :md="4">
            <el-select v-model="catId" placeholder="请选择分类">
              <el-option
                v-for="cat in catList"
                :key="cat.cat_id"
                :label="cat.name"
                :value="cat.cat_id">
                <philm-icon :icon="cat.icon"></philm-icon> {{cat.name}}
              </el-option>
            </el-select>
        </el-col>
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
      <el-table-column label="" width="100" prop="cat_name">
        <template scope="scope">

          <el-tooltip class="item" effect="dark" content="列管理" placement="top">
            <el-button type="info" :plain="true" class="philm-option" @click="edit(scope.row.report_id)">
              <philm-icon icon="menu"></philm-icon>
            </el-button>
          </el-tooltip>

          <el-tooltip class="item" effect="dark" content="添加列" placement="top">
            <el-button type="info" :plain="true" class="philm-option" @click="edit(scope.row.report_id)">
              <philm-icon icon="plus"></philm-icon>
            </el-button>
          </el-tooltip>

        </template>
      </el-table-column>
      <el-table-column label="分类" width="180" prop="cat_name"></el-table-column>
      <el-table-column label="名称">
        <template scope="scope">
          <span><philm-icon :icon="scope.row.icon"></philm-icon>{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column label="序号" :sortable="true" :sort-method="intSort" width="80" prop="seq"></el-table-column>

      <el-table-column :render-header="addOption" align="center" prop="created_at" label="操作" width="180">
        <template scope="scope">

          <el-tooltip class="item" effect="dark" content="复制" placement="top">
            <el-button type="info" :plain="true" class="philm-option" @click="edit(scope.row.report_id)">
              <philm-icon icon="copy"></philm-icon>
            </el-button>
          </el-tooltip>

          <el-tooltip class="item" effect="dark" content="修改" placement="top">
            <el-button type="info" :plain="true" class="philm-option" @click="edit(scope.row.report_id)">
              <philm-icon icon="pencil2"></philm-icon>
            </el-button>
          </el-tooltip>

          <el-tooltip class="item" effect="dark" content="删除" placement="top">
            <el-button type="danger" :plain="true" class="philm-option" @click="del(scope.row.report_id)">
              <philm-icon icon="bin"></philm-icon>
            </el-button>
          </el-tooltip>

        </template>
      </el-table-column>
    </el-table>

  </div>
</template>
<script>
import { catList, reportList, reportDelete } from '../../api/report';
import lodash from 'lodash';

export default {
  name: 'reportList',
  data() {
    return {
      list: null,
      listData: null,
      listLoading: true,

      keyword: '',
      catId: '',
      catList: []
    }
  },
  created() {
    this.$store.dispatch('setPageInfo', {
      title: '报表管理',
      options: [{
        'com': 'el-button',
        'type': 'primary',
        'text': '添加报表',
        'icon': 'plus',
        'click': function() {
          this.$router.push('/report/edit');
        }.bind(this),
      }]
    });
    this.fetchCats();
    this.fetchData();
  },
  methods: {

    fetchCats(){
      catList(this.keyword).then(response => {
        this.catList = response.data;
      });
    },

    fetchData() {
      this.listLoading = true;
      reportList(this.catId, this.keyword).then(response => {
        this.list = response.data;
        this.listLoading = false;
      });
    },
    search() {
      this.fetchData();
    },
    edit(reportId) {
      this.$router.push('edit/' + reportId);
    },
    del(reportId) {
      this.$confirm('删除将不能恢复，您是否确认删除？', '确认', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        catDelete(reportId).then(response => {
          if (response.code == 0) {
            this.list = lodash.filter(this.list, row => {
              return row.report_id !== reportId;
            });
          }
        });
      }).catch(() => {

      });
    },
    intSort: function(a,b){
      return parseInt(a.seq,10)>parseInt(b.seq,10);
    }
  }
};

</script>
