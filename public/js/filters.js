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
    typeList = ["Public", "Private-Shared", "Private", "Restricted"]
    typeList.forEach(currentType => {
        if(activeFilterStatus[currentType]){
            $("img[data-filter='" + currentType + "']").attr("src", phlaskData.tapTypes[currentType].image)
        }
        else {
            $("img[data-filter='" + currentType + "']").attr("src", phlaskData.tapTypes['Unverified'].image)
        }
    });
}
