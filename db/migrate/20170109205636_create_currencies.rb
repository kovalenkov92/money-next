class CreateCurrencies < ActiveRecord::Migration[5.0]
  def change
    create_table :currencies do |t|
      t.string :title
      t.string :symbol
      t.datetime :created_at
      t.datetime :updated_at
    end
  end
end
