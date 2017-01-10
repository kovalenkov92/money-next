import http from './http';

export function all(filters) {
  let url = '/purses.json?';
  Object.keys(filters).forEach(key => url += `${key}=${filters[key]}&`);
  return http.get({url})
}
export function upsert(model){
  let body = new FormData();

  body.append('purse[title]', model.title || '' );
  if (model.currency)
    body.append('purse[currency_id]', model.currency.id);

  if(model.id){
    return http.put({ url:`/purses/${model.id}`, body })
  }else{
    return http.post({ url:'/purses', body })
  }
}

export function show(id){
  return http.get({url:`/purses/${id}.json`})
}

export function destroy(id){
  return http.delete({url:`/purses/${id}`})
}
