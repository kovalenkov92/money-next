class ChartsController < ApplicationController

  def pie_chart
    arr = []
    query = Expense.search_query params
    expenses = Expense.find_by_sql(query.to_sql)
    $preloader.preload expenses, :category
    expenses.group_by { |el| el.category }.values.each do |exp|
      arr << { name: exp.first.category.title, y: exp.map(&:amount).sum }
    end
    render json: { chart: arr }
  end

  def area_chart
    start_date =  Date.parse(params[:from_date])
    end_date = Date.parse(params[:to_date])
    query = Expense.search_query params
    expenses = Expense.find_by_sql(query.to_sql)
    $preloader.preload expenses, :category
    arr = []
    while start_date < end_date
      in_range = expenses.select{ |e| (start_date.beginning_of_day..start_date.end_of_day).cover? e.date }
      arr << in_range.map(&:amount).sum
      start_date += 1.day
    end
    x_axis = end_date.downto(Date.parse(params[:from_date]))
                 .map{ |e| e.strftime('%Y-%m-%d') }
                 .reverse
    render json: { data: arr, xAxis: x_axis }
  end

end
