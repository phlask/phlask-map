// runs initMap function on window load
google.maps.event.addDomListener(window, 'load', initMap);

// global variables
var map;
var marker;
var tapwindow;

// file-local variables
let nextTapNumber = 0;
let addressMarkers = [];
let allTaps = [];
let initialTaps = [];

const greyStyleRules = [ { "elementType": "geometry", "stylers": [ { "color": "#f5f5f5" } ] }, { "elementType": "labels.icon", "stylers": [ { "visibility": "off" } ] }, { "elementType": "labels.text.fill", "stylers": [ { "color": "#616161" } ] }, { "elementType": "labels.text.stroke", "stylers": [ { "color": "#f5f5f5" } ] }, { "featureType": "administrative.land_parcel", "elementType": "labels.text.fill", "stylers": [ { "color": "#bdbdbd" } ] }, { "featureType": "poi", "elementType": "geometry", "stylers": [ { "color": "#eeeeee" } ] }, { "featureType": "poi", "elementType": "labels.text.fill", "stylers": [ { "color": "#757575" } ] }, { "featureType": "poi.park", "elementType": "geometry", "stylers": [ { "color": "#e5e5e5" } ] }, { "featureType": "poi.park", "elementType": "labels.text.fill", "stylers": [ { "color": "#9e9e9e" } ] }, { "featureType": "road", "elementType": "geometry", "stylers": [ { "color": "#ffffff" } ] }, { "featureType": "road.arterial", "elementType": "labels.text.fill", "stylers": [ { "color": "#757575" } ] }, { "featureType": "road.highway", "elementType": "geometry", "stylers": [ { "color": "#dadada" } ] }, { "featureType": "road.highway", "elementType": "labels.text.fill", "stylers": [ { "color": "#616161" } ] }, { "featureType": "road.local", "elementType": "labels.text.fill", "stylers": [ { "color": "#9e9e9e" } ] }, { "featureType": "transit.line", "elementType": "geometry", "stylers": [ { "color": "#e5e5e5" } ] }, { "featureType": "transit.station", "elementType": "geometry", "stylers": [ { "color": "#eeeeee" } ] }, { "featureType": "water", "elementType": "geometry", "stylers": [ { "color": "#c9c9c9" } ] }, { "featureType": "water", "elementType": "labels.text.fill", "stylers": [ { "color": "#9e9e9e" } ] } ]

// map icons for tap types
// public
const blueTap = "https://i.imgur.com/M12e1HV.png"
// semi-public
const greenTap = "https://i.imgur.com/DXMMxXR.png"
// selected
const yellowTap = "https://i.imgur.com/kt825XO.png"
// private
const redTap = "https://i.imgur.com/5NOdOyY.png"
// unverified
const greyTap = "https://i.imgur.com/kKXG3TO.png"

const HOSR_tap = "https://i.imgur.com/cZ3GxdF.png"
const HOSR_grey_tap = 'https://i.imgur.com/bnw3Erx.png'

const userLocation = "https://i.imgur.com/ofjiRtT.png"
const locateMeIcon = "https://i.imgur.com/wWc1rmZ.png"

// array to store selected tap for symbology change
const selected_taps = [];

const locationMarker = new google.maps.Marker({
    map: map,
    draggable: false,
    icon: userLocation
})

let smallScreen = false
if (window.innerWidth <= 480) {
  smallScreen = true;
  document.getElementById("map").style.height = "600px";
}

// Enable tooltips throughout the document via JQuery UI
$(document).tooltip();

function goToLocation() {
  let latLon = document.getElementById('latlon-input').value;
  console.log(latLon);

  let lat = '';
  let lng = '';

  try {
    lat = latLon.split(',')[0].trim();
    lng = latLon.split(',')[1].trim();
  }
  catch(err) {
    alert("Invalid address");
  }

  if (!isNaN(lat) && !isNaN(lng)) {
    lat = parseFloat(lat);
    lng = parseFloat(lng);

    var position = {lat: lat, lng: lng};
    // const myLocation = new google.maps.Marker({
    //     map: map,
    //     position: position,
    //     icon: userLocation
    //    })

    locationMarker.setPosition(position);
    locationMarker.setMap(map);
    map.setZoom(18);
    map.panTo(position);
    console.log("Made it here");
  }
  else {
    alert("Invalid address.");
  }
}

