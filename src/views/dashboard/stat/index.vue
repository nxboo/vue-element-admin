<template>
  <div class="dashboard-editor-container">

    <el-row :gutter="20" type="flex" justify="end" style="margin-bottom: 20px;">
      <el-col :md="4">
        <el-date-picker style="width: 100%" v-model="date" align="right" range-separator=" ~ " placeholder="选择日期" :picker-options="datePicker">
        </el-date-picker>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="top-card">
      <el-col :md="6" :sm="12">
        <charts-card :number="cardDatas[0]['number']" :xAxis="cardDatas[0]['xAxis']" :data="cardDatas[0]['data']" className="primary" type="line" name="新增用户"></charts-card>
      </el-col>
      <el-col :md="6" :sm="12">
        <charts-card :number="cardDatas[1]['number']" :xAxis="cardDatas[1]['xAxis']" :data="cardDatas[1]['data']" className="danger" name="活跃用户"></charts-card>
      </el-col>
      <el-col :md="6" :sm="12">
        <charts-card :number="cardDatas[2]['number']" :xAxis="cardDatas[2]['xAxis']" :data="cardDatas[2]['data']" className="success" name="启动次数"></charts-card>
      </el-col>
      <el-col :md="6" :sm="12">
        <charts-card :number="cardDatas[3]['number']" :xAxis="cardDatas[3]['xAxis']" :data="cardDatas[3]['data']" className="info" name="累计用户"></charts-card>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="top-card">
      <el-col :md="8" :sm="24">
        <div class="card-container">
          版本分布
          <el-table
            :data="versionData"
            stripe
            style="width: 100%">
            <el-table-column
              prop="key"
              label="版本">
            </el-table-column>
            <el-table-column
              prop="value"
              label="占比">
              <template scope="scope">
              <el-progress text-inside="true" :stroke-width="18" :percentage="scope.row.value"></el-progress>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
      <el-col :md="8" :sm="24">
        <div class="card-container">
          国家分布
        </div>
      </el-col>
      <el-col :md="8" :sm="24">
        <div class="card-container">
          设备分布
        </div>
      </el-col>
    </el-row>

    <div class="card-container">
      <el-row class="">
        <el-col :span="6">
          <h4>概览</h4>
          <small>aaa</small>
        </el-col>
      </el-row>

      <el-row class="">
        <el-col :span="24" style="height: 400px;">
          <lineMarker height='100%' width='100%' />
        </el-col>
      </el-row>

    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import _ from 'lodash';
import { getSourceCol } from '../../../api/stat';
import PanThumb from 'components/PanThumb';
import MonthKpi from './monthKpi';
import { getList } from 'api/article';
import moment from 'moment';
import chartsCard from 'components/Charts/card';
import lineMarker from 'components/Charts/lineMarker';

