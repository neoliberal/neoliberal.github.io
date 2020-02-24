function popDefine(twit, uri){
  if (uri){
    a = '<br><br><a href="' + uri + '" target="_blank">Join the Chapter</a>'
  }
  else{
    a = ""
  }
  if (twit){
    b = '<br><br><a href="' + twit + '" target="_blank">Twitter</a>'
  }
  else{
    b = ""
  }
  return a+b
}

icn = new L.Icon({
  iconUrl: 'https://neoliberal.github.io/map/img/marker-icon-2x-red.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34]
});

var chapters = L.geoJSON(pts, {
    pointToLayer: function(feature, cords){
      if (feature.properties.active){
        var marker = L.marker(cords, {icon: icn});
        marker.bindPopup('<center><b>' + feature.properties.Name + '</b>' + popDefine(feature.properties.twitter, feature.properties.URL) + '</center>')
        return marker;
    }
  }
});

var map = L.map('MAP').setMaxBounds(L.latLngBounds(L.latLng(71.2,179.4), L.latLng(-57.0,-172.0))).fitBounds(chapters.getBounds().pad(0.0)).addLayer(chapters);

L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}?access_token={accessToken}, {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  noWrap: false,
  accessToken: 'pk.eyJ1IjoiZ3VlcmlsbGVybyIsImEiOiJjazcwcTRvNWUwMTVhM2VuNnd2eW9rMnV4In0.yJdGmpixRrSx-1Ppzz7u8A'
}).addTo(map);
