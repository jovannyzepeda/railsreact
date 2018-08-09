# == Schema Information
#
# Table name: posts
#
#  id               :integer          not null, primary key
#  html_content     :text
#  markdown_content :text             not null
#  user_id          :integer
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#
# Indexes
#
#  index_posts_on_user_id  (user_id)
#

class Post < ApplicationRecord
  belongs_to :user
  validates :markdown_content, presence: true, length: {minimum: 2}
  has_many :images
  after_save :update_images
  #after_create :push_to_web_sockets

  #atributo virtual para guardar datos, permite enviar atributos en el permit adicionales
  attr_accessor :image_ids


  def self.latest
  	order(id: :desc)
  end



  private
  def update_images
  	Image.where(post_id: nil).where(id: image_ids)
  		.update_all(post_id: self.id)
      push_to_web_sockets
  end
  #publicar en tiempo real (revisar post_channel y post coffee asi cono el channel.yml)
  #el prefijo _changed? sirve para ejecutar funcion solo al cambiar el campo previo
  def push_to_web_sockets
    if created_at_changed?
      ActionCable.server.broadcast("posts", 
        data: json_view
      )
    end
  end
  #con esta funcion despues de crear el post se renderiza el json que se ocupa para mostrar en react
  def json_view
    ApplicationController.renderer.render(partial: "posts/post.json.jbuilder", locals: {post: self})
  end
end
