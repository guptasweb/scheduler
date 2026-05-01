class CreatePosts < ActiveRecord::Migration[7.1]
  def change
    create_table :posts do |t|
      t.string :title, null: false
      t.text :post_text, null: false
      t.datetime :scheduled_date, null: false
      t.string :status, default: "scheduled", null: false

      t.timestamps
    end

    add_index :posts, :scheduled_date
    add_index :posts, :status
  end
end
