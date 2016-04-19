
Parse.Cloud.define('hello', function(req, res) {
  res.success('Hi');
});



Parse.Cloud.afterSave ("Activity",function (request) {
                       
                       //to do add the tredning currnet value
                       
                       var trending = Parse.Object.extend("Trending");
                       var trendingQuery = new Parse.Query(trending);
                       trendingQuery.equalTo("story", request.object.get("story"));
                       trendingQuery.find({
                                          success: function(results) {
                                          alert("Successfully retrieved " + results.length + " trending object");
                                          // Do something with the returned Parse.Object values
                                          if ( results.length>0)
                                          {
                                          for (var i = 0; i < results.length; i++) {
                                          var object = results[i];
                                          alert("I am inside the loop");
                                          object.increment("currentValue");
                                          object.save();
                                          alert(object.id + "incremented");
                                          };
                                          }
                                          
                                          else
                                          {
                                          alert("I am inside the else statement");
                                          var Trending = Parse.Object.extend("Trending");
                                          var trending = new Trending();
                                          
                                          
                                          trending.set("story", request.object.get("story"));
                                          
                                          
                                          trending.set("length", 48);
                                          
                                          
                                          
                                          var arr = [], i = 48;
                                          while (i--) {
                                          arr[i] = 0;
                                          }
                                          
                                          trending.set("values", arr);
                                          
                                          trending.set("currentValue", 1);
                                          trending.set("sum", 0);
                                          trending.set("sqrSum", 0);
                                          trending.set("zScore",  -2.0);
                                          
                                          alert("I am about to save");
                                          trending.save();
                                          
                                          
                                          };
                                          },
                                          error: function(error) {
                                          alert("Error: " + error.code + " " + error.message);
                                          
                                          
                                          }
                                          });

                       
                       
                       
                       
                       });


// delete story
Parse.Cloud.beforeDelete("Story", function(request, response) {
                         
                         Parse.Cloud.useMasterKey();
                         
                         var currentuser = Parse.User.current();
                         
                         var currentUser = currentuser.id;
                         var username = request.object.get("ownerId");
                         
                         var _ = require('underscore.js');
                         
                         
                         console.log(request.object)

                         
                         if (currentUser == username) {
                         
                         console.log("I'am inside the if statment");
                         
                         

                         
                         //activity query
                         var Activity = Parse.Object.extend("Activity");
                         var activityqQuery = new Parse.Query(Activity);
                         activityqQuery.equalTo("story", request.object);
                         
                         
                         //storyline query
                         var storyline = Parse.Object.extend("StoryLine");
                         var storylineQuery = new Parse.Query(storyline);
                         storylineQuery.equalTo("story", request.object);
                         
                         //Trending Query
                         var Trending = Parse.Object.extend("Trending");
                         var trendingQuery = new Parse.Query(Trending);
                         trendingQuery.equalTo("story", request.object);
                         
                         var activityPromises = [];
                         
                         
                         activityqQuery.find(function(results){
                                    //creating the promises
                                    
                                                       
                                    _.each(results, function(result){
                                    
                                           activityPromises.push(result.destroy());
                                           });
                                            return Parse.Promise.when(activityPromises);
                                    
                                    
                                                       
                                                       })
                         storylineQuery.find(function(results){
                                                               var storylinePromises =[];
                                                               
                                                               _.each(results, function(result){
                                                                      
                                                                      storylinePromises.push(result.destroy())
                                                                      });
                                                               return Parse.Promise.when(storylinePromises);
                                                               
                                                               
                                                            })
                         trendingQuery.find(function(results){
                                                       var trendingPromises = []
                                                       
                                                       _.each(results, function(result){
                                                              
                                                              trendingPromises.push(result.destroy())
                                                              });
                                                       return Parse.Promise.when(trendingPromises);
                                                       

                                                       }).then(function(){
                                                              
                                                              response.success();
                                                               })
                         
                                                       
                                                              
                         
                         }
                         
                         else
                         {
                         
                         response.error("You are not Authorized to delete this Story");
                         }
                         
                         });



// // Use Parse.Cloud.define to define as many cloud functions as you want.

// Parse.Cloud.afterSave ("StoryLine",function (request) {
                       
                    
//                 var child = request.object.get("child")
                       
//                 if (request.object.existed() == false ) {
                       

                       
                       
