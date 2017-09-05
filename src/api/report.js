import { fetch } from 'utils/fetch'

export function catList(catId) {
  return fetch({
    url: 'index.php?s=/Api/Report/catList',
    method: 'get',
    params: { catId }
  });
};

export function catInfo(catId) {
  return fetch({
    url: 'index.php?s=/Api/Report/catInfo',
    method: 'get',
    params: { catId }
  });
};

export function catEdit(info) {
  return fetch({
    url: 'index.php?s=/Api/Report/catEdit',
    method: 'get',
    params: { ...info }
  });
};

export function catDelete(catId) {
  return fetch({
    url: 'index.php?s=/Api/Report/catDelete',
    method: 'get',
    params: { catId }
  });
};
