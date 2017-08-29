import {fetch} from 'utils/fetch';

export function login(username, password) {

    const data = {
        username,
        password
    };

    return fetch({
        url: 'http://ophwtest.yoyo-corp.com/index.php?s=/Api/admin/login',
        method: 'post',
        data
    });
}

export function logout() {
    return fetch({
        url: 'http://ophwtest.yoyo-corp.com/index.php?s=/Api/admin/logout',
        method: 'post'
    });
}

export function getInfo(token) {
    return fetch({
        url: 'http://ophwtest.yoyo-corp.com/index.php?s=/Api/admin/getUserInfo',
        method: 'get',
        // params: {token}
    });
}

