/*
Filtering Logic
- Each filter type button is a toggle for those particular taps
- Filter on/off
- When type is off, turn filter button gray
*/
let accessFilterActive = false;
let activeFilterType = "";
let activeFilterStatus = {};

var accessFilter = function(event) {
    type = event.target.getAttribute('data-filter');
    // If the map is filtered and you try to filter for the same filter type that is active...
    if (accessFilterActive && type == activeFilterType) {
        // ...clear the filter.
        for (let i = 0; i < allTaps.length; i++) {
            allTaps[i].setMap(map);
        }
        accessFilterActive = false;
    } else { // Otherwise, filter taps to the newly requested type
        accessFilterActive = true;
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
