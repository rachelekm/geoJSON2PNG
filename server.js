'use strict';
var ogr2ogr = require('ogr2ogr');
var ogr = ogr2ogr('./US_Congressional_District.geojson')
 
ogr.exec(function (er, data) {
  if (er) console.error(er)
  console.log(data)
})
 
var ogr2 = ogr2ogr('/path/to/another/spatial/file')
ogr2.stream().pipe(writeStream)