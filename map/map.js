function popDefine(twit, uri){
  if (uri){
    a = '<br><br><a href="' + uri + '" target="_blank">Chapter Sign-up</a>'
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
    pointToLayer: function(feature, cords){
      if (feature.properties.active){
        var marker = L.marker(cords);
        marker.bindPopup('<center><b>' + feature.properties.Name + '</b>' + popDefine(feature.properties.twitter, feature.properties.URL) + '</center>')
        return marker
    }
  }
});

var map = L.map('MAP').setMaxBounds(L.latLngBounds(L.latLng(71.2,179.4), L.latLng(-57.0,-172.0))).fitBounds(chapters.getBounds().pad(0.1)).addLayer(chapters);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  noWrap: false
}).addTo(map);