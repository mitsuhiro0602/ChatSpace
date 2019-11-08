class AddnicknameTotweets < ActiveRecord::Migration[5.2]
  def change
    add_column :tweets, :nickname, :text
  end
end
