class CurrenciesController < ApplicationController

  load_and_authorize_resource :currency

  before_action :convince_pagination

  def index
    query = Currency.search_query params

    count_query = query.clone.project('COUNT(*)')

    @currencies = Currency.find_by_sql(query.take(@per_page).skip((@page - 1) * @per_page).to_sql)
    @count = Currency.find_by_sql(count_query.to_sql).count
  end

  def create
    @currency = Currency.new currency_params

    if @currency.save
      render json: { message: I18n.t('currency.messages.success_upsert') }
    else
      render json: {errors: @currency.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    if @currency.update_attributes currency_params
      render json: { message: I18n.t('currency.messages.success_upsert') }
    else
      render json: { errors: @currency.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @currency.destroy
    render json: {ok: true}
  end

  def show

  end

  # related models actions

  private

  def currency_params
    params.require(:currency).permit!
  end

  def convince_pagination
    @page = params[:page].to_i
    @page = 1 if @page < 1
    @per_page = params[:per_page].to_i
    @per_page = 10 if @per_page < 1
  end


end
