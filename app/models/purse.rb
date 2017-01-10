class Purse < ActiveRecord::Base

  belongs_to :currency

  def self.search_query(params)
    purses = Purse.arel_table

    q = purses
            .project(Arel.star)
            .group(purses[:id])

    if Purse.column_names.include?(params[:sort_column]) && %w(asc desc).include?(params[:sort_type])
        q.order(purses[params[:sort_column]].send(params[:sort_type] == 'asc' ? :asc : :desc))
    else
        q.order(purses[:id].desc)
    end

    q.where(purses[:id].eq(params[:id])) if params[:id].present?
    q.where(purses[:title].matches("%#{params[:title]}%")) if params[:title].present?
    q.where(purses[:created_at].in(Date.parse(params[:created_at]).beginning_of_day..Date.parse(params[:created_at]).end_of_day)) if params[:created_at].present?
    q.where(purses[:updated_at].in(Date.parse(params[:updated_at]).beginning_of_day..Date.parse(params[:updated_at]).end_of_day)) if params[:updated_at].present?

    q
  end

  private

end
