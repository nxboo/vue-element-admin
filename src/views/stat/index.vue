<template>
  <div>


    <div class="card-container">
      <el-row :gutter="5" style="margin-bottom: 20px;">
        <el-col :md="5" v-if="useSearch.date">
          <date v-model="search.date"></date>
        </el-col>
        <el-col :md="2" v-if="useSearch.platform">
          <platforms v-model="search.platform"></platforms>
        </el-col>
        <el-col :md="3" v-if="useSearch.version">
          <versions v-model="search.version"></versions>
        </el-col>
        <el-col :md="3" v-if="useSearch.channel">
          <channels v-model="search.channel"></channels>
        </el-col>
        <el-col :md="3" v-if="useSearch.country">
          <countrys v-model="search.country"></countrys>
        </el-col>
        <el-col :md="2" v-if="useSearch.newOld">
          <new_old v-model="search.newOld"></new_old>
        </el-col>
        <el-col :md="1" v-if="useSearch.ins">
          <el-input style="width: 100%" v-model="search.ins" :min="1" :max="20"></el-input>
        </el-col>

        <el-col :md="3">
          <el-button type="primary" v-waves @click="handleSearch">
            <philm-icon icon="search"></philm-icon>
          </el-button>
          <el-button type="primary" v-waves @click="handleDownload">
            <philm-icon icon="folderdownload"></philm-icon>
          </el-button>
        </el-col>

      </el-row>
    </div>

    <div class="card-container" style="height: 400px">
      <lineMarker ref="chart" height='100%' width='100%' :chartData="chart" style="margin-bottom: 20px" />
    </div>

    <el-table :data="list" v-loading.body="listLoading" border element-loading-text="拼命加载中" sortable stripe :max-height="windowHeight-50"
      highlight-current-row :show-summary="true" :default-sort="{prop: 'key', order: 'descending'}">
      <el-table-column prop="key" :label="groupByName" :sortable="true" fixed width="100"></el-table-column>
      <!--<el-table-column v-for="col in this.cols" prop="key" :label="col.name"></el-table-column>-->
      <el-table-column :key='cols' align="right" v-for='(col,index) in cols' :prop="col.report_item_id" :label="col.name" :width="col.name.length*14+16+24"
        :sortable="true">
      </el-table-column>

      <el-table-column v-if="groupBy=='stat_time'" align="center" prop="created_at" label="操作" width="205">
        <template scope="scope">

          <el-tooltip class="item" effect="dark" content="小时" placement="top">
            <el-button type="info" :plain="true" class="philm-option" @click="changeGroupBy('hour', scope.row.key)">
              <philm-icon icon="clock"></philm-icon>
            </el-button>
          </el-tooltip>

          <el-tooltip class="item" effect="dark" content="渠道" placement="top">
            <el-button type="info" :plain="true" class="philm-option" @click="changeGroupBy('channel', scope.row.key)">
              <philm-icon icon="qudaoguanli2"></philm-icon>
            </el-button>
          </el-tooltip>

          <el-tooltip class="item" effect="dark" content="版本" placement="top">
            <el-button type="info" :plain="true" class="philm-option" @click="changeGroupBy('version', scope.row.key)">
              <philm-icon icon="banben"></philm-icon>
            </el-button>
          </el-tooltip>

          <el-tooltip class="item" effect="dark" content="国家" placement="top">
            <el-button type="info" :plain="true" class="philm-option" @click="changeGroupBy('country', scope.row.key)">
              <philm-icon icon="earth"></philm-icon>
            </el-button>
          </el-tooltip>

          <el-tooltip class="item" effect="dark" content="AB Test" placement="top">
            <el-button type="info" :plain="true" class="philm-option" @click="changeGroupBy('test_item-test_group', scope.row.key)">
              <philm-icon icon="icon"></philm-icon>
            </el-button>
          </el-tooltip>

        </template>
      </el-table-column>

    </el-table>
  </div>
</template>
<script>
  import { getData, getDesign } from 'api/stat';
  import lineMarker from 'components/Charts/lineMarker';
  import Versions from './versions.vue';
  import Channels from './channels.vue';
  import Date from './date.vue';
  import moment from 'moment';
  import Platforms from './platforms.vue';
  import New_old from './new_old.vue';
  import Countrys from './countrys.vue';
  import PhilmIcon from '../../components/Icon-svg/philm-icon.vue';
  import lodash from 'lodash';

  export default {
    components: {
      PhilmIcon,
      Countrys,
      New_old,
      Platforms,
      Channels,
      Versions,
      Date,
      lineMarker
    },
    data() {
      return {
        list: [],
        cols: [],
        listLoading: true,
        reportId: 0,

        groupBy: 'stat_time',
        groupByName: '日期',

        //使用哪些搜索控件
        useSearch: {
          date: true,
          platform: true,
          version: true,
          channel: false,
          country: true,
          newOld: true,
          ins: true
        },

        //搜索控件的值
        search: {
          date: [
            moment().add(-7, 'days').toDate(),
            moment().toDate()
          ],
          platform: '',
          version: [],
          channel: [],
          country: [],
          newOld: '',
          ins: 0
        },
        chart: {
          legend: {
            data: []
          },
          xAxis: [
            {
              type: 'category',
              boundaryGap: false,
              data: []
            }
          ],
          series: []
        },
        windowHeight: 800,
      }
    },
    created() {
      this.reportId = this.$route.params.reportId;
      this.groupBy = this.$route.params.groupBy ? this.$route.params.groupBy :'stat_time';

      let groupNames = {
        'stat_time': '日期',
        'hour':'小时',
        'channel':'渠道',
        'version':'版本',
        'country':'国家',
        'test_item-test_group':'AB Test',
      };
      this.groupByName = groupNames[this.groupBy];

      console.log(this.$route);

      // this.$route.subname = groupNames[this.groupBy];

      this.handleSearch();
      this.windowHeight = window.innerHeight;
    },
    methods: {
      handleDownload() {
        require.ensure([], () => {
          const { export_json_to_excel } = require('vendor/Export2Excel');
          const tHeader = lodash.map(this.cols, 'name');
          tHeader.unshift('日期');
          const filterVal = lodash.map(this.cols, 'report_item_id');;
          filterVal.unshift('key');
          const list = this.list;
          const data = this.formatJson(filterVal, list);
          export_json_to_excel(tHeader, data, this.$route.name);
        })
      },
      handleSearch() {
        this.listLoading = true;

        getData(this.reportId, this.search, this.groupBy).then(response => {
          console.log(response.data);

          this.cols = response.data.items;
          this.list = response.data.data;

          setTimeout(() => {
            let legend = [];
            let series = [];
            for (let i = 0; i < this.cols.length; i++) {
              let col = this.cols[i];
              legend.push(col.name);

              series.push({
                name: col.name,
                type: 'line',
                stack: '总量',
                areaStyle: { normal: {} },
                data: lodash.map(this.list, col.report_item_id)
              });

              if (i > 5) {
                break;
              }
            }


            this.chart.legend.data = legend;
            this.chart.series = series;

            let xAxis = [];
            for (let i = 0; i < this.list.length; i++) {
              xAxis.push(this.list[i]['key']);
            }
            this.chart.xAxis[0].data = xAxis;

            this.$refs.chart.$emit('init');
          }, 1000);


          this.listLoading = false;
        });
      },
      changeGroupBy(groupBy, value) {
        this.groupBy = groupBy;

        this.$router.push({
            path: `/stat/${this.$route.params.reportId}/${groupBy}`
        });
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
      }
    }
  };

</script>