//                        var user = Parse.Object.extend("User");

                       
//                        var username = request.object.get("writer");
//                        name = username.getUsername;
                       
                       
                       
//                        var userQuery = new Parse.Query(user);
//                        var usernameQuery = new Parse.Query(user);
                       
                       
                       
                       
                       
//                        console.log(request.object.get ("storyId"))
                       
//                        console.log(request.object)
                       
//                        console.log("storytitle"+request.object.get ("storyTitle"))

                       
//                        var activityQuery = new Parse.Query(Parse.Object.extend("Activity"));
                       
//                        var storyTitle = request.object.get ("storyTitle")
//                        var storyID = request.object.get ("storyId")
                       
                      
                       
                       

//                        var writerID = request.object.get ("writer")

                                                                
                                                                
//                        var currentuser = Parse.User.current();
//                        var writerUsername = currentuser.get("username");
                       
//                        userQuery.equalTo('subscription',storyID);
//                        usernameQuery.equalTo('objectId', writerID)
                       
                    
//                        activityQuery.equalTo("story", request.object.get("story"))
//                        activityQuery.equalTo("type", "subscription")
                       
                       
//                        activityQuery.find({
//                                   success: function(results) {
//                                   console.log("Successfully retrieved " + results.length + " scores.");
//                                   // Do something with the returned Parse.Object values
//                                   for (var i = 0; i < results.length; i++) {
//                                   var object = results[i];
//                                   console.log(object.id);
//                                   }
//                                   },
//                                   error: function(error) {
//                                   console.log("Error: " + error.code + " " + error.message);
//                                   }
//                                   });
                       
                                  
                       

                       
//                        console.log(writerUsername)
//                        console.log(storyTitle)

                       
                       
                       
//                        // Find devices associated with these users
//                        var pushQuery = new Parse.Query(Parse.Installation);
                       
                       
                       
                       
//                        pushQuery.matchesKeyInQuery('userPointer', 'fromUser', activityQuery);
                       
//                        pushQuery.notEqualTo('userPointer',writerID);

                       
//                        Parse.Push.send({
//                                        where: pushQuery, // Set our Installation query
//                                        data: {
//                                        alert: (writerUsername+ " posted new storyline at " + storyTitle),
//                                        badge: "Increment",
//                                        storyid: storyID
                
//                                        }
//                                        });
                       
                       
//                        //to do add the tredning currnet value
                       
//                        var trending = Parse.Object.extend("Trending");
//                        var trendingQuery = new Parse.Query(trending);
//                        trendingQuery.equalTo("story", request.object.get("story"));
//                        trendingQuery.find({
//                                   success: function(results) {
//                                   alert("Successfully retrieved " + results.length + " trending object");
//                                   // Do something with the returned Parse.Object values
//                                           if ( results.length>0)
//                                           {
//                                   for (var i = 0; i < results.length; i++) {
//                                   var object = results[i];
//                                      alert("I am inside the loop");
//                                   object.increment("currentValue");
//                                   object.save();
//                                   alert(object.id + "incremented");
//                                           };
//                                           }
                                          
//                                           else
//                                           {
//                                           alert("I am inside the else statement");
//                                           var Trending = Parse.Object.extend("Trending");
//                                           var trending = new Trending();
                                          
                                    
//                                           trending.set("story", request.object.get("story"));
                                          
                                          
//                                           trending.set("length", 48);
                                          
                                          
                                          
//                                           var arr = [], i = 48;
//                                           while (i--) {
//                                           arr[i] = 0;
//                                           }
                                          
//                                           trending.set("values", arr);
                                          
//                                           trending.set("currentValue", 1);
//                                           trending.set("sum", 0);
//                                           trending.set("sqrSum", 0);
//                                           trending.set("zScore", -2.0);
                                          
//                                           alert("I am about to save");
//                                           trending.save();

                                          
//                                           };
//                                           },
//                                   error: function(error) {
//                                   alert("Error: " + error.code + " " + error.message);
                                  

//                                   }
//                                   });
                       
//                 }
                       
//         });


// Parse.Cloud.define("FUNCTION_PASSWORD_CHECK", function(request, response)
//                    {
//                    var password = request.params.password;
                   
                   
                   
//                    Parse.User.logIn(request.user.getUsername(), password, {
//                                     success: function(results)
//                                     {
//                                     response.success(true);
//                                     },
//                                     error: function() {
//                                     response.success(false);
//                                     }
//                                     });
//                    });




