<template>
    <div :class="className" :id="id" :style="{height:height,width:width}"></div>
</template>
<script>
    // 引入 ECharts 主模块
    const echarts = require('echarts/lib/echarts');

    require('echarts/lib/chart/line');
    // 引入提示框和标题组件
    require('echarts/lib/component/tooltip');
    require('echarts/lib/component/title');
    require('echarts/lib/component/legend');
    export default {
        name: 'barPercent',
        props: {
            className: {
                type: String,
                default: 'chart'
            },
            id: {
                type: String,
                default: 'chart'
            },
            width: {
                type: String,
                default: '200px'
            },
            height: {
                type: String,
                default: '200px'
            },
            chartData: {
                type: Object
            }
        },
        data() {
            return {};
        },
        mounted() {
            this.$on('init', ()=>{
                console.log('init');
                this.initChart();
            });


        },
        methods: {
            initChart() {
                if(this.chart){
                    this.chart.dispose();
                    this.chart = null;
                }
                this.chart = echarts.init(document.getElementById(this.id));
                this.chart.setOption({
                    title: {
                        text: '堆叠区域图'
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            label: {
                                backgroundColor: '#6a7985'
                            }
                        }
                    },
                    legend: this.chartData.legend,
                    toolbox: {
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: this.chartData.xAxis,
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    series: this.chartData.series
                }, true);

            }
        }
    }
</script>
