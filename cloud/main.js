
// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
Parse.Cloud.define("hello", function(request, response) {
	response.success("Hello naing!");
});

Parse.Cloud.define("averageStars", function(request, response) {
  var query = new Parse.Query("Review");
  query.equalTo("movie", request.params.movie);
  query.find({
    success: function(results) {      
      var sum = 0;
      for (var i = 0; i < results.length; ++i) {
        sum += results[i].get("stars");
      }
      response.success("average is "+sum / results.length);
      
    },
    error: function() {
      response.error("movie lookup failed");
    }
  });
});

Parse.Cloud.beforeSave("Review", function(request, response) {
  if (request.object.get("stars") < 1) {
    response.error("you cannot give less than one star");
  } else if (request.object.get("stars") > 5) {
    response.error("you cannot give more than five stars");
  } else {
  	var comment = request.object.get("comment");
	if (comment.length > 140) {
	  // Truncate and add a ...
	  request.object.set("comment", comment.substring(0, 137) + "...");
	}
	response.success();
  }
});

Parse.Cloud.define("GameScores", function(request,response){
	// Simple syntax to create a new subclass of Parse.Object.
	var GameScore = Parse.Object.extend("GameScore");

	// Create a new instance of that class.
	var gameScore = new GameScore();

	gameScore.set("score", 1337);
	gameScore.set("playerName", "Sean Plott");
	gameScore.set("cheatMode", false);
	gameScore.save(null, {
	  success: function(gameScore) {
	    // Execute any logic that should take place after the object is saved.
	    alert('New object created with objectId: ' + gameScore.id);
	    response.success("game score complete");
	  },
	  error: function(gameScore, error) {
	    // Execute any logic that should take place if the save fails.
	    // error is a Parse.Error with an error code and description.
	    alert('Failed to create new object, with error code: ' + error.description);
	  }
	});

});