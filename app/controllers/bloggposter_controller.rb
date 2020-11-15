class BloggposterController < ApplicationController
  def ortogonalitet
  end

  def fordeler
  end

  def rammeverk
    url = URI("https://gbfs.urbansharing.com/oslobysykkel.no/station_status.json")
    https = Net::HTTP.new(url.host, url.port);
    https.use_ssl = true
    request = Net::HTTP::Get.new(url)
    response = https.request(request)
  
    @sykkelhash = JSON.parse(response.read_body)["data"]["stations"]
  
    url = URI("https://gbfs.urbansharing.com/oslobysykkel.no/station_information.json")
    https = Net::HTTP.new(url.host, url.port);
    https.use_ssl = true
    request = Net::HTTP::Get.new(url)
    response = https.request(request)
  
    @stasjonsinfo = JSON.parse(response.read_body)["data"]["stations"]
  
    @id_hash = {}
  
    @stasjonsinfo.each do |element| 
      @id_hash[element["station_id"]] = element["name"]
    end
  end
end
