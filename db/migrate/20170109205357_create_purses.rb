class CreatePurses < ActiveRecord::Migration[5.0]
  def change
    create_table :purses do |t|
      t.string :title
      t.integer :currency_id
      t.datetime :created_at
      t.datetime :updated_at
    end
  end
end
