<template>
  <el-date-picker style="width: 100%" v-model='currentValue' v-on:change="updateValue(currentValue)" :type="type" align="left"
    range-separator=" ~ " placeholder="选择日期范围" :picker-options="datePicker">
  </el-date-picker>
</template>
<script>
  import moment from 'moment';

  export default {
    name: 'date',
    components: {},
    props: ['value', 'onlyStartDate'],
    data() {
      let data = {
        type: '',
        currentValue: [],
      };

      console.log('this.onlyStartDate', this.onlyStartDate);
      if (this.onlyStartDate) {
        data['datePicker'] = {
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
          },  {
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
        };
      } else {
        data['datePicker'] = {
          firstDayOfWeek: 1,
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              const end = moment();
              const start = moment();
              picker.$emit('pick', [start.toDate(), end.toDate()]);
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const end = moment();
              const start = moment();
              end.subtract(1, 'days');
              start.subtract(1, 'days');
              picker.$emit('pick', [start.toDate(), end.toDate()]);
            }
          }, {
            text: '本周',
            onClick(picker) {
              const end = moment();
              const start = moment();
              start.subtract(start.weekday() - 1, 'days');
              picker.$emit('pick', [start.toDate(), end.toDate()]);
            }
          }, {
            text: '最近7天',
            onClick(picker) {
              const end = moment();
              const start = moment();
              start.subtract(7, 'days');
              picker.$emit('pick', [start.toDate(), end.toDate()]);
            }
          }, {
            text: '本月',
            onClick(picker) {
              const end = moment();
              const start = moment();
              start.subtract(start.date() - 1, 'days');
              picker.$emit('pick', [start.toDate(), end.toDate()]);
            }
          }, {
            text: '最近30天',
            onClick(picker) {
              const end = moment();
              const start = moment();
              start.subtract(30, 'days');
              picker.$emit('pick', [start.toDate(), end.toDate()]);
            }
          }]
        };
      }

      return data;

    },
    created() {
      if(this.onlyStartDate){
        this.currentValue = this.value[0];
      }else{
        this.currentValue = this.value;
      }
      this.type = this.onlyStartDate ? 'date' : 'daterange';
    },
    methods: {
      updateValue: function (currentValue) {
        console.log(currentValue);
        if(this.onlyStartDate){
          this.$emit('input', [currentValue]);
        }else{
          this.$emit('input', currentValue);
        }

      }
    }
  };

</script>
