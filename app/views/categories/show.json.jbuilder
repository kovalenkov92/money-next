json.category do
  json.id @category.id
  json.created_at time_ago_in_words(@category.created_at) + ' ' + t('datetime.ago') + ' ' + t('datetime.at') + ' ' + @category.created_at.strftime("%H:%M")
  json.title @category.title
  json.color @category.color
  json.created_at @category.created_at
  json.updated_at @category.updated_at
end