export default {
  name: 'dashboard-editor',
  components: {
    chartsCard,
    lineMarker,
    PanThumb, MonthKpi
  },
  data() {
    return {
      chart: null,
      cardDatas:[
        {
          number:0,
          xAxis:[],
          data:[],
        },
        {
          number:2,
          xAxis:[],
          data:[],
        },
        {
          number:3,
          xAxis:[],
          data:[],
        },
        {
          number:4,
          xAxis:[],
          data:[],
        },
      ],
      versionData:[],
      list: [],
      datePicker: {
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            const start = moment();
            picker.$emit('pick', start.toDate());
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const start = moment();
            start.subtract(1, 'days');
            picker.$emit('pick', start.toDate());
          }
        }, {
          text: '前天',
          onClick(picker) {
            const start = moment();
            start.subtract(2, 'days');
            picker.$emit('pick', start.toDate());
          }
        },
        {
          text: '上周同期',
          onClick(picker) {
            const start = moment();
            start.subtract(8, 'days');
            picker.$emit('pick', start.toDate());
          }
        }, {
          text: '上月同期',
          onClick(picker) {
            const start = moment();
            start.subtract(1, 'month');
            picker.$emit('pick', start.toDate());
          }
        }]
      },
      date: moment().format()
    }
  },
  watch:{
    date(value){
      this.fetchData();
    }
  },
  created() {
    this.fetchData();
  },
  computed: {
    ...mapGetters([
      'name',
      'avatar',
      'email',
      'uid',
      'introduction',
      'roles'
    ]),
    recentArticles() {
      return this.list.slice(0, 7)
    }
  },
  methods: {
    fetchData() {
      let date = [
        moment(this.date).subtract(7, 'days').format(),
        moment(this.date).format(),
      ];

      getSourceCol('cmd', '20001', 'device_count', 'stat_time', { date }).then(response => {
         let data = response.data;
         this.cardDatas[0].xAxis = _.keys(data);
         this.cardDatas[0].data = _.values(data);
         this.cardDatas[0].number = parseInt(data[Math.max.apply(null,this.cardDatas[0].xAxis)],10);
      });
      getSourceCol('cmd', '20002', 'device_count', 'stat_time', { date }).then(response => {
         let data = response.data;
         this.cardDatas[1].xAxis = _.keys(data);
         this.cardDatas[1].data = _.values(data);
         this.cardDatas[1].number = parseInt(data[Math.max.apply(null,this.cardDatas[1].xAxis)],10);
      });
      getSourceCol('cmd', '21002', 'event_count', 'stat_time', { date }).then(response => {
         let data = response.data;
         this.cardDatas[2].xAxis = _.keys(data);
         this.cardDatas[2].data = _.values(data);
         this.cardDatas[2].number = parseInt(data[Math.max.apply(null,this.cardDatas[2].xAxis)],10);
      });
      getSourceCol('cmd', '20102', 'device_count', 'stat_time', { date }).then(response => {
         let data = response.data;
         this.cardDatas[3].xAxis = _.keys(data);
         this.cardDatas[3].data = _.values(data);
         this.cardDatas[3].number = parseInt(data[Math.max.apply(null,this.cardDatas[3].xAxis)],10);
      });


      getSourceCol('cmd', '20002', 'device_count', 'version', { date }).then(response => {
         let data = response.data;
         data = _.transform(data, (result, value, key)=>{
          result.push({
            key: key,
            value: parseInt(value,10),
          })
         }, []);
         data = _.orderBy(data, ['value'], ['desc']);
         console.log(this.getTop20(data));
         this.versionData = this.getTop20(data);
      });


    },
    getTop20(data){

      var total = 0;
      _.forEach(data, (value)=>{
        total += value.value;
      })

      var i=0;
      var newData = [];
      var other = 0;
      _.forEach(data, (value)=>{
        if(i>=10){
          other += value.value;
        }else{
          newData.push({
            key: value.key,
            value: (Math.round((value.value/total)*10000)/100),
          })
        }
        i++;
      })
      newData.push({key:'Other',value:(Math.round((other/total)*10000)/100)});
      return newData;
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.top-card {
  .el-col {
    margin-bottom: 20px;
  }
}

.el-progress-bar .el-progress-bar__innerText{
  color:#000000;
}

.card-container {
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border: 1px solid #cfd8dc;
  padding: 20px;
  margin-bottom: 20px;

  h4 {
    font-size: 1.5rem;
    margin: 0 1.5rem;
  }

  small {
    margin: 0 1.5rem;
    color: #909090;
  }
}




.recent-articles-emptyTitle {
  font-size: 16px;
  color: #95A5A6;
  padding-top: 20px;
  text-align: center;
}

.main-container {
  padding: 30px 50px;
  .pan-info-roles {
    font-size: 12px;
    font-weight: 700;
    color: #333;
    display: block;
  }
  .info-container {
    position: relative;
    margin-left: 190px;
    height: 150px;
    line-height: 200px;
    .display_name {
      font-size: 48px;
      line-height: 48px;
      color: #212121;
      position: absolute;
      top: 25px;
    }
    .info-wrapper {
      line-height: 40px;
      position: absolute;
      bottom: 0px;
      .info-item {
        cursor: pointer;
        display: inline-block;
        margin-right: 95px;
        .info-item-num {
          color: #212121;
          font-size: 24px;
          display: inline-block;
          padding-right: 5px;
        }
        .info-item-text {
          color: #727272;
          font-size: 14px;
          padding-right: 5px;
          display: inline-block;
        }
      }
    }
    .dashboard-editor-icon {
      width: 22px;
      height: 22px;
    }
  }

  .btn-group {
    margin: 30px 36px 30px 0;
  }
  .main-dashboard-container {
    width: 100%;
    position: relative;
    border: 1px solid #DEE1E2;
    padding: 0 10px;
  }
  .chart-container {
    float: left;
    position: relative;
    padding-right: 10px;
    width: 40%;
    border-right: 1px solid #DEE1E2;
  }
  .recent-articles-container {
    padding: 12px 12px 0px;
    float: left;
    width: 60%;
    position: relative;
    .recent-articles- {
      &title {
        font-size: 16px;
        color: #95A5A6;
        letter-spacing: 1px;
        padding-left: 15px;
        padding-bottom: 10px;
        border-bottom: 1px solid #DEE1E2;
      }
      &more {
        color: #2C3E50;
        font-size: 12px;
        float: right;
        margin-right: 25px;
        line-height: 40px;
        &:hover {
          color: #3A71A8;
        }
      }
      &wrapper {
        padding: 0 20px 0 22px;
        .recent-articles- {
          &item {
            cursor: pointer;
            padding: 16px 100px 16px 16px;
            border-bottom: 1px solid #DEE1E2;
            position: relative;
            &:before {
              content: "";
              height: 104%;
              width: 0px;
              background: #30B08F;
              display: inline-block;
              position: absolute;
              opacity: 0;
              left: 0px;
              top: -2px;
              transition: 0.3s ease all;
            }
            &:hover {
              &:before {
                opacity: 1;
                width: 3px;
              }
            }
          }
          &status {
            font-size: 12px;
            display: inline-block;
            color: #9B9B9B;
            padding-right: 6px;
          }
          &content {
            font-size: 13px;
            color: #2C3E50;
            &:hover {
              color: #3A71A8;
            }
          }
          &time {
            position: absolute;
            right: 16px;
            top: 16px;
            color: #9B9B9B;
          }
        }
      }
    }
  }


}
</style>
