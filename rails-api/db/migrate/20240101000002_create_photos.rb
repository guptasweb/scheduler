class CreatePhotos < ActiveRecord::Migration[7.1]
  def change
    create_table :photos do |t|
      t.references :post, null: false, foreign_key: true
      t.string :image_url, null: false
      t.string :caption

      t.timestamps
    end
  end
end
