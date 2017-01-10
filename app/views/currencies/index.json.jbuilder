json.currencies @currencies.each do |currency|
  json.id currency.id
  json.created_at time_ago_in_words(currency.created_at) + ' ' + t('datetime.ago') + ' ' + t('datetime.at') + ' ' + currency.created_at.strftime("%H:%M")
  
  json.title currency.title
  
  
  json.symbol currency.symbol
  
  
end
json.count @count