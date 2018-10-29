// $(document).ready(function () {
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

// 3. Button for adding Train
$("#add-train-btn").on("click", function (event) {
    event.preventDefault();

    // Grabs train input
    var name = $("#name").val().trim();
    var destination = $("#destination").val().trim();
    var first = $("#first").val().trim();
    var frequency = $("#frequency").val().trim();

    // console.log(name, destination, first, frequency);


    database.ref().push({
        name: name,
        destination: destination,
        first: first,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP

    });

    // Clears all of the text-boxes
    $("#name").val("");
    $("#destination").val("");
    $("#first").val("");
    $("#frequency").val("");

    // Determine when the next train arrives.
    return false;
});

database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());

    // var newRow = $("<div>").addClass("row");
    var nameCol = childSnapshot.val().name;
    var destinationCol = childSnapshot.val().destination;
    var first = childSnapshot.val().first;
    var frequencyCol = childSnapshot.val().frequency;
    // var nextArrivalCol = $("<div>").addClass("col-2").text(childSnapshot.val().nextArrival);
    // var arriveCol = $("<div>").addClass("col-2").text(childSnapshot.val().arrive);

    // newRow.append(nameCol, destinationCol, first, frequencyCol, nextArrivalCol, arriveCol);
    // $("#train").append(newRow);



// First Time (pushed back 1 year to make sure it comes before current time)
// var firstTimeConverted = moment(first, "HH:mm").subtract(1, "years");
//     console.log(firstTimeConverted);

// Current Time
var currentTime = moment();
console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));


// //Prettify the train start
// var firstTrainPretty = moment.unix(first).format("HH:mm");

//To Calculate minutes train runs since last time

var frequencyCol = moment().diff(moment(first, "X"), "minutes");




/// Difference between the times
var diffTime = moment().diff(moment.unix(first), "minutes")%frequencyCol;
    console.log("DIFFERENCE IN TIME: " + diffTime);

// Time apart (remainder) IMPORTANT
// var tRemainder = diffTime % frequencyCol;
// console.log(tRemainder);

// Minute Until Train IMPORTANT
var tMinutesTillTrain = frequencyCol - diffTime;
    // $("#train").append(newRow);
console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

// Next Train
var arrive = moment().add(tMinutesTillTrain, "minutes").format("HH:mm");
console.log("ARRIVAL TIME: " + arrive);

// Create the new row
var newRow = $("<tr>").append(
    $("<td>").text(nameCol),
    $("<td>").text(destinationCol),
    $("<td>").text(frequencyCol),
    // $("<td>").text(firstTrainPretty),
    $("<td>").text(arrive),
    $("<td>").text(tMinutesTillTrain)
);

// Append the new row to the table
$("#train > tbody").append(newRow);

});
