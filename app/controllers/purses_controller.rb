class PursesController < ApplicationController

  load_and_authorize_resource :purse

  before_action :convince_pagination

  def index
    query = Purse.search_query params
    count_query = query.clone.project('COUNT(*)')

    @purses = Purse.find_by_sql(query.take(@per_page).skip((@page - 1) * @per_page).to_sql)
    $preloader.preload @purses, :currency
    @count = Purse.find_by_sql(count_query.to_sql).count
  end

  def create
    @purse = Purse.new purse_params

    if @purse.save
      render json: { message: I18n.t('purse.messages.success_upsert') }
    else
      render json: {errors: @purse.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    if @purse.update_attributes purse_params
      render json: { message: I18n.t('purse.messages.success_upsert') }
    else
      render json: { errors: @purse.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @purse.destroy
    render json: {ok: true}
  end

  def show

  end

  # related models actions

  private

  def purse_params
    params.require(:purse).permit!
  end

  def convince_pagination
    @page = params[:page].to_i
    @page = 1 if @page < 1
    @per_page = params[:per_page].to_i
    @per_page = 10 if @per_page < 1
  end

end
