json.expense do
  json.id @expense.id
  json.created_at time_ago_in_words(@expense.created_at) + ' ' + t('datetime.ago') + ' ' + t('datetime.at') + ' ' + @expense.created_at.strftime('%H:%M')
  json.amount @expense.amount
  json.comment @expense.comment
  json.date @expense.date
  json.category do
    json.id @expense.category.id
    json.title @expense.category.title
  end
  json.purse do
    json.id @expense.purse.id
    json.title @expense.purse.title
  end
  json.updated_at @expense.updated_at
end