// Parse.Cloud.define("deleteStoryline", function(request, response)
//                    {
                   
//                    var activityPromises = [];
//                    var storylinePromises = [];
//                    var _ = require('underscore.js');
                   
//                    var arrayLength = request.params.objectIds.length;
                   
                   
                   
//                    //alert(request.params.objectIds[i]);
//                    var StoryLine = Parse.Object.extend("StoryLine");
//                    var query = new Parse.Query(StoryLine);
                   
//                    console.log("storyline" + 112 );
                   
//                    query.containedIn("objectId", request.params.objectIds)
                   
//                    query.find().then(function(storylines){
                              
                               
                                     
//                              _.each(storylines, function(storyline)
//                                     {
//                                     var promise = new Parse.Promise();

//                                     alert("storyline to be deleted" + storyline)
                                    
//                                     console.log("storyline" + storyline );
                                    
//                              var Activity = Parse.Object.extend("Activity");
//                              var activityQuery = new Parse.Query(Activity);
//                              activityQuery.equalTo("storyline", storyline);
//                              activityQuery.find(function(results){
                                        
                                               
                                                
//                                                 alert("activity to be deleted" + results)
//                                        console.log("activity storylength" + results.length );
                                        
//                                         _.each(results, function(result){
                                               
                                               
//                                                activityPromises.push(result.destroy());
                                               
//                                                promise.resolve();
//                                                });
//                                         return Parse.Promise.when(activityPromises);
//                                         });
                             
//                              storylinePromises.push(storyline.destroy());
//                              })
//                    return Parse.Promise.when(storylinePromises);
//                    }).then(function(){
                            
//                             response.success("successful");
//                             })
                   
//                              });
                   

// Parse.Cloud.job("CalculateTrending", function(request, status) {
//                 // Set up to modify user data
//                 Parse.Cloud.useMasterKey();
                
//                 var trending = Parse.Object.extend("Trending");
//                 var trendingQuery = new Parse.Query(trending);
//                 trendingQuery.include('values');

//                 trendingQuery.each(function(trend){

                                   
                                   

                                               
//                                   alert("Successfully fetched " + trend.get("sum") );

                                   
//                                    var values = []
                                   
//                                     values = trend.get("values");
                                   
//                                    var currentValue = trend.get("currentValue");
                                   
                                   
//                                    alert("Successfully retrieved " + values );
                                   
//                                    var sum = 0;
                                   
//                                    var lastValue = values[47];
                                   
//                                    for (var i = (values.length-1); i > 0; i--) {
                                   
                                   
                                   
                                   
//                                    //console.log("value at index:" + i +" is " values[i]);
//                                    values [i] = values[i-1];
                                 
//                                    sum = sum + values[i];
                                   
                                   
//                                    }
                                   
                                   
//                                    //var sum = trend.get("sum");
//                                    var sqrSum = trend.get("sqrSum");
                                   
//                                    values[0] = currentValue;
                                   
                                   
//                                    sum = sum + currentValue;
     
//                                    var avg = sum / 48;
                                   
                                   
//                                    var sqrSum = 0;
                                   
//                                    for (var i = (values.length-1); i > -1; i--) {

//                                    sqrSum = sqrSum +Math.pow(values[i] - avg,2);
                                   
//                                    }
                                   
//                                    console.log("avarege is" + avg );
                                   
//                                    var std = Math.sqrt(sqrSum / avg, 2);
                                   
//                                    console.log("std is" + std );
                                   
//                                    var zScore = (currentValue - avg) / std ;
                                   
//                                    console.log("zScore is" + zScore );
                                   
//                                    trend.set("values", values);
                                   
//                                    trend.set("currentValue", 0);
//                                    trend.set("sum", sum);
//                                    trend.set("sqrSum", sqrSum);
//                                    trend.set("zScore", zScore);
//                                    trend.set("avg", avg);
//                                    trend.set("std", std);
                                   
//                                    alert("I am about to save");
//                                    trend.save();
                                   
                                   
                                   
//                                    })
//                                    .then(function() {
//                                            // Set the job's success status
//                                            status.success("treding was calculated");
//                                            }, function(error) {
//                                            // Set the job's error status
//                                            status.error("Uh oh, something went wrong.");
//                                            });
//                 });
