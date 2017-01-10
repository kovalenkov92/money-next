class Category < ActiveRecord::Base



  def self.search_query(params)
    categories = Category.arel_table

    q = categories
            .project(Arel.star)
            .group(categories[:id])

    if Category.column_names.include?(params[:sort_column]) && %w(asc desc).include?(params[:sort_type])
        q.order(categories[params[:sort_column]].send(params[:sort_type] == 'asc' ? :asc : :desc))
    else
        q.order(categories[:id].desc)
    end

    q.where(categories[:id].eq(params[:id])) if params[:id].present?
    q.where(categories[:title].matches("%#{params[:title]}%")) if params[:title].present?
    q.where(categories[:created_at].in(Date.parse(params[:created_at]).beginning_of_day..Date.parse(params[:created_at]).end_of_day)) if params[:created_at].present?
    q.where(categories[:updated_at].in(Date.parse(params[:updated_at]).beginning_of_day..Date.parse(params[:updated_at]).end_of_day)) if params[:updated_at].present?

    q
  end

  private

end
