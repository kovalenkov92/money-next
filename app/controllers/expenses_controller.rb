class ExpensesController < ApplicationController

  load_and_authorize_resource :expense

  def index
    query = Expense.search_query params

    count_query = query.clone.project('COUNT(*)')

    @expenses = Expense.find_by_sql(query.take(10).skip((params[:page].to_i - 1) * 10).to_sql)
    @count = Expense.find_by_sql(count_query.to_sql).count
  end

  def create
    @expense = Expense.new expense_params

    if @expense.save
      render json: { message: I18n.t('expense.messages.success_upsert') }
    else
      render json: {errors: @expense.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    if @expense.update_attributes expense_params
      render json: { message: I18n.t('expense.messages.success_upsert') }
    else
      render json: { errors: @expense.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @expense.destroy
    render json: {ok: true}
  end

  def show

  end

  # related models actions

  private

  def expense_params
    params.require(:expense).permit!
  end

end
