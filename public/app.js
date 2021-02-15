// Click Events

// Click event to add a book to the db
$("#addmovie").on("click", function() {
  $.ajax({
    type: "POST",
    url: "/submit",
    dataType: "json",
    data: {
      title: $("#title").val(),
      release: $("#release").val(),
      created: Date.now()
    }
  })
    .then(function(data) {
      console.log(data);
      getUnWatched();
      $("#title").val("");
      $("#release").val("");
    }
    );
  return false;
});

// Click event to mark a movie as watched
$(document).on("click", ".markwatched", function() {
  var thisId = $(this).attr("data-id");
  $.ajax({
    type: "PUT",
    url: "/markwatched/" + thisId
  });
  $(this).parents("tr").remove();
  getWatched();
});

// Click event to mark a movie as not watched
$(document).on("click", ".markunwatched", function() {
  var thisId = $(this).attr("data-id");
  $.ajax({
    type: "PUT",
    url: "/markunwatched/" + thisId
  });
  $(this).parents("tr").remove();
  getUnWatched();
});

// Load unwatched movies and render them to the screen from the /unwatched route
function getUnWatched() {
  $("#unwatched").empty();
  $.getJSON("/unwatched", function(data) {
    for (var i = 0; i < data.length; i++) {
      $("#unwatched ").prepend("<tr><td>" + data[i].title + "</td><td>" + data[i].release +
        "</td><td><button class='markwatched' data-id='" + data[i]._id + "'>Mark Watched </button></td></tr>");
    }
    $("#unwatched").prepend("<tr><th>Title</th><th>Realease</th><th>Watch/UnWatch</th></tr>");
  });
}

// Load watched movies from the /watched route and render them to the screen
function getWatched() {
  $("#watched").empty();
  $.getJSON("/watched", function(data) {
    for (var i = 0; i < data.length; i++) {
      $("#watched").prepend("<tr><td>" + data[i].title + "</td><td>" + data[i].release +
        "</td><td><button class='markunwatched ' data-id='" + data[i]._id + "'>Mark Unwatched </button></td></tr>");
    }
    $("#watched").prepend("<tr><th>Title</th><th>Release</th><th>Watch/Unwatched</th></tr>");
  });
}

// Calling our functions
getUnWatched();
getWatched();