// opens side bar
function side_open() {
    if (smallScreen) {
      document.getElementById("mySidebar").style.display = "inline-block";
      document.getElementById("map").style.height = "400px";
    }
    else { document.getElementById("mySidebar").style.display = "block"; }
}

// closes side bar
function side_close() {
    document.getElementById("mySidebar").style.display = "none";
    document.getElementById("map").style.height = "600px";
    change_icon_back();
}

// initalizes google map, new tap info window, tap submitted message window, new tap marker, event listeners, and legend
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 39.952406, lng: -75.163678},
        zoom: 12,
        disableDoubleClickZoom: true,
        gestureHandling: 'greedy',
        //styles: greyStyleRules,

    });

    messagewindow = new google.maps.InfoWindow({
        content: document.getElementById('message')
    });

    marker = new google.maps.Marker({
        map: map,
        draggable: true
    })

    // const toolTip = new google.maps.InfoWindow({
    //   content: "Click to submit a new tap"
    // });
    //
    // google.maps.event.addListener(marker, 'mouseover', function() {
    //   toolTip.open(map, marker);
    // });
    //


    // google.maps.event.addListener(marker, 'mouseout', function() {
    //   toolTip.close();
    // });

    google.maps.event.addListener(map, 'click', function(event) {
        marker.setMap(map);
        marker.setVisible(true);
        messagewindow.close();
        // placeMarker(event.latLng, map, marker);
      });

      getTaps(true);
      getNewTaps();



    // create legend and add legend items
    const legend = document.getElementById('legend');
    const filter = document.getElementById('filter');

    

    var legendElementMap = phlaskUtils.generateLegend(map, phlaskData.tapTypes);

    for (legendElement in legendElementMap) {
      var element = legendElementMap[legendElement];
      legend.appendChild(element);
    }

    var geoLocate = document.querySelector('#geo-locate');
    //geoLocate.style.display = 'none';
    //geoLocate.addListener('click', locateMe());
    google.maps.event.addDomListener(geoLocate, 'click', () => {
      jQuery.post( "https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyDxIuJdCSTm7yDQaShtWq7-sI3KOsrn30w", function(success) {
        showPosition(success);
            //alert(success.location.lat + ", " + success.location.lng);
      })
      .fail(function(err) {
        alert("Geolocation Failure");
      });
    });

    function showPosition(position) {
      var position = {lat: position.location.lat, lng: position.location.lng};
      // const myLocation = new google.maps.Marker({
      //     map: map,
      //     position: position,
      //     icon: userLocation
      //    })
      locationMarker.setPosition(position);
      locationMarker.setMap(map);

      map.setZoom(20);
      map.panTo(position);
    }

    latLonDiv = document.getElementById('latlon-div');
    filterDiv = document.getElementById('filter-div');
    //latLonDiv.style.display = 'none';

    google.maps.event.addListenerOnce(map, 'tilesloaded', function() {
      map.controls[google.maps.ControlPosition.LEFT_TOP].push(latLonDiv);
      latLonDiv.style.display = 'block';
      map.controls[google.maps.ControlPosition.LEFT_TOP].push(filterDiv);
      latLonDiv.style.display = 'block';
      map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(legend);
      legend.style.display = "block";
      map.controls[google.maps.ControlPosition.LEFT_TOP].push(filter);
      filter.style.display = "block";
      map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(geoLocate);
      //geoLocate.style.display = 'block';
      
    });
}

 // firebase configuration for verified taps database
 var config = {
     apiKey: "AIzaSyABw5Fg78SgvedyHr8tl-tPjcn5iFotB6I",
     authDomain: "phlask-web-map.firebaseapp.com",
     databaseURL: "https://phlask-web-map.firebaseio.com",
     projectId: "phlask-web-map",
     storageBucket: "phlask-web-map.appspot.com",
     messagingSenderId: "428394983826"
   };
 firebase.initializeApp(config);

 var database = firebase.database();

 // firebase configuration for new taps database
 var config_new = {
     apiKey: "AIzaSyA2E1tiV34Ou6CJU_wzlJtXxwATJXxi6K8",
     authDomain: "phlask-web-map-new-taps.firebaseapp.com",
     databaseURL: "https://phlask-web-map-new-taps.firebaseio.com",
     projectId: "phlask-web-map-new-taps",
     storageBucket: "phlask-web-map-new-taps.appspot.com",
     messagingSenderId: "673087230724"
 };

 // Initialize another app with a different config
 var secondary = firebase.initializeApp(config_new, "new");

 // Retrieve the database.
 var newDatabase = secondary.database();

