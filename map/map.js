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

var map = L.map('MAP', {maxZoom: 8, minZoom: 2}).setMaxBounds(L.latLngBounds(L.latLng(100,179.4), L.latLng(-57.0,-172.0))).fitBounds(chapters.getBounds().pad(0.0)).addLayer(chapters);

L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZ3VlcmlsbGVybyIsImEiOiJja2g2bmhuZDIwMG85MndybXo1OGE3OWhqIn0.wVTGMiNsncWf2pZrBkG9CQ', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  noWrap: false
}).addTo(map);
