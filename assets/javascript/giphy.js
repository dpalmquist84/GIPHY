

  // Initial array of tvshows
      var shows = ["Arrested Development", "Game of Thrones", "Veep", "NFL"];




      // displayMovieInfo function re-renders the HTML to display the appropriate content
      function displayTVInfo() {

        var show = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=20292832777648e5ab676d907f7b7d29&q=" + show + "&limit=25&offset=0&rating=G&lang=en";


        // Creates AJAX call for the specific movie button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {

        
        

      $("#tv-view").empty();

        for( i = 0; i < response.data.length; i++){
       var tv = $("<div class= tvShows>")
       var rating = response.data[i].rating;
       var pOne = $("#tv-view").append("Rating: " + rating);
       
       animateGif = response.data[i].images.fixed_height.url;
       gif = response.data[i].images.fixed_height_still.url;
       var pTwo = $("<img src='" + gif + "'>").append().addClass('gif');
       $("img").attr("data-animate", response.data[i].images.fixed_height.url);
       $("img").attr("data-still", response.data[i].images.fixed_height_still.url);
       
     

       

       //$("#tv-view").prepend(pOne);
       $("#tv-view").prepend(pTwo);
       console.log(pTwo)
       }

        });
     
      }

      

      // Function for displaying movie data
      function renderButtons() {

        // Deletes the movies prior to adding new movies
        // (this is necessary otherwise you will have repeat buttons)
        $("#button-view").empty();
        // Loops through the array of movies
        for (var i = 0; i < shows.length; i++) {

          // Then dynamicaly generates buttons for each movie in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var a = $("<button>");
          // Adds a class of movie to our button
          a.addClass("show");
          // Added a data-attribute
          a.attr("data-name", shows[i]);
          // Provided the initial button text
          a.text(shows[i]);

          // Added the button to the buttons-view div
          $("#button-view").append(a);
        }
      }

      // This function handles events where the add movie button is clicked
      $("#add-show").on("click", function(event) {
        event.preventDefault();
        // This line of code will grab the input from the textbox
        var show = $("#show-input").val().trim();
       $('#tv-view').empty();

        // The movie from the textbox is then added to our array
        shows.push(show);

        // Calling renderButtons which handles the processing of our movie array
        renderButtons();

      });

 




      // Adding click event listeners to all elements with a class of "movie"
      $(document).on("click", ".show", displayTVInfo);

      // Calling the renderButtons function to display the intial buttons
      renderButtons();

      $(document).on("click", ".gif", function(){
        console.log("clicked")

      
        

      var state = $(this).attr("data-state");
      console.log(this);
     
  
      // If the clicked image's state is still, update its src attribute to what its data-animate value is.
      // Then, set the image's data-state to animate
      // Else set src to the data-still value
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
        console.log(this);
        console.log(animateGif);
       
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
        console.log(this);
        console.log(gif);
 
      }
      


      });

     
 