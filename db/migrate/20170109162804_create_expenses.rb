class CreateExpenses < ActiveRecord::Migration[5.0]
  def change
    create_table :expenses do |t|
      t.float :amount
      t.text :comment
      t.datetime :date
      t.integer :category_id
      t.datetime :created_at
      t.datetime :updated_at
    end
  end
end
