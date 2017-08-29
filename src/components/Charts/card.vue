<template>
    <div class="card" :class="className">
        <div class="card-block">
            <div><i slot="button" class="icon-settings"></i></div>
            <h4>{{number}}</h4>
            <small>{{name}}</small>
        </div>
        <div class="chart" ref="chart"></div>
    </div>
</template>
<script>
    // 引入 ECharts 主模块
    const echarts = require('echarts/lib/echarts');
    // 引入柱状图
    require('echarts/lib/chart/bar');
    // 引入提示框和标题组件
    require('echarts/lib/component/tooltip');


    export default {
        name: 'charts-card',
        props: {
            type: {
                type: String,
                default: 'bar',
            },
            className: {
                type: String,
                default: 'primary',
            },
            name: {
                type: String,
                default: '请设置name',
                required: true
            },
            id: {
                type: String,
                default: ''
            },
            number: {
                type: Number,
                default: 0
            },
            xAxis: {
                type: Array,
                default: function(){
                    return ['23', '24', '25', '26', '27', '28'];
                }
            },
            data: {
                type: Array,
                default: function () {
                    return [10, 50, 35, 40, 60, 80, 100];
                }
            }
        },
        computed: {
            formatNumber: function () {
                return this.number.toString();
            }
        },
        data() {
            return {
                chart: null
            };
        },
        watch: {
            dataNum() {
                this.setOptions()
            }
        },
        mounted() {
            this.initBar();
        },
        methods: {
            initBar() {
                this.chart = echarts.init(this.$refs.chart);
                this.setOptions();
            },
            setOptions() {
                this.chart.setOption({
                    color: ['rgba(255,255,255,.5)'],
                    tooltip: {
                        trigger: 'none'
                    },
                    grid: {
                        show: false,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        top: 0,
                        containLabel: false
                    },
                    xAxis: [{
                        type: 'category',
                        data: this.xAxis
                    }],
                    yAxis: [{
                        type: 'value',
                        show: false
                    }],
                    animationDelay: 1000,
                    series: [{
                        type: this.type,
                        name: this.name,
                        itemStyle: {
                            normal: {
                                color: 'rgba(255,255,255,.5)'
                            }
                        },
                        smooth: true,
                        symbolSize: 10,
                        hoverAnimation: false,
                        silent: true,
                        barGap: '-100%', // Make series be overlap
                        data: this.data
                    }]
                })
            }
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .card {

        width: 100%;
        height: 100%;
        padding: 20px;
        color: #FFFFFF;

        .card-block {
            h4 {
                font-size: 1.5rem;
                margin: 0;
            }
            small {
                margin: 0 0 5px 0;
                font-size: .9rem;
            }
        }

        .chart {
            margin: 5px 0 0 0;
            width: 100%;
            height: 60px;
        }

        &.primary {
            background-color: #20a8d8;
        }

        &.secondary {
            background-color: #cfd8dc;
            color: #444;
        }

        &.success {
            background-color: #4dbd74;
        }

        &.info {
            background-color: #63c2de;
        }

        &.warning {
            background-color: #f8cb00;
        }

        &.danger {
            background-color: #f86c6b;
        }
    }
</style>
