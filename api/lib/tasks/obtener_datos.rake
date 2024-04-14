require 'rest-client'
require 'json'

namespace :obtener_datos do
    desc "Obtener datos sismologicos"
    task :ejecutar => :environment do
        url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson'

        begin
            response = RestClient.get(url)
            if response.code == 200
                datos_sismologicos = JSON.parse(response.body)
                procesar_datos (datos_sismologicos)
            else
                puts "Error al obtener los datos sismologicos."
            end

        rescue RestClient::ExceptionWithResponse => e 
            puts "Error al realizar la solicitud HTTP: #{e.message}"
        end
    end
end

def procesar_datos(datos)
    if datos.nil?
        puts "No se pueden procesar datos nulos"
        return
    end

    features = datos['features']
    
    features.each do |feature|
        properties = feature['properties']
        coordinates = feature['geometry']['coordinates']
        
        next if properties['title'].nil? || properties['url'].nil? || properties['magType'].nil? || coordinates.nil? || coordinates.size != 3

        next unless ( properties['mag'] >= -1.0 && properties['mag'] <= 10.0) && (coordinates[0] >= -180.0  && coordinates[0] <= 180.0 ) && (coordinates[1]  >= -90.0 && coordinates[1] <= 90.0)

        Feature.find_or_initialize_by(external_id: feature['id']).tap do |instance| 
            instance.magnitude = properties['mag']
            instance.place = properties['place']
            instance.time = properties['time']
            instance.tsunami = properties['tsunami']
            instance.mag_type = properties['magType']
            instance.title = properties['title']
            instance.coordinates = {longitude: coordinates[0], latitude: coordinates[1]}
            instance.external_url = properties['url']

            instance.save
        end
    end
end
