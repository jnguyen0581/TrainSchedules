

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
    var first = moment($("#first").val().trim(), "HH:mm").format("X");
    var frequency = $("#frequency").val().trim();

    // console.log(name, destination, first, frequency);


    database.ref().push({
        name: name,
        destination: destination,
        first: first,
        frequency: frequency,
        // dateAdded: firebase.database.ServerValue.TIMESTAMP

    });

    // Clears all of the text-boxes
    $("#name").val("");
    $("#destination").val("");
    $("#first").val("");
    $("#frequency").val("");

    // Determine when the next train arrives.
    return false;
});

database.ref().on("child_added", function (childsnapshot) {
    console.log(childsnapshot.val());

    // var newRow = $("<div>").addClass("row");
    var nameCol = childsnapshot.val().name;
    var destinationCol = childsnapshot.val().destination;
    var first = childsnapshot.val().first;
    var frequencyCol = childsnapshot.val().frequency;

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));


    /// Difference between the times
    var diffTime = moment().diff(moment.unix(first), "minutes") % frequencyCol;
    // console.log("DIFFERENCE IN TIME: " + diffTime);

  
    // Minute Until Train IMPORTANT
    var tMinutesTillTrain = frequencyCol - diffTime;
 

    // Next Train
    var arrive = moment().add(tMinutesTillTrain, "minutes").format("HH:mm");
    console.log("ARRIVAL TIME: " + arrive);

    // Create the new row
    var newRow = $("<tr>").append(
        $("<td>").text(nameCol),
        $("<td>").text(destinationCol),
        $("<td>").text(frequencyCol),
        $("<td>").text(arrive),
        $("<td>").text(tMinutesTillTrain)
    );

    // Append the new row to the table
    $("#train > tbody").append(newRow);

});