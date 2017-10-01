 
  $(".instruct").click(function(event) {
  $("#toggle").toggle("collapse");
});
// =================================================================================
// SETUP Initial array of gifs
// =================================================================================
var gifs = [];
 
// =================================================================================
// FUNCTION >> displayGifInfo(); 
//  * displaygifInfo function re-renders the HTML to display the appropriate content
//  * & establishes variables needed to query the gify API given the criteria
// =================================================================================
function displayGifInfo() {
  var gif = $(this).attr("data-name");
  var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=jqPW22vugMUPU1YVX6Z2BobCgZPP1o52&limit=10";

  // =================================================================================
  // AJAX CALL 
  // * ajax call is created for the specific query (q:)
  // * which is determined by the data-name value (search term entered)
  // * attributed to the button upon creation.
  // =================================================================================  
  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response) {
    var results = response.data;
    console.log(results);

    // =================================================================================
    // FOR LOOP
    // * for loop iterates through the array holding an object
    // * divs, imgs, and p are dynamically created
    // * and reference the rating, still & animated URLs in the format
    // * the data are presented (parameters listed in API documentation)
    // =================================================================================         
    for (var i = 0; i < 10; i++) {
      var gifDiv = $("<div class='item text-center center col-md-6'>");
      var rating = results[i].rating;
      var p = $("<p>").text("Rating: " + rating);
      var stillURL = results[i].images.fixed_height_still.url;
      var animateURL = results[i].images.fixed_height.url;
      var gifImage = $("<img>").attr("src", stillURL);
      gifImage.attr("data-still", stillURL);
      gifImage.attr("data-animate", animateURL);
      gifImage.attr("data-state", "still");
      gifImage.addClass("gifResult");
      gifDiv.append(gifImage);
      $("#gifs-view").prepend(gifDiv);
      gifDiv.prepend(gifImage,p);
      $("#gifs-appear-here").prepend(gifDiv);
    }
    // =================================================================================
    // ON CLICK: GIFs
    // Check if the variable state is equal to 'still',
    // then update the src attribute of this image to it's data-animate value,
    // and update the data-state attribute to 'animate'.
    // If state is equal to 'animate', then update the src attribute of this
    // image to it's data-still value and update the data-state attribute to 'still'
    // =================================================================================
    $(".gifResult").on("click", function(event) {
      var state = $(this).attr("data-state");
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "data-animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "data-still");
      }
    });
  }); 
}; 
// =================================================================================
// FUNCTION: BUTTONS
//  Created function renderButtons for displaying gif data
//  Deleting the gifs prior to adding new gifs
//  (this is necessary otherwise you will have repeat buttons)
//  Looping through the array of gifs (based on the number of gifs printed)
//  Then dynamicaly generating buttons for each gif in the array
//  Adding a class of gif to our button
//  Adding a data-attribute
//  Providing the initial button text
//  Adding the button to the buttons-view div
// =================================================================================
function renderButtons() {
  $("#buttons-view").empty();
  for (var i = 0; i < gifs.length; i++) {
    var a = $("<button>");
    a.addClass("gif btn-gif btn-md");
    a.attr("data-name", gifs[i]);
    a.text(gifs[i]);
    $("#buttons-view").append(a);
  }
}
// =================================================================================
// ON CLICK: BUTTONS
//  This function handles events when the generate buttonis clicked
//  the search term is grabbed from the input textbox
//  and pushed or added to the array
//  Calling renderButtons at the end
//  which handles the processing of our gif array
// =================================================================================
$("#add-gif").on("click", function(event) {
  event.preventDefault();
  var gif = $("#gif-input").val().trim();
  gifs.push(gif);
  renderButtons();
});
// =================================================================================
// CALLING FUNCTIONS & SETTING EVENT LISTENERS:
//  Adding a click event listener to all elements with a class of "gif"
//  Calling the renderButtons function to display the intial buttons
// =================================================================================
$(document).on("click", ".gif", displayGifInfo);
renderButtons();

