json.purse do
  json.id @purse.id
  json.created_at time_ago_in_words(@purse.created_at) + ' ' + t('datetime.ago') + ' ' + t('datetime.at') + ' ' + @purse.created_at.strftime("%H:%M")
  json.title @purse.title
  json.currency do
    json.id @purse.currency.id
    json.title @purse.currency.title
  end
  json.updated_at @purse.updated_at
end
