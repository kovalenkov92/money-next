class ChartsController < ApplicationController

  def pie_chart
    query = Expense.search_query params
    expenses = Expense.find_by_sql(query.to_sql)

    labels, data, colors = [], [], []
    expenses.group_by { |el| el['category_id'] }.values.each do |exp|
      labels << exp.first['category_title']
      colors << exp.first['category_color']
      data << exp.map(&:amount).sum
    end

    render json: {labels: labels, colors: colors, data: data}
  end

  def bar_chart
    start_date = Date.parse(params[:from_date])
    end_date = Date.parse(params[:to_date])
    step = params[:step].to_i

    query = Expense.search_query params
    expenses = Expense.find_by_sql(query.to_sql)
    categories, x_axis = [], []

    expenses.group_by { |el| el['category_id'] }.values.each do |exp|
      data = []
      start_date.step(end_date, step).each do |date|
        data << exp.select { |expense| (date.beginning_of_day..(date + (step - 1).days).end_of_day).cover? expense.date }.map(&:amount).sum
      end
      categories << { label: exp.first['category_title'], color: exp.first['category_color'], data: data }
    end

    start_date.step(end_date, step).each do |date|
      x_axis << (step == 1 ? date.strftime('%d %b %Y') : "#{date.strftime('%d %b %Y')} - #{(date + (step - 1).days).strftime('%d %b %Y')}")
    end

    render json: {categories: categories, xAxis: x_axis, total: expenses.map(&:amount).sum}
  end

end
