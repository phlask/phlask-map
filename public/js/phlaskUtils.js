let filtered = false;
var accessFilter = function(map, type) {
    if (filtered) {
        for (let i = 0; i < allTaps.length; i++) {
          allTaps[i].setMap(map);
        }
        filtered = false;
      }
    
      else {
       filtered = true;
       for (let i = 0; i < allTaps.length; i++) {
         allTaps[i].setMap(map);
       }
    
       for (let i = 0; i < initialTaps.length; i++) {
         if (initialTaps[i].access != type) {
           allTaps[i].setMap(null);
         }
    
       // if (accessFilterType == type) {
       //   for (let i = 0; i < allTaps.length; i++) {
       //     allTaps[i].setMap(map);
       //   }
       // }
       //
       // else {
       //   for (let i = 0; i < allTaps.length; i++) {
       //     allTaps[i].setMap(map);
       //   }
       //
       //   for (let i = 0; i < initialTaps.length; i++) {
       //     if (initialTaps[i].access != type) {
       //       allTaps[i].setMap(null);
       //     }
       //   }
       }
       accessFilterType = type;
    }
}

var phlaskUtils = {
    generateLegend: function(map, tapTypeMapping) {
        legendElements = {};
        for(tapType in tapTypeMapping) {
            var legend_div = document.createElement('div');
            
            var legend_div_image = document.createElement('img');
            legend_div_image.setAttribute('src', tapTypeMapping[tapType].image);
            legend_div.appendChild(legend_div_image);

            var legend_div_tooltip = document.createElement('span');
            legend_div_tooltip.innerText = tapTypeMapping[tapType].name;
            legend_div_tooltip.setAttribute('title', tapTypeMapping[tapType].description);
            legend_div.appendChild(legend_div_tooltip);

            legend_div.addEventListener('click', function() {accessFilter(map, tapTypeMapping[tapType].filterKey)});

            legendElements[tapType] = legend_div;
        }
        return legendElements;
    }
}
