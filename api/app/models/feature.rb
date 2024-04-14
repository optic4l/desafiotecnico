class Feature < ApplicationRecord
    validates :title, presence: true
    validates :external_url, presence: true
    validates :place, presence: true
    validates :mag_type, presence: true
    validates :coordinates, presence: true

    validates :magnitude, numericality: {greater_than_or_equal_to: -1.0, less_than_or_equal_to: 10.0}

    validate :validate_coordinates_keys
    validate :validate_coordinates_range

    has_many :comments


    private

    def validate_coordinates_keys
        return unless  !coordinates.key?('longitude') || !coordinates.key?('latitude')

        errors.add(:coordinates, "se requiere de una estructura de longitud y latitud para las coordenadas")
    end

    def validate_coordinates_range
        return unless coordinates.present?

        longitude = coordinates['longitude']
        latitude = coordinates['latitude']

        unless (-180.0..180.0).cover?(longitude)
            errors.add(:coordinates, "La longitud debe estar dentro del rango [-180.0, 180.0]")
        end

        unless (-90.0..90.0).cover?(latitude)
            errors.add(:latitude, "La latitud debe estar dentro del rango [-90.0, 90.0]")
        end
    end


end
