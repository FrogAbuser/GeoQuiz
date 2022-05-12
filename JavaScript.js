function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = Math.floor(Math.random() * questions.length);
    this.counter = 0;
}

Quiz.prototype.getQuestionIndex = function () {
    return this.questions[this.questionIndex];
}

Quiz.prototype.guess = function (answer) {
    if (this.getQuestionIndex().isCorrectAnswer(answer)) {
        this.score++;
    }
    this.questionIndex = Math.floor(Math.random() * questions.length);
    this.counter++;
}

Quiz.prototype.isEnded = function () {
    return this.counter === 10;
}


function Question(text, choices, answer, img) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
    this.img = img;
}

Question.prototype.isCorrectAnswer = function (choice) {
    return this.answer === choice;
}


function populate() {
    if (quiz.isEnded()) {
        showScores();
    }
    else {
        // show question
        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionIndex().text;

        // show options
        var choices = quiz.getQuestionIndex().choices;
        for (var i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }

        showProgress();
    }
};

function guess(id, guess) {
    var button = document.getElementById(id);
    button.onclick = function () {
        quiz.guess(guess);
        populate();
    }
};


function showProgress() {
    var currentQuestionNumber = quiz.counter + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestionNumber + "/" + 10;
};

function showScores() {
    button_again.style.display = 'block'
    var procentage = quiz.score / quiz.counter * 100
    var gameOverHTML = "<h1>Result</h1>";
    gameOverHTML += "<h2 id='score'> Your score: " + quiz.score + "/10 " + procentage + "%</h2>";
    if (75 < procentage) {
        gameOverHTML += "<p><b>Congratulations!</b> You scored above 75%!</p><p>Why won't you share the score with your friends?</p>";
    }
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHTML;
};

// create questions here
var questions = [
    new Question("What’s the capital of Russia?", ["Moscow", "Berlin", "Warsaw", "Kiev"], "Moscow", '<img scr="1.png">'),
    new Question("How many continents there are?", ["2", "4", "7", "12"], "7"),
    new Question("Which country is not in Asia?", ["Japan", "China", "India", "Mexico"], "Mexico"),
    new Question("In which country has the longest river?", ["Egypt", "U.S.A", "India", "Chile"], "Egypt"),
    new Question("How many oceans north America is in contact with?", ["2", "3", "4", "5"], "2"),
    new Question("What’s the name of the country in the picture?", ["Germany", "Italy", "Spain", "Australia"], "Germany"),
    new Question("What's the capital of Ireland?", ["Belfast", "Tyrone", "London", "Dublin"], "Dublin"),
    new Question("What's the capital of Kenya?", ["Kikiyu", "Mombasa", "Nairobi", "Italy"], "Nairobi"),
    new Question("What's the capital of Somalia?", ["London", "Rio de janeiro", "Germany", "Mogadishu"], "Mogadishu"),
    new Question("What's the capital of Chad?", ["N'Djamena", "Spain", "Australia", "Tirana"], "N'Djamena"),
    new Question("What's the capital of Saudi Arabia?", ["N'Djamen", "Dubai", "Riyadh", "Abuja"], "Dubai"),
    new Question("What's the capital of Afganistan?", ["Zagreb", "Dubai", "Riyadh", "Kabul"], "Kabul"),
    new Question("What's the capital of Greece?", ["Athens", "Algiers", "Rome", "Germany"], "Athens"),
    new Question("What's the capital of Italy?", ["Managua", "Rome", "N'Djamen", "Athens"], "Rome"),
    new Question("What's the capital of France?", ["Spain", "Rio de janeiro", "Paris", "Wellington"], "Paris"),
    new Question("What's the capital of Brasil?", ["Riyadh", "Mogadishu", "Rio de janeiro", "Rome"], "Rio de janeiro"),
    new Question("Where can you find Nile?", ["North America", "South America", "Africa", "Asia"], "Africa"),
    new Question("Where can you find Amazon River?", ["Asia", "North America", "South America", "Africa"], "South America"),
    new Question("Where can you find Yangtze River?", ["Africa", "Asia", "North America", "South America"], "Asia"),
    new Question("Where can you find Mississippi River?", ["South America", "Africa", "Asia", "North America"], "North America"),
    new Question("What's the name of the tallest mountain?", ["K2", "Mount Everest", "Lhotse", "Manaslu"], "Mount Everest"),
    new Question("Which is not an ocean?", ["Atlantic", "Pacific", "Indian", "Baltic"], "Balitc"),
    new Question("Which city is not in Australia?", ["New York", "Sydney", "Melbourne", "Perth"], "New York"),
    new Question("Which city is not in Chile?", ["Santiago", "Valparasio", "Nairobi", "Arica"], "Nairobi"),
    new Question("Which sea is the largest?", ["Philippine", "Coral", "Caribbean", "South China"], "Philippine"),
    new Question("What is the tallest hill in the world?", ["Denali", "Cavanal Hill", "Everest", "Arthurs' Seat"], "Cavanal Hill"),
    new Question("What is the deepest depression on earth?", ["The Mariana Trench", "Great Depression", "Major Depression", "Chronic Depression"], "The Mariana Trench"),
    new Question("Which is not a name of a Canyon?", ["Black", "Chaco", "Grand", "Matt"], "Matt"),
    new Question("What is the biggest volcano in the world?", ["Ojos del Salado", "Tipas", "Ojos Hermanos", "Incahuasi"], "Ojos del Salado"),
    new Question("What is the largest lake in the world?", ["Michigan", "Superior", "Caspian Sea", "Victoria"], "Caspian Sea")
];

var element = document.getElementById("quiz");
element.style.display = 'none';
var progr = document.getElementById("progress");
progr.style.display = 'none';


const button_start = document.getElementById('button_start');
const button_again = document.getElementById('button_again')
button_again.style.display = 'none'




button_start.addEventListener('click', () => {
  // 👇️ hide button
    button_start.style.display = 'none';
    element.style.display = 'block';
    progr.style.display = 'block';
    document.getElementById('about').style.display = 'none'
});

button_again.addEventListener('click', () => {
    location.reload()
});


// create quiz
var quiz = new Quiz(questions);

populate();