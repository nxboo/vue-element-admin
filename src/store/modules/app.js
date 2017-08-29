import Cookies from 'js-cookie';

const app = {
    state: {
        baseUrl: 'http://ophwtest.yoyo-corp.com/',
        sidebar: {
            opened: !+Cookies.get('sidebarStatus')
        },
        layout: {
            //右侧边栏打开 Msg|Setting|UserInfo
            rightPanel: ''
        },
        theme: 'default',
        livenewsChannels: Cookies.get('livenewsChannels') || '[]',

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
            if(state.layout.rightPanel == payload.panel)
                state.layout.rightPanel = '';
            else
                state.layout.rightPanel = payload.panel;
        },
        SET_LIVENEWS_CHANNELS: (status, channels) => {
            status.livenewsChannels = JSON.stringify(channels);
            Cookies.set('livenewsChannels', JSON.stringify(channels));
        }
    },
    actions: {
        ToggleSideBar: ({commit}) => {
            commit('TOGGLE_SIDEBAR')
        },
        ToggleRightPanel: ({commit}, panel) => {
            console.log(panel);
            commit('TOGGLE_RIGHT_PANEL', {
                panel: panel
            });
        },
        setTheme: ({commit}, theme) => {
            commit('SET_THEME', theme)
        },
        setlivenewsChannels: ({commit}, channels) => {
            commit('SET_LIVENEWS_CHANNELS', channels)
        }
    }
};

export default app;