// function used to place new tap marker
function placeMarker(position, map, marker) {
  marker.setPosition(position);

  google.maps.event.addListener(marker, 'click', function() {
    try {
      // document.getElementById('new-tap-submit').style.display = 'none';
      // document.getElementById('edit-tap-submit').style.display = 'none';
      
      // var form = document.getElementById("form");
      //                 form.style.display = "block"
      
      // document.getElementById("editForm").style.display = 'none';
      
      // form.scrollIntoView();
      // window.scrollBy(0, -65);
    }
    catch(err) {}
    //infowindow.open(map, this);
    side_close();
    const submitMessage = document.getElementById('new-tap-submit');
    submitMessage.style.display = 'none';

    document.getElementById('access').value = '';
    document.getElementById('service').value = '';
    document.getElementById('tap-type').value = '';
    document.getElementById('vessel').value = '';
    document.getElementById('filtration').value = '';

    document.getElementById('address').value = '';
    document.getElementById('city').value = 'Philadelphia';
    document.getElementById('zipcode').value = '';
    document.getElementById('org').value = '';

    document.getElementById('handicap').value = '';
    document.getElementById('description').value = '';
    document.getElementById('statement').value = '';
    document.getElementById('norms-rules').value = '';
  });

  google.maps.event.addListener(marker, 'dblclick', function(e) {
    e.preventDefault()
    marker.setMap(null);
    infowindow.close();
  });
}


