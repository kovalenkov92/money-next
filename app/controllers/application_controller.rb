class ApplicationController < ActionController::Base

  include ApplicationHelper
  include SessionsHelper

  before_action :set_locale
  before_action :authenticate_user

  protect_from_forgery with: :exception

  rescue_from Exception, with: :catch_exceptions

  def authenticate_user
    respond_with_errors unless current_session
  end

  private

  def respond_with_errors
    render json: {errors: ['You shall not pass!'] }, status: :unauthorized
  end

  def catch_exceptions(e)

    if e.kind_of? CanCan::AccessDenied
      authenticate_user
    end

    raise
  end

  def set_locale
    locale = params[:locale] || cookies[:locale ] || 'ua'
    locale = 'ua' unless %w(ua en).include?(locale)
    I18n.locale = locale
    cookies.permanent[:locale] = I18n.locale
  end

  def default_url_options(options={})
    { locale: I18n.locale }
  end
end
