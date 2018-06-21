var audios = [
    new Audio("../images/agrail.wav"),
    new Audio("../images/tart.wav"),
    new Audio("../images/nibble.wav"),
    new Audio("../images/icky.wav"),
    new Audio("../images/fart.wav"),
    new Audio("../images/coconut.wav"),
]
var randAudio = audios[Math.floor(Math.random() * audios.length)];
var timer;
var intervalId;
var questions = [
     {
         question: "Have many questions will I ask?",
         choices: ["Five questions", "Three, Sir!", "Three Questions", "FIVE"],
        correctAnswer:1
    },
    {
         question: "What is your name?",
         choices: ["My name is Sir Lancelot of Camelot", "Pickle Rick", "Vlad the Impaler", "Sir Robin of Camelot"],
         correctAnswer:0
     },
     {
         question: "What is your quest?",
         choices: ["To get to the other side", "I seek the Holy Grail", "Who wants to know?", "Your mother was a hamster"],
         correctAnswer:1
     },
     {
        question: "What is your favorite color?",
        choices: ["Blue.. No, Yell- AHHHHHH!", "Pink", "Blue", "Puke Green"],
        correctAnswer:2
    },
    {
        question: "What is the air-speed velocity of an unladen swallow?",
        choices: ["What do you mean?", "An African or European swallow?", "What?", "How do know so much about swallows?"],
        correctAnswer:1
    }
];
var currentQuestion = 0;
var correctAnswers = 0;
var quizOver = false;

$(document).ready(function () {
    startTimer();
    if (timer == 0) {
        quizOver = true;
        resetQuiz();
    }
    else{
    // Display the first question
        displayCurrentQuestion();
        $(this).find(".quizMessage").hide();

        // On clicking next, display the next question
        $(this).find(".nextButton").on("click", function () {
        
            if (!quizOver) {

                let value = $("input[type='radio']:checked").val();

                if (value == undefined) {
                    $(document).find(".quizMessage").text("Answer the question!");
                    $(document).find(".quizMessage").show();
                } else {
                    // TODO: Remove any message -> not sure if this is efficient to call this each time....
                    $(document).find(".quizMessage").hide();

                    if (value == questions[currentQuestion].correctAnswer) {
                        correctAnswers++;
                    }

                    currentQuestion++; // Since we have already displayed the first question on DOM ready
                    if (currentQuestion < questions.length) {
                        displayCurrentQuestion();
                    } else {
                        displayScore();
                        //                    $(document).find(".nextButton").toggle();
                        //                    $(document).find(".playAgainButton").toggle();
                        // Change the text in the next button to ask if user wants to play again
                        $(document).find(".nextButton").text("Play Again?");
                        quizOver = true;
                    }
                }
            } else { // quiz is over and clicked the next button (which now displays 'Play Again?'
                quizOver = false;
                $(document).find(".nextButton").text("Next Question");
                resetQuiz();
                displayCurrentQuestion();
                hideScore();
            }
    });
    }
});

// This displays the current question AND the choices
function displayCurrentQuestion() {

    console.log("In display current Question");

    var question = questions[currentQuestion].question;
    var questionClass = $(document).find(".quizContainer > .question");
    var choiceList = $(document).find(".quizContainer > .choiceList");
    var numChoices = questions[currentQuestion].choices.length;

    // Set the questionClass text to the current question
    $(questionClass).text(question);

    // Remove all current <li> elements (if any)
    $(choiceList).find("li").remove();

    var choice;
    for (i = 0; i < numChoices; i++) {
        choice = questions[currentQuestion].choices[i];
        $('<li><input type="radio" value=' + i + ' name="dynradio" />' + choice + '</li>').appendTo(choiceList);
    }
}

function resetQuiz() {
    currentQuestion = 0;
    correctAnswers = 0;
    startTimer();
    hideScore();
}

function displayScore() {
    $(document).find(".quizContainer > .result").text("You scored: " + correctAnswers + " out of: " + questions.length);
    $(document).find(".quizContainer > .result").show();
}

function hideScore() {
    $(document).find(".result").hide();
}
function startTimer(){
    
    timer = 40;
    $('.timer').html('<h2>Time Remaining: ' + timer + ' seconds</h2>');
    counter = setInterval(runTimer, 1000);
}
function runTimer(){
    	
    // remove a second
    timer--

    // display timer
    $('.timer').html('<h2>Time Remaining: ' + timer + ' seconds</h2>');
    
    // you ran out of time
    if (timer === 0){

        // stop the counter from going negative
        stopTimer();
    }
}
function stopTimer(){
    clearInterval(counter);
}
//