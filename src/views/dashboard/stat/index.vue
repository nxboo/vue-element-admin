<template>



    <div class="dashboard-editor-container">

        <el-row :gutter="20" type="flex" justify="end" style="margin-bottom: 20px;">
            <el-col :md="4">
                <el-date-picker
                        style="width: 100%"
                        v-model="value"
                        type="daterange"
                        align="right"
                        range-separator=" ~ "
                        placeholder="选择日期范围"
                        :picker-options="datePicker">
                </el-date-picker>
            </el-col>
        </el-row>

        <el-row :gutter="20" class="top-card">
            <el-col :md="6" :sm="12">
                <charts-card id="testCard" :number="888" className="primary" type="line" name="新增安装"></charts-card>
            </el-col>
            <el-col :md="6" :sm="12">
                <charts-card id="testCard2" :number="9342423" :xAxis="['A','B','C']" :data="[1,2,3]" className="danger" name="活跃用户"></charts-card>
            </el-col>
            <el-col :md="6" :sm="12">
                <charts-card id="testCard3" :number="93422423" className="success" name="启动次数"></charts-card>
            </el-col>
            <el-col :md="6" :sm="12">
                <charts-card id="testCard4" :number="43214" className="info" name="累计用户"></charts-card>
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

        <div class="clearfix main-dashboard-container">
            <div class="chart-container">
                <MonthKpi style="border-bottom: 1px solid #DEE1E2;"
                          :articlesComplete='statisticsData.month_article_count'></MonthKpi>
                <ArticlesChart :listData='statisticsData.week_article'></ArticlesChart>
            </div>
            <div class="recent-articles-container">
                <div class="recent-articles-title">最近撸了</div>
                <div class="recent-articles-wrapper">
                    <template v-if="recentArticles.length!=0">
                        <div class="recent-articles-item" v-for="item in  recentArticles">
                            <span class="recent-articles-status">{{item.status | statusFilter}}</span>
                            <span class="recent-articles-content" :to="'/article/edit/'+item.id">
                                {{item.title}}
                            </span>
                            <span class="recent-articles-time">{{item.author}}</span>
                        </div>
                    </template>
                    <template v-else>
                        <div class="recent-articles-emptyTitle">你太懒了最近都没有撸</div>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    import PanThumb from 'components/PanThumb';
    import MonthKpi from './monthKpi';
    import ArticlesChart from './articlesChart';
    import {getList} from 'api/article';
    import countTo from 'vue-count-to';
    import moment from 'moment';
    import chartsCard from 'components/Charts/card';
    import lineMarker from 'components/Charts/lineMarker';

    export default {
        name: 'dashboard-editor',
        components: {
            chartsCard,
            lineMarker,
            PanThumb, MonthKpi, ArticlesChart, countTo},
        data() {
            return {
                chart: null,
                statisticsData: {
                    article_count: 1024,
                    comment_count: 102400,
                    latest_article: [],
                    month_article_count: 28,
                    pageviews_count: 1024,
                    week_article: [
                        {count: 30, week: '201716'},
                        {count: 26, week: '201715'},
                        {count: 31, week: '201714'},
                        {count: 28, week: '201713'},
                        {count: 40, week: '201712'},
                        {count: 41, week: '201711'},
                        {count: 50, week: '201710'},
                        {count: 42, week: '201709'},
                        {count: 36, week: '201708'},
                        {count: 32, week: '201707'},
                        {count: 40, week: '201706'},
                        {count: 41, week: '201705'}
                    ]
                },
                list: [],
                datePicker: {
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
                            end.subtract(1,'days');
                            start.subtract(1,'days');
                            picker.$emit('pick', [start.toDate(), end.toDate()]);
                        }
                    }, {
                        text: '本周',
                        onClick(picker) {
                            const end = moment();
                            const start = moment();
                            start.subtract(start.weekday()-1,'days');
                            picker.$emit('pick', [start.toDate(), end.toDate()]);
                        }
                    }, {
                        text: '最近7天',
                        onClick(picker) {
                            const end = moment();
                            const start = moment();
                            start.subtract(7,'days');
                            picker.$emit('pick', [start.toDate(), end.toDate()]);
                        }
                    }, {
                        text: '本月',
                        onClick(picker) {
                            const end = moment();
                            const start = moment();
                            start.subtract(start.date()-1,'days');
                            picker.$emit('pick', [start.toDate(), end.toDate()]);
                        }
                    }, {
                        text: '最近30天',
                        onClick(picker) {
                            const end = moment();
                            const start = moment();
                            start.subtract(30,'days');
                            picker.$emit('pick', [start.toDate(), end.toDate()]);
                        }
                    }]
                },
                value:new Date()
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
                getList(this.listQuery).then(response => {
                    this.list = response.data;
                })
            }
        },
        filters: {
            statusFilter(status) {
                const statusMap = {
                    published: '已发布',
                    draft: '草稿中',
                    deleted: '已删除'
                };
                return statusMap[status];
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

    .top-card{
        .el-col{
            margin-bottom: 20px;
        }
    }

    .card-container{
        position: relative;
        display: flex;
        flex-direction: column;
        background-color: #fff;
        border: 1px solid #cfd8dc;
        padding: 20px;
        margin-bottom: 20px;

        h4{
            font-size: 1.5rem;
            margin: 0 1.5rem;
        }

        small{
            margin: 0 1.5rem;
            color:#909090;
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
