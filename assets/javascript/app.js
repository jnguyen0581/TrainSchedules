// 1. Initialize Firebase
var config = {
  apiKey: "AIzaSyBI95Ug45ZxuPHB_A9-hZAVQTO_ExQLYtU",
  authDomain: "clickbuttoncounter-f9be1.firebaseapp.com",
  databaseURL: "https://clickbuttoncounter-f9be1.firebaseio.com",
  projectId: "clickbuttoncounter-f9be1",
  storageBucket: "clickbuttoncounter-f9be1.appspot.com",
  messagingSenderId: "112657138201"
};
firebase.initializeApp(config);

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
    role: trainDestination,
    start: firstTrainTime,
    rate: trainFrequency,
  };

  //Uploads train to data to the database
  database.ref().push(newTrain);
  alert("Train added")
})
