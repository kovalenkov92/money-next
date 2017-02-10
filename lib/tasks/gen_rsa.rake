namespace :rsa do
  desc 'Generate rsa for JWT'
  task generate: :environment do
    sh "ssh-keygen -t rsa -b 2048 -f #{Rails.env}.rsa -P ''"
  end

end
