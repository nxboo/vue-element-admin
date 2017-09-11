import Cookies from 'js-cookie';

const app = {
  state: {
    baseUrl: 'http://ophwtest.yoyo-corp.com/',
    sidebar: {
      opened: !+Cookies.get('sidebarStatus')
    },
    layout: {
      //右侧边栏打开 Msg|Setting|UserInfo
      rightPanel: '',
      fullScreen: true
    },
    theme: 'default',
    livenewsChannels: Cookies.get('livenewsChannels') || '[]',
    //页面信息
    pageInfo: {
      //导航信息
      breadcrumb: [],
      //标题
      title: "",
      //说明
      desc: "",
      //标题部分的options
      options: []
    }
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 1);
      } else {
        Cookies.set('sidebarStatus', 0);
      }
      state.sidebar.opened = !state.sidebar.opened;
    },
    TOGGLE_RIGHT_PANEL: (state, payload) => {
      if (state.layout.rightPanel == payload.panel)
        state.layout.rightPanel = '';
      else
        state.layout.rightPanel = payload.panel;
    },
    TOGGLE_FULL_SCREEN:  (state, payload) => {
      if (typeof payload.fullScreen!=='undefined')
        state.layout.fullScreen = payload.fullScreen;
      else
        state.layout.fullScreen = !state.layout.fullScreen;
    },
    SET_LIVENEWS_CHANNELS: (status, channels) => {
      status.livenewsChannels = JSON.stringify(channels);
      Cookies.set('livenewsChannels', JSON.stringify(channels));
    },
    SET_PAGE_INFO_TITLE: (state, payload) => {
      state.pageInfo.title = payload;
    },
    SET_PAGE_INFO_DESC: (state, payload) => {
      state.pageInfo.desc = payload;
    },
    SET_PAGE_INFO_BREADCRUMB: (state, payload) => {
      state.pageInfo.breadcrumb = payload;
    },
    ADD_PAGE_INFO_BREADCRUMB: (state, payload) => {
      state.pageInfo.breadcrumb.push(payload);
    },
    SET_PAGE_INFO_OPTIONS: (state, payload) => {
      state.pageInfo.options = payload;
    },
  },
  actions: {
    ToggleSideBar: ({ commit }) => {
      commit('TOGGLE_SIDEBAR')
    },
    ToggleRightPanel: ({ commit }, panel) => {
      commit('TOGGLE_RIGHT_PANEL', {
        panel: panel
      });
    },
    ToggleFullScreen: ({ commit }, fullScreen) => {
      commit('TOGGLE_FULL_SCREEN', {
        fullScreen: fullScreen
      });
    },
    setTheme: ({ commit }, theme) => {
      commit('SET_THEME', theme)
    },
    setlivenewsChannels: ({ commit }, channels) => {
      commit('SET_LIVENEWS_CHANNELS', channels)
    },

    //设置页面信息
    setPageInfo({commit}, pageInfo){
      if(pageInfo.title) commit('SET_PAGE_INFO_TITLE', pageInfo.title);
      if(pageInfo.desc) commit('SET_PAGE_INFO_DESC', pageInfo.desc ? pageInfo.desc : '');
      if(pageInfo.breadcrumb) commit('SET_PAGE_INFO_BREADCRUMB', pageInfo.breadcrumb ? pageInfo.breadcrumb : []);
      if(pageInfo.options) commit('SET_PAGE_INFO_OPTIONS', pageInfo.options ? pageInfo.options : []);
    },
  }
};

export default app;
