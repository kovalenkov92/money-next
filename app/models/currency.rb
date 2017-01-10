class Currency < ActiveRecord::Base



  def self.search_query(params)
    currencies = Currency.arel_table

    q = currencies
            .project(Arel.star)
            .group(currencies[:id])

    if Currency.column_names.include?(params[:sort_column]) && %w(asc desc).include?(params[:sort_type])
        q.order(currencies[params[:sort_column]].send(params[:sort_type] == 'asc' ? :asc : :desc))
    else
        q.order(currencies[:id].desc)
    end

    q.where(currencies[:id].eq(params[:id])) if params[:id].present?
    q.where(currencies[:title].matches("%#{params[:title]}%")) if params[:title].present?
    q.where(currencies[:symbol].matches("%#{params[:symbol]}%")) if params[:symbol].present?
    q.where(currencies[:created_at].in(Date.parse(params[:created_at]).beginning_of_day..Date.parse(params[:created_at]).end_of_day)) if params[:created_at].present?
    q.where(currencies[:updated_at].in(Date.parse(params[:updated_at]).beginning_of_day..Date.parse(params[:updated_at]).end_of_day)) if params[:updated_at].present?

    q
  end

  private

end
