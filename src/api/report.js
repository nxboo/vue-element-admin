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
    method: 'post',
    data: { ...info }
  });
};

export function catDelete(catId) {
  return fetch({
    url: 'index.php?s=/Api/Report/catDelete',
    method: 'get',
    params: { catId }
  });
};

export function reportList(reportId, keyword) {
  return fetch({
    url: 'index.php?s=/Api/Report/reportList',
    method: 'get',
    params: { reportId, keyword }
  });
};

export function reportInfo(reportId) {
  return fetch({
    url: 'index.php?s=/Api/Report/reportInfo',
    method: 'get',
    params: { reportId }
  });
};

export function reportEdit(info) {
  return fetch({
    url: 'index.php?s=/Api/Report/reportEdit',
    method: 'post',
    data: { ...info }
  });
};

export function reportDelete(reportId) {
  return fetch({
    url: 'index.php?s=/Api/Report/reportDelete',
    method: 'get',
    params: { reportId }
  });
};
