namespace :npm do
  desc 'Install javascript dependencies'
  task install: :environment do
    sh 'npm install'
  end

end