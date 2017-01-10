class CategoriesController < ApplicationController

  load_and_authorize_resource :category

  def index
    query = Category.search_query params

    count_query = query.clone.project('COUNT(*)')

    @categories = Category.find_by_sql(query.take(10).skip((params[:page].to_i - 1) * 10).to_sql)
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

end
