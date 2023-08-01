$(window).resize(function () {
  var h = $(window).height(),
    offsetTop = 125; // Calculate the top offset

  $('#mapCanvas').css('height', (h - offsetTop));
}).resize();

$(function() {

  SearchableMapLib.initialize({
    filePath: 'data/test_data.csv',
    fileType: 'csv',
    recordName: 'Good Grief Nova Scotia 2023 Event',
    recordNamePlural: 'Good Grief Nova Scotia 2023 Events',
    map_centroid: [44.6923, -62.6572],
    defaultZoom:  7,
    defaultRadius: 1610,
    debug: true,
  });

  var autocomplete = new google.maps.places.Autocomplete(document.getElementById('search-address'));
  var modalURL;

  $('#btnSearch').click(function(){
    // Temporary fix for map load issue: set show map as default.
    if ($('#mapCanvas').is(":visible")){
      SearchableMapLib.doSearch();
    }
    else {
      $('#btnViewMode').html("<i class='fa fa-list'></i> List view");
      $('#mapCanvas').show();
      $('#listCanvas').hide();
      SearchableMapLib.doSearch();
    }
  });

  $(':checkbox').click(function(){
    SearchableMapLib.doSearch();
  });

  $(':radio').click(function(){
    SearchableMapLib.doSearch();
  });

  $('#btnViewMode').click(function(){
    if ($('#mapCanvas').is(":visible")){
      $('#btnViewMode').html("<i class='fa fa-map-marker'></i> Map view");
      $('#listCanvas').show();
      $('#mapCanvas').hide();
    }
    else {
      $('#btnViewMode').html("<i class='fa fa-list'></i> List view");
      $('#listCanvas').hide();
      $('#mapCanvas').show();
    }
  });

  $("#search-address, #search-name").keydown(function(e){
      var key =  e.keyCode ? e.keyCode : e.which;
      if(key == 13) {
          $('#btnSearch').click();
          return false;
      }
  });

  $(".close-btn").on('click', function() {
    $.address.parameter('modal_id', null)
  });

});

function formatAddress(prop) {
    return prop["street"] + " " + prop["city"] + " " + prop["state"] + " " + prop["zipcode"];
}


// var baseMaps = {
//   "OpenStreetMap HOT": OpenStreetMap_HOT,
//   "Stamen Watercolor": Stamen_Watercolor
// };

// var overlayMaps = {};

// var layerControl = L.control.layers(baseMaps, overlayMaps, {collapsed:true}).addTo(SearchableMapLib.map);
