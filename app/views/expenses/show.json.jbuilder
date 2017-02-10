json.expense do
  json.id @expense.id
  json.created_at time_ago_in_words(@expense.created_at) + ' ' + t('datetime.ago') + ' ' + t('datetime.at') + ' ' + @expense.created_at.strftime('%H:%M')
  json.amount @expense.amount
  json.comment @expense.comment
  json.date @expense.date
  json.category_id @expense.category_id
  json.category_title @expense.category.try(:title)
  json.purse_id @expense.purse_id
  json.updated_at @expense.updated_at
end
