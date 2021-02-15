// Click Events

// Click event to add a book to the db
$("#addmovie").on("click", function() {
  $.ajax({
    type: "POST",
    url: "/submit",
    dataType: "json",
    data: {
      title: $("#title").val(),
      author: $("#release").val(),
      created: Date.now()
    }
  })
    .then(function(data) {
      console.log(data);
      getUnWatched();
      $("#author").val("");
      $("#release").val("");
    }
    );
  return false;
});

// Click event to mark a book as read
$(document).on("click", ".markwatched", function() {
  var thisId = $(this).attr("data-id");
  $.ajax({
    type: "PUT",
    url: "/markwatched/" + thisId
  });
  $(this).parents("tr").remove();
  getWatched();
});

// Click event to mark a book as not read
$(document).on("click", ".markunwatched", function() {
  var thisId = $(this).attr("data-id");
  $.ajax({
    type: "PUT",
    url: "/markunwatched/" + thisId
  });
  $(this).parents("tr").remove();
  getUnWatched();
});

// Load unread books and render them to the screen
function getUnWatched() {
  $("#unwatched").empty();
  $.getJSON("/unwatched", function(data) {
    for (var i = 0; i < data.length; i++) {
      $("#unwatched ").prepend("<tr><td>" + data[i].title + "</td><td>" + data[i].release +
        "</td><td><button class='markread' data-id='" + data[i]._id + "'>Mark Watched </button></td></tr>");
    }
    $("#unwatched").prepend("<tr><th>Title</th><th>Realease</th><th>Watch/UnWatch</th></tr>");
  });
}

// Load read books and render them to the screen
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
