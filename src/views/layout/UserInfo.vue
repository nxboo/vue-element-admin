<template>

    <div>

        <el-row>
            <el-col :span="12" :offset="6" class="portrait">
                <img :src="baseUrl+userinfo.portrait" />
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="12" :offset="6" class="username">
                <span>{{userinfo.username}}</span>
            </el-col>
        </el-row>

        <el-row class="info">
            <el-col :span="7" :offset="4">
                角色
            </el-col>
            <el-col :span="12">
                {{userinfo.role_name}}
            </el-col>
        </el-row>

        <el-row class="info">
            <el-col :span="7" :offset="4">
                状态
            </el-col>
            <el-col :span="12">
                正常
            </el-col>
        </el-row>

        <el-row class="info">
            <el-col :span="7" :offset="4">
                最后登录时间
            </el-col>
            <el-col :span="10">
                {{userinfo.last_login_time}}
            </el-col>
        </el-row>

        <el-row class="info">
            <el-col :span="7" :offset="4">
                最后登录IP
            </el-col>
            <el-col :span="12">
                {{userinfo.last_login_ip}}
            </el-col>
        </el-row>

        <el-row class="btn" style="margin-top: 50px;">
            <el-col :span="12" :offset="6">
                <el-button type="info" class="btn"><philm-icon icon="key2" /> 修改密码</el-button>
            </el-col>
        </el-row>

        <el-row class="btn">
            <el-col :span="12" :offset="6">
                <el-button type="danger" @click="logout">
                    <philm-icon icon="exit" /> 退出登录
                </el-button>
            </el-col>
        </el-row>

    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import PhilmIcon from "../../components/Icon-svg/philm-icon";
//    import {Row, Col, Button} from 'element-ui';
    //    import ElCol from "element-ui/packages/col/src/col";
    //    import ElRow from "element-ui/packages/col/src/row";
    export default {
        components: {
            PhilmIcon
        },
        name: 'UserInfo',
        data() {
            return {
                msgs: []
            }
        },
        computed: {
            ...mapGetters([
                'userinfo',
                'baseUrl'
            ])
        },
        methods: {
            logout() {
                this.$store.dispatch('LogOut').then(() => {
                    this.$router.push({path: '/login'})
                });
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .msg-list {
        display: block;
        width: 90%;
        margin: 0 5%;
        padding: 0 5px;
        color: #bfcbd9;

        li {
            border: solid #bfcbd9;
            border-width: 0 0 1px 0;
            line-height: 40px;
            list-style: none;
            margin: 0;
            padding: 0;
        }
    }

    .portrait{
        height: 270px;
        img{
            margin: auto;
            width: 180px;
            height: 180px;
            border-radius: 50%;
            margin-top: 90px;
        }
    }

    .username{
        font-size: 30px;
        text-align: center;
        font-weight: bold;
        color:#FFFFFF;
        margin-top: 20px;
        margin-bottom: 50px;
    }

    .info{
        font-size: 14px;
        margin-bottom: 15px;
        color: #bfcbd9;
    }

    .btn{
        margin: 10px auto;
        button{
            width: 100%;
        }
    }
</style>
