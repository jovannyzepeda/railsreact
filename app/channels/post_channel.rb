class PostChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    stream_from "posts"
  end

  def say_hi
  	#puts "hola a todo"
  	ActionCable.server.broadcast("posts", 
  		str: "hola mundo"
  	)
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
