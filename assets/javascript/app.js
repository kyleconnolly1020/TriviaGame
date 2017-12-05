//Start by declaring variables

//An Object called triviaGame
var triviaGame = {
    correctAnswers: 0,
    incorrectAnswers: 0,
    unanswered: 0,
    totalQuestions: 8,
    questionsArray: ["monarchs", "periodEurope", "battle", "moon", "castro", "declaration", "expedition", "clan"],
    answersArray: ["victoria", "renaissance", "stalingrad", "soviet", "2016", "benfranklin", "magellan", "fujiwara"]
};

var seconds = 100; 

function countdown() {
    //Set the interval to 1 second
    intervalId = setInterval(decrement, 1000);
  }

function decrement() {
    //tick down by the second
    seconds--;
    //display the time in the #timer span tags
    $("#timer").html(seconds);

    //run this block of code if the user runs out of time
    if (seconds === 0){
        //Check the user's score, similar to clicking the submit button
        submitAnswers();
        //.detach() the form and display the result 
        showResult();
        //Clear the interval so the decrement is no longer running in the background
        clearInterval(intervalId);
        //Change the countdown's display 
        $("#remainingTime").html("<h2>Ran Out of Time!</h2>");
    }
}


//in a function, clear the contents of the form and print the results to the browser window. 

function showResult(){
    //clear the contents of the form
    $("#triviaQuestions").detach();
    //create a new div for the printed results
    var newDiv = $("<div>");
    //Set the html that will be displayed in the div
    newDiv.html("<h3> All Done! </h3>" + 
                "<br><p> Correct Answers: " + triviaGame.correctAnswers +"</p>" + 
                "<p>Incorrect Answers: " + triviaGame.incorrectAnswers +"</p>" +
                "<p>Unanswered: " + triviaGame.unanswered + "</p>");
    $("#emptydiv").append(newDiv);
    //Set the css styling for emptydiv
    $("#emptydiv").attr("class", "fancy");
}


//Function that checks the user's answers against the correct answers stored in the answersArray key

function submitAnswers() {
    //Loop through the length of the answersArray key in triviaGame object
    for (var i = 0; i < triviaGame.answersArray.length; i++) {   

        //Set a variable "answerchoice" to the checked value on the particular question in the loop
        var answerchoice = $("input[name=" + triviaGame.questionsArray[i] + "]:checked").val();
        
        //Set a variable "isChecked" to be set to true if a question has not been checked
        var isChecked = !$("input[name=" + triviaGame.questionsArray[i] + "]:checked").is(':checked');

        //If isChecked is true, add one to unanswered counter
        if (isChecked) {
            triviaGame.unanswered++;
        }

        //If the checked value equals a value in the answers array
        else if (answerchoice === triviaGame.answersArray[i]) {
            //add one to correct answers
            triviaGame.correctAnswers++;
        }

        //Else, the answer has been checked and it is not correct, so add one to incorrectAnswers
        else  {
            triviaGame.incorrectAnswers++;
        }
    }
}


$(document).ready(function(){
//Run the countdown timer on document.ready
countdown();
//Run the submitAnswers function on clicking the submit button 
    $("#checkResults").on("click", function(e) {
        e.preventDefault();
        submitAnswers();
        showResult();
        clearInterval(intervalId);
        $("#remainingTime").html("");
    })
});