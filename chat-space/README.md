# ChatSpace DB設計
## usersテーブル
| Column   | Type   | Options     |
| -------- | ------ | ----------- |
| email    | string | null: false |
| password | string | null: false |
| username | string | null: false |

### Association
- has_many :posts
- has_many :groups

## postsテーブル
|Column|Type|Options|
|------|----|-------|
|text|text||
|image|text||

### Association
- belongs_to :user
- belongs_to :group

## groupsテーブル
| Column     | Type    | Options                        |
| ---------- | ------- | ------------------------------ |
| group_name | text    | null: false                    |
| user_id    | integer | null: false, foreign_key: true |
| posts_id   | integer | null: false, foreign_key: true |

### Association
- has_many :posts
- has_many :groups_users
- has_many :users, through: :groups_users

## groups_usersテーブル
| Column   | Type    | Options                        |
| :------- | :------ | :----------------------------- |
| user_id  | integer | null: false, foreign_key: true |
| group_id | integer | null: false, foreign_key: true |

### Association
-   belongs_to :group
-   belongs_to :user
