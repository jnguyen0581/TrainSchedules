// 1. Initialize Firebase
var config = {
  apiKey: "AIzaSyCo1htjptvKu2Xe3J7a_XF2OHd17dLUQNU",
  authDomain: "trainschedules-6b2f2.firebaseapp.com",
  databaseURL: "https://trainschedules-6b2f2.firebaseio.com",
  projectId: "trainschedules-6b2f2",
  storageBucket: "trainschedules-6b2f2.appspot.com",
  messagingSenderId: "696583179716"
};
firebase.initializeApp(config);
// 
var database = firebase.database();

// 2. Current time

// 3. Button for adding Train
$("#add-train-btn").on("click", function (event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var trainDestination = $("#train-destination-input").val();
  var firstTrainTime = moment($("#firsttraintime-input").val(), "HH:mm").format("X");
  var trainFrequency = $("#frequency-input").val();

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
