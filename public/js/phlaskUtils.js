let filtered = false;
let activeFilterType = "";
var accessFilter = function(event) {
    type = event.target.getAttribute('data-filter');
    // If the map is filtered and you try to filter for the same filter type that is active...
    if (filtered && type == activeFilterType) {
        // ...clear the filter.
        for (let i = 0; i < allTaps.length; i++) {
            allTaps[i].setMap(map);
        }
        filtered = false;
    } else { // Otherwise, filter taps to the newly requested type
        filtered = true;
        for (let i = 0; i < allTaps.length; i++) {
            if (allTaps[i].data.access == type) {
                allTaps[i].setMap(map);
            } else {
                allTaps[i].setMap(null);
            }
        }
    }
    activeFilterType = type;
}

var phlaskUtils = {
    generateLegend: function(map, tapTypeMapping) {
        legendElements = {};
        for (tapType in tapTypeMapping) {
            var legend_div = document.createElement('div');
            legend_div.setAttribute('data-filter', tapTypeMapping[tapType].filterKey)

            var legend_div_image = document.createElement('img');
            legend_div_image.setAttribute('src', tapTypeMapping[tapType].image);
            legend_div_image.setAttribute('data-filter', tapTypeMapping[tapType].filterKey)
            legend_div.appendChild(legend_div_image);

            var legend_div_tooltip = document.createElement('span');
            legend_div_tooltip.innerText = tapTypeMapping[tapType].name;
            legend_div_tooltip.setAttribute('title', tapTypeMapping[tapType].description);
            legend_div_tooltip.setAttribute('data-filter', tapTypeMapping[tapType].filterKey)
            legend_div.appendChild(legend_div_tooltip);

            legend_div.addEventListener('click', accessFilter, false);

            legendElements[tapType] = legend_div;
        }
        return legendElements;
    }
}