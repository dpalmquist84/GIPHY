

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

            
   


       $('#tv-view').empty();

       for( i = 0; i < response.data.length; i++){
           var tv = $("<div class= tvShows>")
           var rating = response.data[i].rating;
           var pOne = ("Rating: " + rating);
           
           animateGif = response.data[i].images.fixed_height.url;
           gif = response.data[i].images.fixed_height_still.url;
           var pTwo = $("<img src='" + gif + "'>").append().addClass('gif');
           
           pTwo.attr("data-animate", response.data[i].images.fixed_height.url);
           pTwo.attr("data-still", response.data[i].images.fixed_height_still.url);
           
           // $("#tv-view").prepend(pOne, pTwo);
           tv.prepend(pOne);
           tv.prepend(pTwo);
           
          
      
        }

          // for (var i = 0; i < 10; i++) {
          // var gifDiv = $("<div class='item'>");
          // var rating = response.data[i].rating;
          // var gifP = $('<p class="rating-info">');
          // var gifImage = $('<img class="gif-image">');
          // gifImage.attr("src",response.data[i].images.fixed_height_still.url);               
          // gifP.text('Rated: ' + rating);
          // gifDiv.append(gifP);
          // gifDiv.append(gifImage);
          // $("#gif-display").append(gifDiv);
          //   }
        

        });
     
      };

      

      // Function for displaying movie data
      function renderButtons() {

        // Deletes the movies prior to adding new movies
        // (this is necessary otherwise you will have repeat buttons)
        $("#button-view").empty();
       ;

        // Loops through the array of movies
        for (var i = 0; i < shows.length; i++) {

          // Then dynamicaly generates buttons for each movie in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var a = $("<button>");
          // Adds a class of show to our button
          a.addClass("show");
          // Added a data-attribute
          a.attr("data-name", shows[i]);
          // Provided the initial button text
          a.text(shows[i]);

          // Added the button to the buttons-view div
          $("#button-view").append(a);
        }
      }

      // This function handles events where the add show button is clicked
      $("#add-show").on("click", function(event) {
        event.preventDefault();
        // This line of code will grab the input from the textbox
        var show = $("#show-input").val().trim();
       $('#tv-view').empty();
       $("#show-input").val("");


        // The show from the textbox is then added to our array
        shows.push(show);

        // Calling renderButtons which handles the processing of our show array
        renderButtons();

      });

 




      // Adding click event listeners to all elements with a class of "movie"
      $(document).on("click", ".show", displayTVInfo);

      // Calling the renderButtons function to display the intial buttons
      renderButtons();

      $(document).on("click", ".gif", function(){
          

      
        
      var state = $(this).attr("data-state")
      var gif = $(this).attr("data-still");
      console.log(this);
      var animateGif = $(this).attr("data-animate");
     console.log(animateGif)
     $(".gif").prepend(pOne);
  
      // If the clicked image's state is still, update its src attribute to what its data-animate value is.
      // Then, set the image's data-state to animate
      // Else set src to the data-still value
      if (state === "still") {
        $(this).attr("src", animateGif);
        $(this).attr("data-state", "animate");
        console.log(this);
     
       
      } else {
        $(this).attr("src", gif);
        $(this).attr("data-state", "still");
        console.log(this);
        
 
      }
    });

    
      




     
 