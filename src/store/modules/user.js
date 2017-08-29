import {login, logout, getInfo} from 'api/login';
import Cookies from 'js-cookie';

const user = {
    state: {
        userinfo:{
            username: '', //用户名
            portrait: '',
            last_login_time: '', //最后登录时间
            last_login_ip: '', //最后登录IP
            role_name: '',
        },
        state: '', //状态
        token: Cookies.get('X-Ivanka-Token'), //token
        roles: [], //权限
        setting: { //设置
            articlePlatform: []
        }
    },

    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token;
            Cookies.set('X-Ivanka-Token', token);
        },
        SET_USERINFO: (state, userinfo) => {
            state.userinfo = userinfo;
        },
        SET_INTRODUCTION: (state, introduction) => {
            state.introduction = introduction;
        },
        SET_SETTING: (state, setting) => {
            state.setting = setting;
        },
        SET_STATUS: (state, status) => {
            state.status = status;
        },
        SET_NAME: (state, name) => {
            state.name = name;
        },
        SET_AVATAR: (state, avatar) => {
            state.avatar = avatar;
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles;
        },
        LOGIN_SUCCESS: () => {
            console.log('login success')
        },
        LOGOUT_USER: state => {
            state.user = '';
        }
    },

    actions: {

        // 邮箱登录
        Login({commit}, userInfo) {
            const username = userInfo.username.trim();
            return new Promise((resolve, reject) => {
                login(username, userInfo.password).then(response => {
                    const data = response.data;
                    commit('SET_TOKEN', data.token);
                    resolve();
                }).catch(error => {
                    reject(error);
                });
            });
        },


        // 获取用户信息
        GetInfo({commit, state}) {
            return new Promise((resolve, reject) => {
                getInfo(state.token).then(response => {
                    const data = response.data;
                    commit('SET_USERINFO', {
                        username: data.staff_name,
                        portrait: data.portrait,
                        last_login_time: data.last_login_time,
                        last_login_ip: data.last_login_ip,
                        role_name: data.role.title
                    });
                    // commit('SET_ROLES', data.role.privilege);

                    resolve(response);
                }).catch(error => {
                    reject(error);
                });
            });
        },

        // 第三方验证登录
        LoginByThirdparty({commit, state}, code) {
            return new Promise((resolve, reject) => {
                commit('SET_CODE', code);
                loginByThirdparty(state.status, state.email, state.code, state.auth_type).then(response => {
                    commit('SET_TOKEN', response.data.token);
                    Cookies.set('X-Ivanka-Token', response.data.token);
                    resolve();
                }).catch(error => {
                    reject(error);
                });
            });
        },


        // 登出
        LogOut({commit, state}) {
            return new Promise((resolve, reject) => {
                logout(state.token).then(() => {
                    commit('SET_TOKEN', '');
                    commit('SET_ROLES', []);
                    Cookies.remove('X-Ivanka-Token');
                    resolve();
                }).catch(error => {
                    reject(error);
                });
            });
        },

        // 前端 登出
        FedLogOut({commit}) {
            return new Promise(resolve => {
                commit('SET_TOKEN', '');
                Cookies.remove('X-Ivanka-Token');
                resolve();
            });
        }
    }
};

export default user;
