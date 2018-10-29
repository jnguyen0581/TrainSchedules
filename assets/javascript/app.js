
$(document).ready(function () {
// 1. Initialize Firebase
var config = {
  apiKey: "AIzaSyCv_shjT0bVot-DGyzWL5hhpF5fjqCx8lE",
  authDomain: "traintrain-8950b.firebaseapp.com",
  databaseURL: "https://traintrain-8950b.firebaseio.com",
  projectId: "traintrain-8950b",
  storageBucket: "traintrain-8950b.appspot.com",
  messagingSenderId: "265291646366"
};
firebase.initializeApp(config);

var database = firebase.database();

// 2. Current time
var currentTime = moment();
$("#current-time").text((moment(currentTime).format("HH:MM")));

// 3. Button for adding Train
$("#add-train-btn").on("click", function (event) {
  event.preventDefault();

  // Grabs train input
  var trainName = $("#train-name-input").val().trim();
  var trainDestination = $("#destination-input").val().trim();
  var firstTrainTime = moment($("#first-train-input").val().trim(), "HH:MM").format("X");
  var trainFrequency = $("#frequency-input").val().trim();

  // Creates local "temporary" object for holding train data
  var newTrain = {
    name: trainName,
    destination: trainDestination,
    firstTrain: firstTrainTime,
    frequency: trainFrequency,
    dateAdded: firebase.database.ServerValue.TIMESTAMP

  };

  //Uploads train to data to the database
  database.ref().push(newTrain);

  // console.log(newTrain.name);
  // console.log(newTrain.destination);
  // console.log(newTrain.firstTrain);
  // console.log(newTrain.frequency);

  // alert("Train added");

  //Clear all the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-train-input").val("");
  $("#frequency-input").val("");
  // return false;
});

//Create data base event for adding trains to the database
database.ref().on("child_added", function (childSnapshot) {
  var csv = childSnapshot.val();

  // Log everything that's coming out of snapshot
  // console.log(csv.name);
  // console.log(csv.destination);
  // console.log(csv.firstTrain);
  // console.log(csv.frequency);
 
  //store everythin going to a var
  var trainName = childSnapshot.val().name;
 var trainDestination = childSnapshot.val().destination;
 var firstTrainTime = childSnapshot.val().firstTrain;
 var trainFrequency = childSnapshot.val().frequency;

  // // Change the HTML to reflect
  // $("#name-display").text(csv.name);
  // $("#destination-display").text(csv.destination);
  // $("#firstTrain-display").text(csv.firstTrain);
  // $("#frequency-display").text(csv.frequency);

//   // Handle the errors
// }, function (errorObject) {
//   console.log("Errors handled: " + errorObject.code);
// },

  // dataRef.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function (snapshot) {
  //   // Change the HTML to reflect
  //   $("#name-display").text(snapshot.val().trainName);
  //   $("#destination-display").text(snapshot.val().trainDestination);
  //   $("#firstTrain-display").text(snapshot.val().firstTrainTime);
  //   $("#frequency-display").text(snapshot.val().trainFrequency);
  //   // });

    // // Time calculation
    // var tFrequency = 5;

    // // First train
    var firstTrain = " ";

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTrain, "HH:MM").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("HH:MM"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);
    
    // Time apart (remainder)
    var tRemainder = diffTime % trainFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesToArrive = trainFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesToArrive);

    // Next Train
    var nextArrival = moment().add(tMinutesToArrive, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextArrival).format("HH:MM"));

     //Prettify the train start
    var firstTrainPretty = moment.unix(firstTrain).format("HH:MM");


    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(trainDestination),
      $("<td>").text(firstTrainPretty),
      $("<td>").text(trainFrequency),
      $("<td>").text(nextArrival),
      $("<td>").text(tMinutesToArrive)
    );

    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
  });
})