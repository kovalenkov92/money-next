module SessionsHelper

  PRIVATE_KEY = OpenSSL::PKey::RSA.new File.read "#{Rails.env}.rsa"

  def sign_in(user)
    payload = {uid: user.id}
    token = build_token payload
    cookies.permanent[:session_token] = token
    self.current_user = user
    token
  end

  def current_user
    @current_user ||= User.find(current_session['uid']) if current_session
  end

  def current_session
    token = [cookies[:session_token], params[:session_token], request.headers['Session-Token']].compact.first
    decoded_token = JWT.decode token, PRIVATE_KEY.public_key, true, {:algorithm => 'RS256'}
    decoded_token.first
    rescue Exception => e
    puts "Error parsing token: --------------- #{e.message}"
  end

  def sign_out
    cookies.permanent[:session_token] = nil
    self.current_user = nil
  end

  def current_user=(user)
    @current_user = user
  end

  def build_token(payload)
    JWT.encode payload, PRIVATE_KEY, 'RS256'
  end

end
