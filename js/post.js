$(document).ready(function() {

  $('#googleMapLink').each(function() {
    var address = document.getElementById('nameOfRestaurant').innerHTML;
    var link = "http://maps.google.com/maps?q=" + encodeURIComponent(address);
    $(this).attr('href', link);
    $(this).attr('target', "_blank");
  });

  $('#postTitle').each(function() {
    $(this).html("WhatTorEat -" + document.getElementById('nameOfRestaurant').innerHTML);
  });

  //Convert address tags to google map links - Copyright Michael Jasper 2011
  $('address').each(function() {
    var link = "<a href='http://maps.google.com/maps?q=" + encodeURIComponent($(this).text()) + "' target='_blank'>" + $(this).text() + "</a>";
    $(this).html(link);
  });

  $('#nameOfRestaurant').each(function() {
    var link = "<a href='http://maps.google.com/maps?q=" + encodeURIComponent($(this).text()) + "' target='_blank'>" + $(this).text() + "</a>";
    $(this).html(link);
  });

  $('#facebookShareButton').each(function() {
    // console.log($(location).attr('pathname'));
    var targetLink = "https://whatoreat.com" + $(location).attr('pathname');

    $(this).attr('data-href', targetLink);
  });

});

var geocoder;
var map;

function initialize() {
  geocoder = new google.maps.Geocoder();
  var latlng = new google.maps.LatLng(-34.397, 150.644);
  var mapOptions = {
    zoom: 15,
    center: latlng
  }
  map = new google.maps.Map(document.getElementById('map'), mapOptions);
  codeAddress();
}

function codeAddress() {
  var address = document.getElementById('address').innerHTML;
  geocoder.geocode({
    'address': address
  }, function(results, status) {
    if (status == 'OK') {
      map.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
        map: map,
        animation: google.maps.Animation.DROP,
        draggable: false,
        position: results[0].geometry.location
      });
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}

function setUpMetaData() {
  var metaURL = document.createElement('meta');
  metaURL.setAttribute('property', "og:url");
  metaURL.setAttribute('content', "https://whatoreat.com" + window.location.pathname);

  var metaType = document.createElement('meta');
  metaType.setAttribute('property', "og:type");
  metaType.setAttribute('content', "website");

  var metaTitle = document.createElement('meta');
  metaTitle.setAttribute('property', "og:title");
  metaTitle.setAttribute('content', document.getElementById('nameOfRestaurant').innerHTML);
  //
  var metaAddress = document.createElement('meta');
  metaAddress.setAttribute('property', "og:description");
  metaAddress.setAttribute('content', document.getElementById('address').innerHTML);

  document.getElementsByTagName('head')[0].appendChild(metaURL);
  document.getElementsByTagName('head')[0].appendChild(metaType);
  document.getElementsByTagName('head')[0].appendChild(metaTitle);
  document.getElementsByTagName('head')[0].appendChild(metaAddress);
}
setUpMetaData();