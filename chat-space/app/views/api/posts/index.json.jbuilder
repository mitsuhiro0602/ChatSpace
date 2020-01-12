json.array! @posts do |post|
  json.text post.text
  json.image post.image.url
  json.created_at post.created_at.strftime("%Y年%M月%d日 %H時M分")
  json.user_name post.user.name
  json.id post.id
end
