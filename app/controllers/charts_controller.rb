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

  def bar_chart
    start_date =  Date.parse(params[:from_date])
    end_date = Date.parse(params[:to_date])
    step = params[:step].to_i

    query = Expense.search_query params
    expenses = Expense.find_by_sql(query.to_sql)

    arr = []
    x_axis = []
    start_date.step(end_date, step).each do |e|
      arr << expenses.select{ |ex| (e.beginning_of_day..(e + (step - 1).days).end_of_day).cover? ex.date }.map(&:amount).sum
      x_axis << (step == 1 ? e.strftime('%d %b %Y') : "#{e.strftime('%d %b %Y')} - #{(e + (step - 1).days).strftime('%d %b %Y')}")
    end

    render json: { data: arr, xAxis: x_axis, total: arr.sum }
  end

end
