class CampSerializer < ActiveModel::Serializer
  attributes :id, :name, :location, :description
  has_many :activities
end