// function used to place and symbolize verified taps
function placeTap(position, map, data, isNew=false) {
  if (isNew) {
    var tap = new google.maps.Marker({
      position: position,
      map: map,
      icon: phlaskData.tapTypes.unverified.image,
      data: data,
      temporary: true
    });
  }
  else if (data.access == 'Public') {
    var tap = new google.maps.Marker({
      position: position,
      map: map,
      icon: phlaskData.tapTypes.public.image,
      data: data
    });
  }
  else if (data.access == 'Semi-public') {
    var tap = new google.maps.Marker({
      position: position,
      map: map,
      icon: phlaskData.tapTypes.semiPublic.image,
      data: data
    });
  }
  else if (data.access == 'Private') {
    var tap = new google.maps.Marker({
      position: position,
      map: phlaskData.tapTypes.private.image,
      icon: yellowTap,
      data: data
    });
  }
  else if (data.access == 'Unverified') {
    var tap = new google.maps.Marker({
      position: position,
      map: map,
      icon: phlaskData.tapTypes.unverified.image,
      data: data
    });
  }
  else if (data.access == 'Restricted') {
    var tap = new google.maps.Marker({
      position: position,
      map: map,
      icon: phlaskData.tapTypes.restricted.image,
      data: data
    });
  }
  else if (data.access == 'Private-Shared') {
    var tap = new google.maps.Marker({
      position: position,
      map: map,
      icon: phlaskData.tapTypes.privateShared.image,
      data: data
    });
  }

  else if (data.access == 'WM') {
    var tap = new google.maps.Marker({
      position: position,
      // map: map,
      icon: HOSR_tap,
      data: data
    });
  }

  tapwindow = new google.maps.InfoWindow({
    content:
      "<p>" + "<strong>Organization/Enterprise: </strong>" + data.organization + "</p>" +
      "<p>" + "<strong>Handicap Accessible: </strong>" + data.handicap + "</p>" +
      "<p>" + "<strong>Address: </strong>" + data.address + "</p>" +
      "<p>" + "<strong>City: </strong>" + data.city + "</p>" +
      "<p>" + "<strong>Zip Code: </strong>" + data.zip_code + "</p>" +
      "<p>" + "<strong>Access: </strong>" + data.access + "</p>" +
      "<p>" + "<strong>Description: </strong>" + data.description + "</p>" +
      "<p>" + "<strong>Tap Type: </strong>" + data.tap_type + "</p>" +
      "<p>" + "<strong>Service: </strong>" + data.service + "</p>" +
      "<p>" + "<strong>Filtration: </strong>" + data.filtration + "</p>" +
      "<p>" + "<strong>Water Vessel: </strong>" + data.vessel + "</p>" +
      "<p>" + "<strong>Phlask Statement: </strong>" + data.statement + "</p>" +
      "<p>" + "<strong>Norms and Rules: </strong>" + data.norms_rules + "</p>" +

      "<p>" + "<strong>Tap ID: </strong>" + data.tapnum + "</p>" +
      "<p>" + "<strong>Latitude: </strong>" + data.lat + "</p>" +
      "<p>" + "<strong>Longitude: </strong>" + data.lon + "</p>"
  });

  tap.addListener('click', function() {
    console.log(this.data);
    slideIndex = 1

    change_icon_back();

    if (tap.data.access == "WM") tap.setIcon(HOSR_grey_tap);
    else tap.setIcon(greyTap);

    selected_taps.push(tap);

    side_open();
    document.getElementById('mySidebar').innerHTML = `
      <button class="sidebar-button"
          onclick="side_close()">Close &times;</button>
      <img class='phlask-logo' src="https://i.imgur.com/YJhx0N9.png" height='34' width='175'>
      <div class="scroll-buttons" id='scroll-buttons'></div>
      <div class="image-gallery" id="image-gallery"></div>
      <button class='directions-button' id='get-direction'>Get Directions</button>
      <p class='sidebar-item' id=side-org><strong>Organization/Enterprise: </strong></p>
      <p class='sidebar-item' id=side-address><strong>Address: </strong></p>
      <p class='sidebar-item' id=side-city><strong>City: </strong></p>
      <p class='sidebar-item' id=side-zip><strong>Zip Code: </strong></p>
      <p class='sidebar-item' id=side-handicap><strong>Handicap Accessible: </strong></p>
      <p class='sidebar-item' id=side-access><strong>Access: </strong></p>
      <p class='sidebar-item' id=side-description><strong>Description: </strong></p>
      <p class='sidebar-item' id=side-tap_type><strong>Tap Type: </strong></p>
      <p class='sidebar-item' id=side-service><strong>Service: </strong></p>
      <p class='sidebar-item' id=side-filtration><strong>Filtration: </strong></p>
      <p class='sidebar-item' id=side-vessel><strong>Water Vessel: </strong></p>
      <p class='sidebar-item' id=side-statement><strong>Phlask Statement: </strong></p>
      <p class='sidebar-item' id=side-norms><strong>Norms and Rules: </strong></p>
      <!-- <button onclick='editData(selected_taps[0])' class="edit-button">Edit</button> -->
    `
    // <p class='sidebar-item' id=side-id><strong>Tap ID: </strong></p>
    // <p class='sidebar-item' id=side-lat><strong>Latitude: </strong></p>
    // <p class='sidebar-item' id=side-lon><strong>Longitude: </strong></p>


    var gallery = document.getElementById('image-gallery');
    if (data.images) {

      if (data.images.length > 1) {
        scrollButtons = document.getElementById('scroll-buttons');

        var leftButton = document.createElement('BUTTON');
        leftButton.className = 'gallery-left image-btn';
        leftButton.innerHTML = '&#10094;';
        leftButton.setAttribute("onclick", 'plusDivs(-1)');
        leftButton.setAttribute("style", 'margin-right: 5px;');

        var rightButton = document.createElement('BUTTON');
        rightButton.className = 'gallery-left image-btn';
        rightButton.innerHTML = '&#10095;';
        rightButton.setAttribute("onclick", 'plusDivs(1)');

        scrollButtons.appendChild(leftButton);
        scrollButtons.appendChild(rightButton);
      }

      for (i = 0; i < data.images.length; i++) {
        //console.log(data.images[i]);
        var image = document.createElement('img');
        image.className = "side-image"
        image.src = data.images[i];
        image.setAttribute("style", "margin: 2px; height: 100%; width: auto; cursor: pointer; display: inline-block; vertical-align: middle; border: 5px solid #00ADEE ")
        gallery.appendChild(image);
      }
      showDivs(slideIndex);
    }
    else {
      gallery.style.display = 'none'
    }
    
    const url = "https://www.google.com/maps/search/?api=1&query=" + data.lat + ", " +  data.lon;
    document.getElementById('get-direction').setAttribute('onclick', 'window.open("' + url + '", "_blank")');
    document.getElementById('get-direction').setAttribute('target', "_blank");

    document.getElementById('side-access').innerHTML += data.access;
    document.getElementById('side-service').innerHTML += data.service;
    document.getElementById('side-tap_type').innerHTML += data.tap_type;
    document.getElementById('side-vessel').innerHTML += data.vessel;
    document.getElementById('side-filtration').innerHTML += data.filtration;

    document.getElementById('side-address').innerHTML += data.address;
    document.getElementById('side-city').innerHTML += data.city;
    document.getElementById('side-zip').innerHTML += data.zip_code;
    document.getElementById('side-org').innerHTML += data.organization;

    document.getElementById('side-handicap').innerHTML += data.handicap;
    document.getElementById('side-description').innerHTML += data.description;
    document.getElementById('side-statement').innerHTML += data.statement;
    document.getElementById('side-norms').innerHTML += data.norms_rules;

    $( ".sidebar-item" ).each(function( index, element ) {
      let text = element.innerHTML.split(':', 2)[1].split('>', 2)[1];
      if (text.length < 1) element.style.display = "none";
    });

    // document.getElementById('side-id').innerHTML += data.tapnum;
    // document.getElementById('side-lat').innerHTML+= data.lat;
    // document.getElementById('side-lon').innerHTML += data.lon;
  });
  allTaps.push(tap);
}

