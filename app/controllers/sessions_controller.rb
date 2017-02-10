class SessionsController < ApplicationController

  skip_before_filter :authenticate_user, only: [:create, :check]

  def destroy
    sign_out
    render json: { ok: true }
  end

  def create
    @user = User.find_by_email params[:email]

    if @user && @user.authenticate(params[:password])
      token = sign_in @user
      render json: { session_token: token}
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
