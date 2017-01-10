json.currency do
  json.id @currency.id
  json.created_at time_ago_in_words(@currency.created_at) + ' ' + t('datetime.ago') + ' ' + t('datetime.at') + ' ' + @currency.created_at.strftime("%H:%M")
  json.title @currency.title
  json.symbol @currency.symbol
  json.created_at @currency.created_at
  json.updated_at @currency.updated_at
end
