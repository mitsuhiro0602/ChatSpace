class TweetsController < ApplicationController
  def index
    @tweets = Tweet.all
  end

  def new
  end

  def create
     Tweet.create(name: "", image: "", text: "")
   end
end
