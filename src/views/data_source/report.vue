<template>
  <div>


    <div class="card-container infos">
        <div class="lever">类型：</div>
        <div>{{info.type || ''}}</div>
        <div class="lever">表达式：</div>
        <div>{{info.id || ''}}</div>
        <div class="lever">名称：</div>
        <div>{{info.name || ''}}</div>

        <div class="lever">开始时间：</div>
        <div>{{info.fastDataDate || ''}}</div>
        <div class="lever">参数：</div>
        <div>{{info.argvName || '无'}}</div>
        <div class="lever">列：</div>
        <div>
          {{info.hasEventCount ? '次数' : '无'}} / {{info.hasDeviceCount ? '人数' : '无'}} / {{info.hasValue1 ? '值' : '无'}}
        </div>

        <div class="lever">数据：</div>
        <div>
          {{info.hasDayData ? '天' : '无'}} / {{info.hasHourData ? '小时' : '无'}} / {{info.hasArgvData ? '参数' : '无'}} / {{info.hasABTestData ? 'ABTest' : '无'}}
        </div>
        <p style="clear: both;"></p>
    </div>
    <div style="clear: both;"></div>

    <div class="card-container">
      <el-row :gutter="5" style="margin-bottom: 20px;">
        <el-col :md="5" v-if="useSearch.date">
          <date v-model="search.date" :onlyStartDate="search.dateOnlyStartDate"></date>
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

    <el-table :data="list" v-loading.body="listLoading" border element-loading-text="拼命加载中" sortable stripe :max-height="windowHeight-50" highlight-current-row :show-summary="true" :default-sort="{prop: 'key', order: 'descending'}">
      <el-table-column prop="key" :label="groupByName" :sortable="true" fixed width="100"></el-table-column>
      <!--<el-table-column v-for="col in this.cols" prop="key" :label="col.name"></el-table-column>-->
      <el-table-column :key='cols' align="right" v-for='(col,index) in cols' :prop="col.id" :label="col.name" :width="(col.name.length>3 ? col.name.length : 3)*14+16+24" :sortable="true">
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

    <el-table :data="list" v-loading.body="listLoading" border element-loading-text="拼命加载中" sortable stripe :max-height="windowHeight-50" highlight-current-row :show-summary="true" style="width:100%" :default-sort="{prop: 'key', order: 'descending'}">

    </el-table>
  </div>
</template>
<script>
import { getSourceInfo, getSourceCol } from 'api/stat';
import lineMarker from 'components/Charts/lineMarker';
import Versions from '../stat/versions.vue';
import Channels from '../stat/channels.vue';
import Date from '../stat/date.vue';
import moment from 'moment';
import Platforms from '../stat/platforms.vue';
import New_old from '../stat/new_old.vue';
import Countrys from '../stat/countrys.vue';
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
  info: {},
  data() {
    return {
      list: [],
      cols: [],

      info: {},

      type: '',
      id: '',

      listLoading: true,

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
        dateOnlyStartDate: true,
        date: [
          moment().add(-30, 'days').toDate(),
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
    this.type = this.$route.params.type;
    this.id = this.$route.params.id;
    this.groupBy = this.$route.params.group ? this.$route.params.group : 'stat_time';

    let groupNames = {
      'stat_time': '日期',
      'hour': '小时',
      'channel': '渠道',
      'version': '版本',
      'country': '国家',
      'test_item-test_group': 'AB Test',
    };
    this.groupByName = groupNames[this.groupBy];

    if(this.groupBy==='stat_time'){
      this.search.dateOnlyStartDate = false;
    }else{
      this.search.dateOnlyStartDate = true;
    }

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

      this.cols = [];
      this.list = [];

      getSourceInfo(this.type, this.id).then(response => {
        this.info = response.data;

        this.$store.dispatch('setPageInfo', {
          title: `${this.info.name} - ${this.groupByName}`,
          desc: this.info.desc,
          type: this.info.type,
          breadcrumb: [
            { name: '首页', to: '/' },
            { name: '数据源' },
            { name: '报表' }
          ]
        });

        let promises = [];
        if (this.info['hasEventCount']) {
          promises.push(getSourceCol(this.type, this.id, 'event_count', this.groupBy).then(response => {
            return {
              col: {
                'id': 'eventCount',
                'name': '次数',
              },
              data: response.data
            };
          }));
        }

        if (this.info['hasDeviceCount']) {
          promises.push(getSourceCol(this.type, this.id, 'device_count', this.groupBy).then(response => {
            return {
              col: {
                'id': 'deviceCount',
                'name': '人数',
              },
              data: response.data
            };
          }));
        }

        if (this.info['hasValue1']) {
          promises.push(getSourceCol(this.type, this.id, 'value1', this.groupBy).then(response => {
            return {
              col: {
                'id': 'value1',
                'name': '值',
              },
              data: response.data
            };
          }));
        }

        Promise.all(promises).then(response => {
          lodash(response).forEach(t => {
            this.addCol(t.col, t.data);
          });

          this.initChart();
        });

        this.listLoading = false;

      });

      // getData(this.reportId, this.search, this.groupBy).then(response => {
      //   console.log(response.data);

      //   this.cols = response.data.items;
      //   this.list = response.data.data;

      //   setTimeout(() => {
      //     let legend = [];
      //     let series = [];
      //     for (let i = 0; i < this.cols.length; i++) {
      //       let col = this.cols[i];
      //       legend.push(col.name);

      //       series.push({
      //         name: col.name,
      //         type: 'line',
      //         stack: '总量',
      //         areaStyle: { normal: {} },
      //         data: lodash.map(this.list, col.report_item_id)
      //       });

      //       if (i > 5) {
      //         break;
      //       }
      //     }


      //     this.chart.legend.data = legend;
      //     this.chart.series = series;

      //     let xAxis = [];
      //     for (let i = 0; i < this.list.length; i++) {
      //       xAxis.push(this.list[i]['key']);
      //     }
      //     this.chart.xAxis[0].data = xAxis;

      //     this.$refs.chart.$emit('init');
      //   }, 1000);


      //   this.listLoading = false;
      // });
    },
    addCol(colInfo, data) {
      this.cols.push(colInfo);
      lodash(data).forEach((value, key) => {
        let t = lodash(this.list).find({ key: key });
        if (t) {
          t[colInfo.id] = value;
        } else {
          t = {
            key: key
          };
          t[colInfo.id] = value;
          this.list.push(t);
        }
      });
    },
    initChart() {
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
            data: lodash.map(this.list, col.id)
          });

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
    },
    changeGroupBy(groupBy, value) {
      this.groupBy = groupBy;

      this.$router.push({
        path: `/data_source/report/${this.type}/${this.id}/${groupBy}`
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    }
  }
};

</script>

<style type="text/scss" rel="stylesheet/scss" lang="scss" scoped>
.infos {
  background: #FFF;
  display: block;
  padding-bottom: 20px;

  div {
    height: 30px;
    line-height: 30px;
    width: 23%;
    float: left;
    display: block;

    &.lever{
      width: 10%;
      font-weight: bold;
    }

    :first-child {
      font-weight: bold;
    }


  }
}
</style>
