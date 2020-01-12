json.user_name @post.user.name
json.created_at @post.created_at.strftime("%Y/%m/%d %H:%M")
json.text @post.text
json.image @post.image_url
json.id @post.id
