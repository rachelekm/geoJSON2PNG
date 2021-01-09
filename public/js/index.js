'use strict';

const startPage = {
    initMap: function(){
        var map = L.map('mapBox').setView([33.69813, -115.27992], 6);
        map.on('idle', onMapLoad);
        L.tileLayer('https://api.maptiler.com/maps/4dbd4b04-f294-474e-9cc3-418695593a17/{z}/{x}/{y}.png?key=Ig5arvzPKF3OZAwa7PiN',{
          tileSize: 512,
          zoomOffset: -1,
          minZoom: 1,
          attribution: "\u003ca href=\"https://www.maptiler.com/copyright/\" target=\"_blank\"\u003e\u0026copy; MapTiler\u003c/a\u003e \u003ca href=\"https://www.openstreetmap.org/copyright\" target=\"_blank\"\u003e\u0026copy; OpenStreetMap contributors\u003c/a\u003e",
          crossOrigin: true
        }).addTo(map);

        let geojsonFeature = jsonBoundaries;

        function style(feature) {
          return {
              color: '#000000',
              weight: 3,
              opacity: 1, 
              fillOpacity: 1,
              fillColor: startPage.getColor(feature.properties.STATE, feature.properties.CD)
          };
        }
      
        L.geoJson(geojsonFeature, {style: style}).addTo(map);

        function onMapLoad(){
          L.easyPrint({
            title: 'My awesome print button',
            position: 'bottomright',
            sizeModes: ['A4Portrait', 'A4Landscape']
          }).addTo(map);
        }

       /* //add state labels
        let polyStyle = {
          "color": "#000000",
          "weight": 2,
          "opacity": 1,
          "fillOpacity": 1,
          "fillColor": '#FFFFFF'
        };

        for ( var i=0; i < jsonBoundaries.features.length; i++ ) {
          let feat = jsonBoundaries.features[i];
          let coords = [];
          for ( var j = 0 ; j < feat.geometry.coordinates[0].length - 1; j++ ) {
              let coord = feat.geometry.coordinates[0][j];
              let point = [];
              point.push( coord[1], coord[0]);
              coords.push( point );
          }
          map.addLayer(L.polygon( coords, polyStyle ).bindTooltip(feat.properties.STATE))  ;*/
    },
    getColor: function(state, district){
      for(let i=0; i<repDistricts.length; i++){
        let obj = repDistricts[i];
        if(obj.state === state && obj.cd === district){
          return '#FF8484';
        }
        if(i === repDistricts.length-1){
          return '#FFFFFF';
        }
      }
    },
    getOpacity: function(state, district){
      for(let i=0; i<repDistricts.length; i++){
        let obj = repDistricts[i];
        if(obj.state === state && obj.cd === district){
          return 1;
        }
        if(i === repDistricts.length-1){
          return 0;
        }
      }
    }
}

$(startPage.initMap());