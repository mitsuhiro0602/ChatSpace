class PostsController < ApplicationController
  before_action :set_group
    def index
      @post = Post.new
      @posts = @group.posts.includes(:user)
    end

    def create
      @post = @group.posts.new(post_params)
      if @post.save
        redirect_to group_posts_path(@group), notice: 'メッセージが送信されました。'
      else
        @posts = @group.posts.includes(:user)
        flash.now[:alert] = 'メッセージを入力してください。'
        render :index
      end
    end

    private

    def post_params
      params.require(:post).permit(:text, :image).merge(user_id: current_user.id)
    end

    def set_group
      @group = Group.find(params[:group_id])
    end
end
