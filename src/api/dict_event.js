import {fetch} from 'utils/fetch';

export function view(keyword = '', category = '', versionIos = '', versionAndroid = '') {
    return fetch({
        url: 'http://ophwtest.yoyo-corp.com/index.php?s=/Api/StatDictEvent/view',
        params: {
            keyword, category, versionIos, versionAndroid
        },
        method: 'get'
    });
}

export function getIosVersions() {
    return fetch({
        url: 'http://ophwtest.yoyo-corp.com/index.php?s=/Api/StatDictEvent/getIosVersions',
        method: 'get'
    });
}

export function getAndroidVersions() {
    return fetch({
        url: 'http://ophwtest.yoyo-corp.com/index.php?s=/Api/StatDictEvent/getAndroidVersions',
        method: 'get'
    });
}

export function getCategorys() {
    return fetch({
        url: 'http://ophwtest.yoyo-corp.com/index.php?s=/Api/StatDictEvent/getCategorys',
        method: 'get'
    });
}

export function getInfo(cmd) {
    return fetch({
        url: 'http://ophwtest.yoyo-corp.com/index.php?s=/Api/StatDictEvent/getInfo', params: {
            cmd
        },
        method: 'get'
    });
}

export function putInfo(info) {
    return fetch({
        url: 'http://ophwtest.yoyo-corp.com/index.php?s=/Api/StatDictEvent/putInfo',
        params: info,
        method: 'get'
    });
}

export function del(cmd) {
    return fetch({
        url: 'http://ophwtest.yoyo-corp.com/index.php?s=/Api/StatDictEvent/del',
        params: {
            cmd
        },
        method: 'get'
    });
}