function getTaps(increment) {
  //allTaps = []
  firebase.database().ref('/').once('value').then(function(snapshot) {
          //console.log(snapshot.val())
          for (item in snapshot.val()) {
                  if (snapshot.val()[item].access == "WM") {
                    continue;
                  }
                  var lat = snapshot.val()[item].lat;
                  var lon = snapshot.val()[item].lon;

                  var latlng = {lat: lat, lng: lon};

                  placeTap(latlng, map, snapshot.val()[item]);

  initialTaps.push(snapshot.val()[item])

  if (increment) {
    nextTapNumber += 1;
  }
          }
  });
  //console.log(allTaps);
}

function getNewTaps() {
  newDatabase.ref('/new_taps').once('value').then(function(snapshot) {
    for (item in snapshot.val()) {
      var lat = snapshot.val()[item].lat
      var lon = snapshot.val()[item].lon

      var latlng = {lat: lat, lng: lon}
      //placeTap(latlng, map, snapshot.val()[item], true)
      nextTapNumber += 1;
    }
  });
}

function saveData() {
  try {
    document.getElementById("message").style.display = "block"
  }
  catch(err) {}

  var access = document.getElementById('access').value;
  var service = document.getElementById('service').value;
  var tapType = document.getElementById('tap-type').value;
  //var waterType = document.getElementById('water-type').value;
  var vessel = document.getElementById('vessel').value;
  var filtration = document.getElementById('filtration').value;

  var address = document.getElementById('address').value;
  var city = document.getElementById('city').value;
  var zipcode = document.getElementById('zipcode').value;
  var org = document.getElementById('org').value;

  var handicap = document.getElementById('handicap').value;
  var description = document.getElementById('description').value;
  var statement = document.getElementById('statement').value;
  var normsAndRules = document.getElementById('norms-rules').value;

  var latlng = marker.getPosition();

  var fullData = {tapnum: nextTapNumber, access: access, service: service, tap_type: tapType,
                  vessel: vessel, filtration: filtration, address: address, city: city, zip_code: zipcode,
                  organization: org, handicap: handicap, description: description, statement: statement,
                  norms_rules: normsAndRules, lat: latlng.lat(), lon: latlng.lng()
                };

  newDatabase.ref('new_taps/' + (nextTapNumber).toString()).set(fullData);

  //infowindow.close();
  //newTapMarker = new google.maps.Marker()
  //newTapMarker.setPosition(marker.getPosition())
  //marker.setMap(null)
  marker.setVisible(false);

  messagewindow.open(map, marker);

  getTaps(false);
  placeTap(latlng, map, fullData, true);

  nextTapNumber += 1
  console.log("nextTapNumber after tap submit: " + nextTapNumber);

  const submitMessage = document.getElementById('new-tap-submit');
  // submitMessage.style.display = 'block';
  $('#new-tap-submit').fadeIn(3000);
}

