'use strict';

const clientView = {
    initPage: function(){
      $.ajax({
        type: 'get',
        url: '/style',
        success: function (data) {
          clientView.initMap(data);
        }
      });

      $('input[type=number]').on('input', e => {
        e.preventDefault();
        let v = e.currentTarget.value;
        let newDim = inToPixels(v);
        let label = e.currentTarget.id
        if(v === 0 || v === ''){
          $('#mapBox').css(`${label}`, '100%');
        }
        else{
          $('#mapBox').css(`${label}`, `${newDim}`);
        }
      });
      $('#mapControls').submit(e => {
        e.preventDefault();
        clientView.manualPrint();
      });

      function inToPixels(inches){
        return inches*300;
      }
    },
    initMap: function(json){
        var map = L.map('mapBox').setView([37.8, -96], 4);
        //create API to send maptiler url
        clientView.map = map;
        L.tileLayer(json.url,{
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
              weight: 10,
              opacity: 1, 
              fillOpacity: 1,
              fillColor: clientView.getColor(feature.properties.STATE, feature.properties.CD)
          };
        }
      
        L.geoJson(geojsonFeature, {style: style}).addTo(map);
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
    },
    manualPrint: function(){
      let printer = L.easyPrint({
        sizeModes: ['Current', 'A4Landscape', 'A4Portrait'],
        filename: 'myMap',
        exportOnly: true,
        hidden: true,
        hideControlContainer: true
      }).addTo(clientView.map);

      printer.printMap('CurrentSize', 'MyManualPrint');
    }
}

$(clientView.initPage());