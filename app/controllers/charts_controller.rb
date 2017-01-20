class ChartsController < ApplicationController

  def pie_chart
    labels = []
    data = []
    colors = []
    query = Expense.search_query params
    expenses = Expense.find_by_sql(query.to_sql)
    expenses.group_by { |el| el['category_id'] }.values.each do |exp|
      labels << exp.first['category_title']
      colors << exp.first['category_color']
      data << exp.map(&:amount).sum
    end
    render json: { labels: labels, colors: colors, data: data }
  end

  def area_chart
    start_date =  Date.parse(params[:from_date])
    end_date = Date.parse(params[:to_date])
    query = Expense.search_query params
    expenses = Expense.find_by_sql(query.to_sql)
    arr = []
    while start_date <= end_date
      in_range = expenses.select{ |e| (start_date.beginning_of_day..start_date.end_of_day).cover? e.date }
      arr << in_range.map(&:amount).sum
      start_date += 1.day
    end
    x_axis = end_date.downto(Date.parse(params[:from_date]))
                 .map{ |e| e.strftime('%d %b %Y') }
                 .reverse
    render json: { data: arr, xAxis: x_axis, total: arr.sum }
  end

end