function change_icon_back() {
  if (selected_taps.length > 0) {
    var change_icon = selected_taps.pop();
    if (change_icon.data.access == 'Public') {
      change_icon.setIcon(blueTap)
    }
    else if (change_icon.data.access == 'Private') {
      change_icon.setIcon(yellowTap)
    }
    else if (change_icon.data.access == 'Semi-public') {
      change_icon.setIcon(greenTap)
    }
    else if (change_icon.data.access == 'Unverified') {
      change_icon.setIcon(greyTap)
    }
    else if (change_icon.data.access == 'Restricted') {
      change_icon.setIcon(redTap)
    }
    else if (change_icon.data.access == 'Private-Shared') {
      change_icon.setIcon(greenTap)
    }
    else if (change_icon.data.access == 'WM') {
      change_icon.setIcon(HOSR_tap)
    }
  }
}

function showDivs(n) {
  var i;
  var x = document.getElementsByClassName("side-image");
  if (n > x.length) {
    slideIndex = 1
  }
  if (n < 1) {
    slideIndex = x.length
  }
  for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";
  }
  x[slideIndex-1].style.display = "block";
}

let slideIndex = 1;
//showDivs(slideIndex);

function plusDivs(n) {
  showDivs(slideIndex += n);
}

function editData(tap) {
  //console.log(tap);
  const form = document.getElementById("form");
  form.style.display = "none";

  const editForm = document.getElementById("editForm");
  editForm.style.display = "block";

  document.getElementById('new-tap-submit').style.display = 'none';
  document.getElementById('edit-tap-submit').style.display = 'none';
  document.querySelector('.phlask-code-input').style.display = 'block';

  editForm.scrollIntoView();
  window.scrollBy(0, -65);

  // console.log(tap);

  document.getElementById('edit-access').value = tap.data.access;
  document.getElementById('edit-service').value = tap.data.service;
  document.getElementById('edit-tap-type').value = tap.data.tap_type;
  document.getElementById('edit-vessel').value = tap.data.vessel;
  document.getElementById('edit-filtration').value = tap.data.filtration;

  document.getElementById('edit-address').value = tap.data.address;
  document.getElementById('edit-city').value = tap.data.city;
  document.getElementById('edit-zipcode').value = tap.data.zip_code;
  document.getElementById('edit-org').value = tap.data.organization;

  document.getElementById('edit-handicap').value = tap.data.handicap;
  document.getElementById('edit-description').value = tap.data.description;
  document.getElementById('edit-statement').value = tap.data.statement;
  document.getElementById('edit-norms-rules').value = tap.data.norms_rules;

  const saveButton = document.querySelector(".edit-submit");
  saveButton.addEventListener('click', () => {
    const phlaskCodeText = document.querySelector(".phlask-code-input").value;
    // console.log(tap);
    if (phlaskCodeText === 'phlaskme123') {
      saveEdit(true, tap);
    }
    else { alert("You need the Phlask edit code to make edits.") }
  })
}

