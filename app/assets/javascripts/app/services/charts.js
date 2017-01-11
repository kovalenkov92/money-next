import http from './http';

export function getPieChart(filters) {
  let url = '/charts/pie_chart?';
  Object.keys(filters).forEach(key => url += `${key}=${filters[key]}&`);
  return http.get({url})
}

export function getAreaChart(filters) {
  let url = '/charts/area_chart?';
  Object.keys(filters).forEach(key => url += `${key}=${filters[key]}&`);
  return http.get({url})
}
