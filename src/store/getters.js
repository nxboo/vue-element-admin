const getters = {
    baseUrl: state => state.app.baseUrl,
    sidebar: state => state.app.sidebar,
    layout: state => state.app.layout,
    livenewsChannels: state => state.app.livenewsChannels,
    token: state => state.user.token,
    userinfo: state => state.user.userinfo,
    roles: state => state.user.roles,
    setting: state => state.user.setting
};
export default getters
