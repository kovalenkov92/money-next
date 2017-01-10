json.categories @categories.each do |category|
  json.id category.id
  json.created_at time_ago_in_words(category.created_at) + ' ' + t('datetime.ago') + ' ' + t('datetime.at') + ' ' + category.created_at.strftime("%H:%M")
  
  json.title category.title
  
  
end
json.count @count