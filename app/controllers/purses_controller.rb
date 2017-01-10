class PursesController < ApplicationController

  load_and_authorize_resource :purse

  def index
    query = Purse.search_query params

    count_query = query.clone.project('COUNT(*)')

    @purses = Purse.find_by_sql(query.take(10).skip((params[:page].to_i - 1) * 10).to_sql)
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

end
