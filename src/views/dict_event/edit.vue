<template>
    <div>


        <div class="card-container edit-form">
            <el-row :gutter="20" style="margin-bottom: 20px;">

                <el-col :sm="4" class="edit-label">
                    类别
                </el-col>
                <el-col :sm="12">
                    <el-select v-model="info.category" filterable placeholder="请选择类别">
                        <el-option
                                v-for="(name, key) in categoryOptions"
                                :key="key"
                                :label="name"
                                :value="key">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :sm="8" class="edit-help">
                    这是帮助信息
                </el-col>

            </el-row>
            <el-row :gutter="20" style="margin-bottom: 20px;">

                <el-col :sm="4" class="edit-label">
                    事件编号
                </el-col>
                <el-col :sm="12">
                    <el-input v-model="info.cmd"></el-input>
                </el-col>
                <el-col :sm="8" class="edit-help">
                    这是帮助信息
                </el-col>

            </el-row>
            <el-row :gutter="20" style="margin-bottom: 20px;">

                <el-col :sm="4" class="edit-label">
                    事件名称
                </el-col>
                <el-col :sm="12">
                    <el-input v-model="info.event_name"></el-input>
                </el-col>
                <el-col :sm="8" class="edit-help">
                    这是帮助信息
                </el-col>

            </el-row>

            <el-row :gutter="20" style="margin-bottom: 20px;">

                <el-col :sm="4" class="edit-label">
                    事件描述
                </el-col>
                <el-col :sm="12">
                    <el-input v-model="info.event_desc"></el-input>
                </el-col>
                <el-col :sm="8" class="edit-help">
                    这是帮助信息
                </el-col>

            </el-row>


            <el-row :gutter="20" style="margin-bottom: 20px;">

                <el-col :sm="4" class="edit-label">
                    Android版本
                </el-col>
                <el-col :sm="12">
                    <el-select v-model="info.version_android" filterable placeholder="请选择Android版本">
                        <el-option
                                v-for="(name, key) in versionIosOptions"
                                :key="key"
                                :label="name"
                                :value="key">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :sm="8" class="edit-help">
                    这是帮助信息
                </el-col>

            </el-row>


            <el-row :gutter="20" style="margin-bottom: 20px;">

                <el-col :sm="4" class="edit-label">
                    Ios版本
                </el-col>
                <el-col :sm="12">
                    <el-select v-model="info.version_ios" filterable placeholder="请选择Ios版本">
                        <el-option
                                v-for="(name, key) in versionAndroidOptions"
                                :key="key"
                                :label="name"
                                :value="key">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :sm="8" class="edit-help">
                    这是帮助信息
                </el-col>

            </el-row>


            <el-row :gutter="20" style="margin-bottom: 20px;">

                <el-col :sm="4" class="edit-label">
                    分类参数
                </el-col>
                <el-col :sm="12">
                    <el-input v-model="info.class_para" :disabled="true"></el-input>
                </el-col>
                <el-col :sm="8" class="edit-help">
                    这是帮助信息
                </el-col>

            </el-row>
            <el-row :gutter="20" style="margin-bottom: 20px;">

                <el-col :sm="4" class="edit-label">
                    统计参数
                </el-col>
                <el-col :sm="12">
                    <el-input v-model="info.stat_para" :disabled="true"></el-input>
                </el-col>
                <el-col :sm="8" class="edit-help">
                    这是帮<em>助信</em>息
                </el-col>

            </el-row>

            <div class="edit-footer">
                <el-row type="flex" justify="center">
                    <el-col :sm="8">
                        <el-button style="width: 100%" type="primary" @click="submit" :loading="putLoading" icon="check">
                            提交
                        </el-button>
                    </el-col>
                </el-row>
            </div>
        </div>

    </div>
</template>
<script>
    import {view, getIosVersions, getAndroidVersions, getCategorys, getInfo, putInfo} from 'api/dict_event';
    import LineChart from "../../components/Charts/line";
    import PhilmIcon from "../../components/Icon-svg/philm-icon";
    import lodash from 'lodash';

    export default {
        name: 'edit',
        components: {
            PhilmIcon,
        },
        db: null,
        data() {
            return {
                info: {
                    cmd: 0,
                    category: '',
                    event_name: '',
                    event_desc: '',
                    version_android: '',
                    version_ios: '',
                    class_para: '',
                    stat_para: '',
                },

                versionAndroidOptions: [],
                versionIosOptions: [],
                categoryOptions: [],

                putLoading: false,

            }
        },
        created() {
            if (this.$route.params.cmd) {
                this.info.cmd = this.$route.params.cmd;
            }

            this.fetchData();
        },
        methods: {

            fetchData() {
                this.listLoading = true;

                getAndroidVersions().then(response => {
                    this.versionAndroidOptions = response.data;
                });

                getIosVersions().then(response => {
                    this.versionIosOptions = response.data;
                });

                getCategorys().then(response => {
                    this.categoryOptions = response.data;
                });

                getInfo(this.info.cmd).then(response => {
                    if (response.code == 0) {
                        this.info = response.data;
                    }
                });
            },

            submit(){
                this.putLoading = true;

                putInfo(this.info).then(response => {
                    this.putLoading = false;

                    if(response.code==0){
                        this.$message({
                            type: 'success',
                            message:response.msg
                        });
                    }else{
                        this.$message({
                            type: 'error',
                            message:response.msg
                        });
                    }
                });
            },
        }
    };
</script>
