<template>
    <el-date-picker
            style="width: 100%"
            v-model='currentValue'
            v-on:change="updateValue(currentValue)"
            type="daterange"
            align="left"
            range-separator=" ~ "
            placeholder="选择日期范围"
            :picker-options="datePicker">
    </el-date-picker>
</template>
<script>

    import moment from 'moment';

    export default {
        name: 'date',
        components: {},
        props: ['value'],
        data() {
            return {
                datePicker: {
                    disabledDate(time) {
                        return time.getTime() > Date.now() + 86400;
                    },
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
                },
                currentValue: [],
            }
        },
        created() {
            this.currentValue = this.value;
        },
        methods: {
            updateValue: function (currentValue) {
                this.$emit('input', currentValue);
            }
        }
    };
</script>
