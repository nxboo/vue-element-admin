<template>
  <div>


    <div class="card-container">
      <el-row :gutter="20" style="margin-bottom: 20px;">

        <el-col :md="6">
          <el-input style="width: 100%" placeholder="名称" v-model="keyword">
          </el-input>
        </el-col>

        <el-col :md="3">
          <el-button type="primary" style="width: 100%" @click="search">
            <philm-icon icon="search" size="small"></philm-icon>&nbsp;&nbsp;搜索
          </el-button>
        </el-col>

      </el-row>
    </div>

    <el-table :data="list" v-loading.body="listLoading" element-loading-text="加载中" stripe highlight-current-row sortable>

      <el-table-column label="ID" :sortable="true" prop="cat_id" width="80"></el-table-column>
      <el-table-column label="名称" prop="name"></el-table-column>
      <el-table-column label="添加人" width="120" prop="staff_name"></el-table-column>
      <el-table-column label="添加时间" width="120" prop="create_time"></el-table-column>
      <el-table-column label="序号" width="120" prop="seq"></el-table-column>

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
  import { view, getIosVersions, getAndroidVersions, getCategorys, del } from 'api/dict_event';
  import LineChart from "../../components/Charts/line";
  import lineMarker from 'components/Charts/lineMarker';
  import PhilmIcon from "../../components/Icon-svg/philm-icon";
  import lodash from 'lodash';
  //    import taffy from 'taffy';
  export default {
    name: 'view',
    components: {
      PhilmIcon,
      lineMarker
    },
    db: null,
    data() {
      return {
        visible2: false,

        list: null,
        listData: null,
        listLoading: true,

        keyword: '',
        versionIos: '',
        versionIosOptions: {},
        versionAndroid: '',
        versionAndroidOptions: {},
        category: '',
        categoryOptions: {},

      }
    },
    created() {
      this.$store.dispatch('setPageInfo', {
        title: '埋点管理',
        options:[{
          'com': 'el-button',
          'type': 'primary',
          'text': '添加埋点',
          'icon': 'plus',
          'click': function(){
            this.$router.push('/dict_event/edit');
          }.bind(this),
        }]
      });
      this.fetchData();
    },
    methods: {

      fetchData() {
        this.listLoading = true;
        view(this.keyword, this.category, this.versionIos, this.versionAndroid).then(response => {
          this.listData = this.list = response.data;
          console.log(this.list);

          //                    this.db = taffy(this.list);

          //                    console.log(this.db.get('category'));
          //
          //                    this.categoryOptions = lodash.map(lodash.uniq(lodash.map(this.list, function (value) {
          //                        return value.category
          //                    })), function (value) {
          //                        return {
          //                            text: value,
          //                            value: value
          //                        }
          //                    });
          //
          //                    this.versionAndroids = lodash.map(lodash.uniq(lodash.map(this.list, function (value) {
          //                        return value.version_android
          //                    })), function (value) {
          //                        return {
          //                            text: value,
          //                            value: value
          //                        }
          //                    });
          //
          //                    this.versionIoss = lodash.map(lodash.uniq(lodash.map(this.list, function (value) {
          //                        return value.version_ios
          //                    })), function (value) {
          //                        return {
          //                            text: value,
          //                            value: value
          //                        }
          //                    });

          this.listLoading = false;
        });

        getAndroidVersions().then(response => {
          this.versionAndroidOptions = response.data;
        });

        getIosVersions().then(response => {
          this.versionIosOptions = response.data;
        });

        getCategorys().then(response => {
          this.categoryOptions = response.data;
          console.log(response);
        });
      },
      handleDownload() {
        require.ensure([], () => {
          const { export_json_to_excel } = require('vendor/Export2Excel');
          const tHeader = ['序号', '文章标题', '作者', '阅读数', '发布时间'];
          const filterVal = ['id', 'title', 'author', 'pageviews', 'display_time'];
          const list = this.list;
          const data = this.formatJson(filterVal, list);
          export_json_to_excel(tHeader, data, '列表excel');
        })
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
      },
      search() {
        this.fetchData();
      },
      report(cmd) {
        this.$router.push('/data_source/report/cmd/' + cmd);
      },
      edit(cmd) {
        this.$router.push('edit/' + cmd);
      },
      del(cmd) {
        this.$confirm('删除将不能恢复，您是否确认删除？', '确认', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          del(cmd).then(response => {
            if (response.code == 0) {
              this.list = lodash.filter(this.list, row => {
                return row.cmd !== cmd;
              });
            }
          });
        }).catch(() => {

        });
      }
    }
  };

</script>
