import { fetch } from 'utils/fetch'

export function getVersions() {
  return fetch({
    url: 'index.php?s=/Api/Stat/getVersions',
    method: 'get'
  });
}

export function getChannels() {
  return fetch({
    url: 'index.php?s=/Api/Stat/getChannels',
    method: 'get'
  });
}

export function getCountrys() {
  return fetch({
    url: 'index.php?s=/Api/Stat/getCountrys',
    method: 'get'
  });
}

export function getPlatforms() {
  return fetch({
    url: 'index.php?s=/Api/Stat/getPlatforms',
    method: 'get'
  });
}

export function getNewOlds() {
  return fetch({
    url: 'index.php?s=/Api/Stat/getNewOlds',
    method: 'get'
  });
}

export function getData(reportId, search, groupBy) {
  if (!groupBy) groupBy = 'stat_time';
  return fetch({
    url: `index.php?s=/Api/Stat/getData`,
    method: 'get',
    params: { reportId, groupBy, search }
  });
}

export function getMenus() {
  return fetch({
    url: `index.php?s=/Api/Stat/getMenus`,
    method: 'get'
  });
}

export function getDesign(designId) {
  return fetch({
    url: `index.php?s=/Api/Stat/getDesign`,
    method: 'get',
    params: { designId }
  });
}

export function getSourceInfo(type, id) {
  return fetch({
    url: `index.php?s=/Api/Stat/getSourceInfo`,
    method: 'get',
    params: { type, id }
  });
}

export function getSourceCol(type, param, field, group, search) {
  return fetch({
    url: `index.php?s=/Api/Stat/getCol`,
    method: 'get',
    params: { type, field, group, param, search }
  });
}