function saveEdit(correctCode, tap) {
  if (correctCode) {
    var access = document.getElementById('edit-access').value;
    var service = document.getElementById('edit-service').value;
    var tapType = document.getElementById('edit-tap-type').value;
    //var waterType = document.getElementById('water-type').value;
    var vessel = document.getElementById('edit-vessel').value;
    var filtration = document.getElementById('edit-filtration').value;

    var address = document.getElementById('edit-address').value;
    var city = document.getElementById('edit-city').value;
    var zipcode = document.getElementById('edit-zipcode').value;
    var org = document.getElementById('edit-org').value;

    var handicap = document.getElementById('edit-handicap').value;
    var description = document.getElementById('edit-description').value;
    var statement = document.getElementById('edit-statement').value;
    var normsAndRules = document.getElementById('edit-norms-rules').value;

    let editData = {
      tapnum: tap.data.tapnum, access: access, service: service, tap_type: tapType,
      vessel: vessel, filtration: filtration, address: address, city: city, zip_code: zipcode,
      organization: org, handicap: handicap, description: description, statement: statement,
      norms_rules: normsAndRules, lat: tap.data.lat, lon: tap.data.lon
    };
    console.log(editData);
    const editSuccessMessage = document.getElementById("edit-tap-submit")
    // editSuccessMessage.style.display = "block"
    editSuccessMessage.textContent = 'Tap Successfully Edited'
    $('#edit-tap-submit').fadeIn(3000);


    database.ref('/' + (tap.data.tapnum).toString()).set(editData);

    getTaps(false);
  }
}


//document.querySelector('#latlon-input').style.display = 'none';
//document.querySelector('#latlon-button').style.display = 'none';

document.getElementById('latlon-button').addEventListener('click', function(){
  zoomToArea();
});

const zoomAutocomplete = new google.maps.places.Autocomplete(
    document.getElementById('latlon-input'));

// This function takes the input value in the find nearby area text input locates it, and then zooms into that area. This is so that the user can show all, listings, then decide to focus on one area of the map.
function zoomToArea(){
  // initialize geocoder, new geocode instance
  const geocoder = new google.maps.Geocoder();
  // get address or place that the user entered
  const address = document.getElementById('latlon-input').value;
  // make sre the address isnt blank
  if (address == '') {
    window.alert('You must enter an area, or address.');
  } 
  else {
    // Geocode the address/area entered to get the center. Then, center the map on it and zoom in
    geocoder.geocode(
      {
        address: address,
        // keep it within the city
        componentRestrictions: {locality: 'Philadelphia'}
      }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          // use resulting lat long to recenter the map
          map.setCenter(results[0].geometry.location);
          map.setZoom(20);

          addressMarkers.forEach( (element) => {
            element.setMap(null);
          });

          const marker = new google.maps.Marker({
            position: results[0].geometry.location,
            animation: google.maps.Animation.DROP,
            map: map
          });
          
          addressMarkers.push(marker);
        } else {
          window.alert('We could not find that location - try entering a more' + ' specific place.');
        }
    });
  }
}
