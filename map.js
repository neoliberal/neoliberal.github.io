function popDefine(twit, uri){
  if (uri){
    a = '<br><br><a href="' + uri + '" target="_blank">Meetup Page</a>'
  }
  else{
    a = ""
  }
  if (twit){
    b = '<br><br><a href="' + twit + '" target="_blank">@' + twit.split("/")[3] + '</a>'
  }
  else{
    b = ""
  }
  return a+b
}

var chapters = L.geoJSON(pts, {
  onEachFeature: function(feature, layer){
    layer.bindPopup(
      //console.log(popDefine(feature.properties.twitter, feature.properties.URL))
      '<center><b>' + feature.properties.Name + '</b>' + popDefine(feature.properties.twitter, feature.properties.URL) + '</center>'
    )
  }
});

var map = L.map('MAP').setMaxBounds(L.latLngBounds(L.latLng(-172.0,-57.0), L.latLng(-179.4,71.2))).fitBounds(chapters.getBounds().pad(0.2)).addLayer(chapters);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  noWrap: false
}).addTo(map);
