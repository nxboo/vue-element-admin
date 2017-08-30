<template>
  <div>


    <div class="card-container">
      <el-row :gutter="20" style="margin-bottom: 20px;">
        <!--<el-col :md="4">-->
        <!--<el-date-picker-->
        <!--style="width: 100%"-->
        <!--v-model="value"-->
        <!--type="daterange"-->
        <!--align="right"-->
        <!--range-separator=" ~ "-->
        <!--placeholder="选择日期范围"-->
        <!--:picker-options="datePicker">-->
        <!--</el-date-picker>-->
        <!--</el-col>-->
        <el-col :md="4">
          <el-select v-model="category" style="width: 100%" clearable filterable placeholder="请选择类别">
            <el-option v-for="(name, key) in categoryOptions" :key="key" :label="name" :value="key">
            </el-option>
          </el-select>
        </el-col>

        <el-col :md="4">
          <el-select v-model="versionIos" style="width: 100%" clearable filterable placeholder="请选择Android版本">
            <el-option v-for="(name, key) in versionIosOptions" :key="key" :label="name" :value="key">
            </el-option>
          </el-select>
        </el-col>

        <el-col :md="4">
          <el-select v-model="versionAndroid" style="width: 100%" clearable filterable placeholder="请选择Ios版本">
            <el-option v-for="(name, key) in versionAndroidOptions" :key="key" :label="name" :value="key">
            </el-option>
          </el-select>
        </el-col>

        <el-col :md="6">
          <el-input style="width: 100%" placeholder="事件编号/名称/注释" v-model="keyword">
          </el-input>
        </el-col>
        <!--<el-col :md="3">-->
        <!--<el-input-number style="width: 100%" v-model="num1" @change="handleChange" :min="1" :max="20"></el-input-number>-->
        <!--</el-col>-->
        <!--<el-col :md="3">-->
        <!--<el-button type="primary" icon="document" @click="handleDownload">-->
        <!--导出excel-->
        <!--</el-button>-->
        <!--</el-col>-->
        <el-col :md="3">
          <el-button type="primary" style="width: 100%" @click="search">
            <philm-icon icon="search" size="small"></philm-icon>&nbsp;&nbsp;搜索
          </el-button>
        </el-col>
      </el-row>
    </div>

    <el-table :data="list" v-loading.body="listLoading" element-loading-text="加载中" stripe highlight-current-row sortable>

      <el-table-column label="事件编号" :sortable="true" prop="cmd" width="120">
      </el-table-column>

      <el-table-column label="类别" width="120" prop="category">
      </el-table-column>

      <el-table-column label="事件名称" width="200">
        <template scope="scope">
          <span>{{scope.row.event_name}}</span>
        </template>
      </el-table-column>

      <el-table-column label="Android版本" prop="version_android" width="140">
      </el-table-column>

      <el-table-column label="Ios版本" width="120" prop="version_ios">
      </el-table-column>

      <el-table-column label="注释">
        <template scope="scope">
          {{scope.row.event_desc}}
        </template>
      </el-table-column>

      <el-table-column label="更新时间" sortable width="150" align="right">
        <template scope="scope">
          {{scope.row.modify_time}}
        </template>
      </el-table-column>

      <el-table-column :render-header="addOption" align="center" prop="created_at" label="操作" width="180">
        <template scope="scope">

          <!--<router-link :to="{ path: 'edit/'+scope.row.cmd}">-->
          <!--<el-tooltip class="item" effect="dark" content="修改1" placement="top">-->
          <!--<philm-icon icon="pencil2"></philm-icon>-->
          <!--</el-tooltip>-->
          <!--</router-link>-->

          <el-tooltip class="item" effect="dark" content="数据" placement="top">
              <el-button type="info" :plain="true" class="philm-option" @click="report(scope.row.cmd)">
                <philm-icon icon="tongji3"></philm-icon>
              </el-button>
          </el-tooltip>

          <el-tooltip class="item" effect="dark" content="修改" placement="top">
            <el-button type="info" :plain="true" class="philm-option" @click="edit(scope.row.cmd)">
              <philm-icon icon="pencil2"></philm-icon>
            </el-button>
          </el-tooltip>

          <el-tooltip class="item" effect="dark" content="删除" placement="top">
            <el-button type="danger" :plain="true" class="philm-option" @click="del(scope.row.cmd)">
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
      console.log(this.$refs);
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
