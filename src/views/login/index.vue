<template>
    <div class="login-container">
        <el-form autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left"
                 label-width="0px"
                 class="card-box login-form">
            <h3 class="title">Philm Admin</h3>
            <el-form-item prop="email">
                <span class="svg-container"><philm-icon icon="user"></philm-icon></span>
                <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on"
                          placeholder="用户名"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <span class="svg-container"><philm-icon icon="key2"></philm-icon></span>
                <el-input name="password" type="password" @keyup.enter.native="handleLogin" v-model="loginForm.password"
                          autoComplete="on" placeholder="密码"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleLogin">
                    登录
                </el-button>
            </el-form-item>

        </el-form>
        <!--<el-dialog title="第三方验证" v-model="showDialog">-->
        <!--邮箱登录成功,请选择第三方验证-->
        <!--<socialSign></socialSign>-->
        <!--</el-dialog>-->
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    import {isWscnEmail} from 'utils/validate';
    // import { getQueryObject } from 'utils';
    import socialSign from './socialsignin';

    export default {
        components: {socialSign},
        name: 'login',
        data() {
            const validatePass = (rule, value, callback) => {
                if (value.length < 6) {
                    callback(new Error('密码不能小于6位'));
                } else {
                    callback();
                }
            };
            return {
                loginForm: {
                    username: '',
                    password: ''
                },
                loginRules: {
                    username: [
                        {required: true, trigger: 'blur'}
                    ],
                    password: [
                        {required: true, trigger: 'blur', validator: validatePass}
                    ]
                },
                loading: false,
                showDialog: false
            }
        },
        computed: {
            ...mapGetters([
                'auth_type'
            ])
        },
        methods: {
            handleLogin() {
                this.$refs.loginForm.validate(valid => {
                    if (valid) {
                        this.loading = true;
                        this.$store.dispatch('Login', this.loginForm).then(() => {
                            this.loading = false;
                            this.$router.push({path: '/'});
                            console.log(1);
//                            this.showDialog = true;
                        }).catch(err => {
                            if (err && err.msg) {
                                this.$message.error(err.msg);
                            }else{
                                console.log(err);
                            }

                            this.loading = false;
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        },
        created() {
            // window.addEventListener('hashchange', this.afterQRScan);
        },
        destroyed() {
            // window.removeEventListener('hashchange', this.afterQRScan);
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss">
    @import "src/styles/mixin.scss";

    .tips {
        font-size: 14px;
        color: #fff;
        margin-bottom: 5px;
    }

    .login-container {
        @include relative;
        height: 100vh;
        background-color: #2d3a4b;

        input:-webkit-autofill {
            -webkit-box-shadow: 0 0 0px 1000px #293444 inset !important;
            -webkit-text-fill-color: #fff !important;
        }
        input {
            background: transparent;
            border: 0px;
            -webkit-appearance: none;
            border-radius: 0px;
            padding: 12px 5px 12px 15px;
            color: #eeeeee;
            height: 47px;
        }
        .el-input {
            display: inline-block;
            height: 47px;
            width: 85%;
        }
        .svg-container {
            padding: 6px 5px 6px 15px;
            color: #889aa4;
        }

        .title {
            font-size: 26px;
            font-weight: 400;
            font-weight: bold;
            color: #eeeeee;
            margin: 0px auto 40px auto;
            text-align: center;
        }

        .login-form {
            position: absolute;
            left: 0;
            right: 0;
            width: 400px;
            padding: 35px 35px 15px 35px;
            margin: 120px auto;
        }

        .el-form-item {
            border: 1px solid rgba(255, 255, 255, 0.1);
            background: rgba(0, 0, 0, 0.1);
            border-radius: 5px;
            color: #454545;
        }

        .forget-pwd {
            color: #fff;
        }
    }

</style>
