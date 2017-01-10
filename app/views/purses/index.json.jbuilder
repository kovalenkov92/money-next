json.purses @purses.each do |purse|
  json.id purse.id
  json.created_at time_ago_in_words(purse.created_at) + ' ' + t('datetime.ago') + ' ' + t('datetime.at') + ' ' + purse.created_at.strftime('%H:%M')
  json.title purse.title
  json.currency purse.currency.title
end
json.count @count
