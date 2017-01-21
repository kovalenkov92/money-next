import http from './http';

export function getPieChart(filters) {
  let url = '/charts/pie_chart?';
  Object.keys(filters).forEach(key => url += `${key}=${filters[key]}&`);
  return http.get({url})
}

export function getBarChart(filters) {
  let url = '/charts/bar_chart?';
  Object.keys(filters).forEach(key => url += `${key}=${filters[key]}&`);
  return http.get({url})
}
