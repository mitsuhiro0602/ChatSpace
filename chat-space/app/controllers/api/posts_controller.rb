class Api::PostsController < ApplicationController
  def index
    group = Group.find(prams[:group_id])
    last_message_id = params[:id].to_i
    @messages = group.message.includes(:user).where("id > #{last_message_id}")
  end
end
