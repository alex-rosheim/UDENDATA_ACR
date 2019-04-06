const API_KEY = "pk.eyJ1IjoiYWxleHJvc2hlaW0iLCJhIjoiY2p0cWRjZXIxMGU3bjN6cGFnejloYzZxMiJ9.4VPVScmm6cNMMXw1HmfMZQ";
// NEW = pk.eyJ1IjoiYWxleHJvc2hlaW0iLCJhIjoiY2p0cWRjZXIxMGU3bjN6cGFnejloYzZxMiJ9.4VPVScmm6cNMMXw1HmfMZQ

var myMap = L.map("map", {
    // center: [51.5074, -0.1278], //london, england
    // center :[0.1864, -6.6131],
    center: [0, 0],
    zoom: 2
});

var baseLayer = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.satellite",
    accessToken: API_KEY
})

baseLayer.addTo(myMap);

// var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson"; //6 entries
// var queryUrl = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson' //9k plus entries
var queryUrl = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.geojson' //480 entries


function perFeature(feature, layer) {
    if (feature.properties && feature.properties.place) {
        layer.bindPopup(feature.properties.title);
    }
}

fetch(queryUrl)
    .then(response => response.json())
    .then(json => {

        console.log(json)

        json.features.map(x => {
            // console.log(x.properties.mag)
        })

        let myLayer = L.geoJSON(json.features, {
            pointToLayer: function (feature, latlng) {
                return L.circleMarker(latlng, {
                    radius: feature.properties.mag * 2,
                    fillColor: "#ff7800",
                    color: "#000",
                    weight: 1,
                    opacity: 1,
                    fillOpacity: 0.8
                })
            },
            onEachFeature: perFeature,


            style: function (feature) {
                if (feature.properties.mag <= 4.5) return { fillColor: 'green' };
                if (feature.properties.mag <= 4.9) return { fillColor: 'blue' };
                if (feature.properties.mag <= 5.4) return { fillColor: 'yellow' };
                if (feature.properties.mag <= 5.9) return { fillColor: 'red' };
                // >= 6.0 = ORANGE //BY DEFAULT ABOVE
            }
        })

        myLayer.addTo(myMap);
    })


var legend = L.control({position: 'topright'});

       function getColor(d) {
        return d > 6.0   ? 'orange' :
               d > 5.5   ? 'red' :
               d > 5.0   ? 'yellow' :
               d > 4.5   ? 'blue' :
               d > 0.0   ? 'green' :
                          'white';
    }

   legend.onAdd = function () {

   var div = L.DomUtil.create('div', 'info legend'),
       grades = [0, 4.0 , 4.5, 5.0, 5.5],
       labels = [];

   for (var i = 0; i < grades.length; i++) {
       div.innerHTML +=
           '<i style="background:' + getColor(grades[i] + 1) + '"></i>'
            + grades[i]
             + '+ <br>';     
   }
   return div;
};

legend.addTo(myMap);
