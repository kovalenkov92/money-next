class Expense < ActiveRecord::Base

  belongs_to :category
  belongs_to :purse

  validates_presence_of :amount, :date, :category, :purse

  def self.search_query(params)
    expenses = Expense.arel_table
    categories = Category.arel_table

    q = expenses
            .project('expenses.*',
              categories[:id].as('category_id'),
              categories[:title].as('category_title'),
              categories[:color].as('category_color'))
            .join(categories).on(expenses[:category_id].eq(categories[:id]))
            .group(expenses[:id])

    if Expense.column_names.include?(params[:sort_column]) && %w(asc desc).include?(params[:sort_type])
        q.order(expenses[params[:sort_column]].send(params[:sort_type] == 'asc' ? :asc : :desc))
    else
        q.order(expenses[:id].desc)
    end

    q.where(expenses[:id].eq(params[:id])) if params[:id].present?
    q.where(expenses[:comment].matches("%#{params[:comment]}%")) if params[:comment].present?
    q.where(expenses[:date].gteq(Date.parse(params[:from_date]).beginning_of_day)) if params[:from_date].present?
    q.where(expenses[:date].lteq(Date.parse(params[:to_date]).end_of_day)) if params[:to_date].present?
    q.where(expenses[:date].in(Date.parse(params[:date]).beginning_of_day..Date.parse(params[:date]).end_of_day)) if params[:date].present?
    q.where(expenses[:created_at].in(Date.parse(params[:created_at]).beginning_of_day..Date.parse(params[:created_at]).end_of_day)) if params[:created_at].present?
    q.where(expenses[:updated_at].in(Date.parse(params[:updated_at]).beginning_of_day..Date.parse(params[:updated_at]).end_of_day)) if params[:updated_at].present?
    q.where(categories[:title].matches("%#{params[:category]}%")) if params[:category].present?

    q.group(expenses[:id], categories[:id], categories[:title], categories[:color])

    q
  end

  private

end
