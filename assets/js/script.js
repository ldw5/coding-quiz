//Quiz
class Quiz {
    constructor(questions) {
        this.score = 0;
        this.questions = questions;
        this.questionIndex = 0;
    }

    getQuestionIndex() {
        return this.questions[this.questionIndex];
    }

    guess(answer) {
        if (this.getQuestionIndex().isCorrectAnswer(answer)) {
            this.score++;
        }
        this.questionIndex++;
    }

    isEnded() {
        return this.questionIndex === this.questions.length;
    }
}

//Questions
class Question {
    constructor(text, choices, answer) {
        this.text = text;
        this.choices = choices;
        this.answer = answer;
    }

    isCorrectAnswer(choice) {
        return this.answer === choice;
    }
}

function displayQuestion() {
    if (quiz.isEnded()) {
        showScores();
    } else {
        //show question
        let questionElement = document.getElementById("question");
        questionElement.innerHTML = quiz.getQuestionIndex().text;

        //show options
        let choices = quiz.getQuestionIndex().choices;
        for (let i = 0; i < choices.length; i++) {
            let choiceElement = document.getElementById("choice" + i);
            choiceElement.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }

        showProgress();
    }
};

function guess(id,guess) {
    let button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess);
        displayQuestion();
    }
}

function showProgress() {
    let currentQuestionNumber = quiz.questionIndex + 1;
    let progressElement = document.getElementById("progress");
    progressElement.innerHTML = 
    `Question ${currentQuestionNumber} of ${quiz.questions.length}`;
}

function showScores() {
    let quizEndHTML = 
    `
    <h1>Quiz Completed</h1>
    <h2 id="score">Your score: ${quiz.score} of ${quiz.questions.length}</h2>
    <div class="quiz-repeat">
    <a href="index.html"> Take Quiz Again</a>
    </div>
    `;

    let quizElement = document.getElementById("quiz");
    quizElement.innerHTML = quizEndHTML;
}

let questions = [
    new Question(
        "Commonly used data types DO NOT include:", ["strings","booleans","alerts","numbers"], "alerts"
    ),
    new Question(
        "Hyper Text Markup Language stands for?", ["XHTML","JQuery","HTML","CSS"], "HTML"
    ),
    new Question(
        "The condition in an if/else statement is enclosed within __.", ["curly brackets","quotes","square brackets","parentheses"], "parentheses"
    ),
    new Question(
        "Arrays in JavaScript can be used to store", ["other arrays","numbers amd strings","booleans","All of the above"], "All of the above"
    ),
    new Question(
        "String values must be enclosed within __ when being assigned to variables.", ["quotes","parentheses","curly brackets","commas"], "quotes"
    ),
];

let quiz = new Quiz(questions);

displayQuestion();

let time = 2;
let quizMinutes = time * 60 * 60;
quizTime = quizMinutes / 60;

let counting = document.getElementById("count-down");

function startCountdown() {
    let quizTimer = setInterval(function(){
        if (quizTime <= 0) {
            clearInterval(quizTimer);
            showScores();
        } else {
            quizTime--;
            let sec = Math.floor(quizTime % 60);
            let min = Math.floor(quizTime / 60) % 60;
            counting.innerHTML = `TIME: ${min} : ${sec}`;
        }
    }, 1000)
}

startCountdown();
