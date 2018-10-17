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
$("#current-time").text((moment(currentTime).format("HH:mm")));

// 3. Button for adding Train
$("#add-train-btn").on("click", function (event) {
  event.preventDefault();

  // Grabs train input
  var trainName = $("#train-name-input").val().trim();
  var trainDestination = $("#destination-input").val().trim();
  var firstTrainTime = $("#firsttraintime-input").val().trim();
  var trainFrequency = $("#frequency-input").val().trim();

  // Creates local "temporary" object for holding train data
  var newTrain = {
    name: trainName,
    destination: trainDestination,
    firstTrain: firstTrainTime,
    frequency: trainFrequency,
  };

  //Uploads train to data to the database
  database.ref().push(newTrain);
  
console.log(newTrain.name);
console.log(newTrain.destination);
console.log(newTrain.firstTrain);
console.log(newTrain.frequency);

alert("Train added");
});

//Clear all the text-boxes

//Create data base event for adding trains to the database

// store evething into a variable

