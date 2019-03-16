/*
Filtering Logic
- Each filter type button is a toggle for those particular taps
- Filter on/off
- When type is off, turn filter button gray
*/
let activeFilterStatus = {};

// Init active filters (true = show, false = hide)
for(tapType in phlaskData.tapTypes) {
    activeFilterStatus[tapType] = true
}

var accessFilter = function(event) {
    type = event.target.getAttribute('data-filter');

    // Flip flag for the filter type selected
    activeFilterStatus[type] = !activeFilterStatus[type]

    // Generate map using existing flags.
    // For all taps...
    for (let i = 0; i < allTaps.length; i++) {
        //...if the tap filter status type for the tap is active...
        if (activeFilterStatus[allTaps[i].data.access]) {
            //...set it on the map.
            allTaps[i].setMap(map);
        }
        // Otherwise...
        else {
            //...clear it from the map.
            allTaps[i].setMap(null);
        }
    }

    // Then make sure the filter icons are colored if active and grey if not.
    for(tapType in phlaskData.tapTypes) {
        //...if the filter type is active...
        if(activeFilterStatus[tapType]){
            //...ensure the legend icon is colored.
            $("img[data-filter='" + tapType + "']").attr("src", phlaskData.tapTypes[tapType].image)
        }
        // Otherwise...
        else {
            //...set the legend icon to grey.
            $("img[data-filter='" + tapType + "']").attr("src", phlaskData.tapTypes['Unverified'].image)
        }
    }
}
