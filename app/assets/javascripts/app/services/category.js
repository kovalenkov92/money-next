import http from './http';

export function all(filters) {
  let url = '/categories.json?';
  Object.keys(filters).forEach(key => url += `${key}=${filters[key]}&`);
  return http.get({url})
}
export function upsert(model){
  let body = new FormData();

  body.append('category[title]', model.title || '' );

  if(model.id){
    return http.put({ url:`/categories/${model.id}`, body })
  }else{
    return http.post({ url:'/categories', body })
  }
}

export function show(id){
  return http.get({url:`/categories/${id}.json`})
}

export function destroy(id){
  return http.delete({url:`/categories/${id}`})
}
