class SessionsController < ApplicationController

  skip_before_filter :authenticate_user, only: [:create, :check]

  def destroy
    sign_out
    render json: { ok: true }
  end

  def create
    @user = User.find_by_email params[:email]

    if @user && !@user.confirmed?
      render json: { errors: ['You did not confirm your email.'] }, status: :unprocessable_entity and return
    end

    if @user && @user.authenticate(params[:password])
      sign_in @user
      render json: { session_token: current_session.token}
    else
      render json: { errors: ['Wrong email/password combination.'] }, status: :unprocessable_entity
    end
  end

  def check
    if current_user
      render json: { current_user: { email: current_user.email, role: current_user.role.name }}
    else
      render json: { errors: ['You shall not pass!'] }, status: :unauthorized
    end
  end
end
