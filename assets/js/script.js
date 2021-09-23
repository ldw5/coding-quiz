const question = document.querySelector('#questions');
const choices = Array.from(document.querySelectorAll('.answer-text'));
const progressTab = document.querySelector('#progressTab');
const scoreText = document.querySelector('#score');
const progressFull = document.querySelector('#progressFull');


let currentQuestion = {}
let acceptAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'Commonly used data types DO NOT include:',
        question1: 'strings',
        question2: 'booleans',
        question3: 'alerts',
        question4: 'numbers',
        answer: 3,
    },
    {
        question: 'The condition in an if/else statement is enclosed within __.',
        question1: 'curly brackets',
        question2: 'quotes',
        question3: 'square brackets',
        question4: 'parentheses',
        answer: 4,
    },
    {
        question: 'Arrays in JavaScript can be used to store',
        question1: 'other arrays',
        question2: 'numbers amd strings',
        question3: 'booleans',
        question4: 'All of the above',
        answer: 4,
    },
    {
        question: 'String values must be enclosed within __ when being assigned to variables.',
        question1: 'quotes',
        question2: 'parentheses',
        question3: 'curly brackets',
        question4: 'commas',
        answer: 1,
    },
    

]

const ScorePoints = 100
const maxQuestions = 4

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > maxQuestions) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('./end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${maxQuestions}`
    progressFull.style.width = `${(questionCounter/maxQuestions) * 100}%`

    const questionIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionIndex]
    questions.innerText = currentQuestion.questions

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionIndex, 1)
    acceptAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptAnswers) return

        acceptAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct':
        'incorrect'
        
        if(classToApply === 'correct') {
            incrementScore(ScorePoints)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 1000)
    })
})


incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame ()