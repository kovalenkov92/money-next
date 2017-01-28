class CategoriesController < ApplicationController

  load_and_authorize_resource :category

  before_action :convince_pagination

  def index
    query = Category.search_query params

    count_query = query.clone.project('COUNT(*)')

    @categories = Category.find_by_sql(query.take(@per_page).skip((@page - 1) * @per_page).to_sql)
    @count = Category.find_by_sql(count_query.to_sql).count
  end

  def create
    @category = Category.new category_params

    if @category.save
      render json: { message: I18n.t('category.messages.success_upsert') }
    else
      render json: {errors: @category.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    if @category.update_attributes category_params
      render json: { message: I18n.t('category.messages.success_upsert') }
    else
      render json: { errors: @category.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @category.destroy
    render json: {ok: true}
  end

  def show

  end

  # related models actions

  private

  def category_params
    params.require(:category).permit!
  end

  def convince_pagination
    @page = params[:page].to_i
    @page = 1 if @page < 1
    @per_page = params[:per_page].to_i
    @per_page = 10 if @per_page < 1
  end

end
