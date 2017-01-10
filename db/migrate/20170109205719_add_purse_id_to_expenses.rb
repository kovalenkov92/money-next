class AddPurseIdToExpenses < ActiveRecord::Migration[5.0]
  def change
    add_column :expenses, :purse_id, :integer
    add_index :expenses, :purse_id
  end
end
