import http from './http';

export function all(filters) {
  let url = '/currencies.json?';
  Object.keys(filters).forEach(key => url += `${key}=${filters[key]}&`);
  return http.get({url})
}
export function upsert(model){
  let body = new FormData();

  body.append('currency[title]', model.title || '' );
  body.append('currency[symbol]', model.symbol || '' );

  if(model.id){
    return http.put({ url:`/currencies/${model.id}`, body })
  }else{
    return http.post({ url:'/currencies', body })
  }
}

export function show(id){
  return http.get({url:`/currencies/${id}.json`})
}

export function destroy(id){
  return http.delete({url:`/currencies/${id}`})
}
