import http from './http';

export function all(filters) {
  let url = '/expenses.json?';
  Object.keys(filters).forEach(key => url += `${key}=${filters[key]}&`);
  return http.get({url})
}
export function upsert(model){
  let body = new FormData();

  body.append('expense[amount]', model.amount || '' );
  body.append('expense[comment]', model.comment || '' );
  body.append('expense[date]', model.date || '' );
  if (model.category)
    body.append('expense[category_id]', model.category.id );
  if (model.purse)
    body.append('expense[purse_id]', model.purse.id );

  if(model.id){
    return http.put({ url:`/expenses/${model.id}`, body })
  }else{
    return http.post({ url:'/expenses', body })
  }
}

export function show(id){
  return http.get({url:`/expenses/${id}.json`})
}

export function destroy(id){
  return http.delete({url:`/expenses/${id}`})
}
