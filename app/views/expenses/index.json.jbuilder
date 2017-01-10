json.expenses @expenses.each do |expense|
  json.id expense.id
  json.created_at time_ago_in_words(expense.created_at) + ' ' + t('datetime.ago') + ' ' + t('datetime.at') + ' ' + expense.created_at.strftime('%H:%M')
  json.amount expense.amount
  json.comment expense.comment
  json.date expense.date.strftime('%d %b %Y')
  json.category expense.category.try(:title)
end
json.count @count
