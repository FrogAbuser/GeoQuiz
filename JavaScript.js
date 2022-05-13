//Hide question counter and questions at the start
var element = document.getElementById("questions_grid");
element.style.display = 'none';
var progr = document.getElementById("query_num");
progr.style.display = 'none';

//Assgin buttons to variables
const button_start = document.getElementById('button_start');
const button_again = document.getElementById('button_again')

//Hide restart button at the start
button_again.style.display = 'none'

//Start button onclick
button_start.onclick = function() {
    //Hide start button
    button_start.style.display = 'none';
    //display questions and question counter
    element.style.display = 'block';
    progr.style.display = 'block';
    //Hide about section
    document.getElementById('about').style.display = 'none'
}

//Restart button reolads the page
button_again.onclick = function () {
    location.reload()
}


function geo_quiz(queries) {
    //Score counter
    this.score = 0;
    //assignes list of questions to this function
    this.queries = queries;
    //Gets a rand number to choose a question with
    this.queryIndex = Math.floor(Math.random() * queries.length);
    //counter for number of questions asked
    this.counter = 0;
}

//Grabs a question out of the list of questions
geo_quiz.prototype.getQueryIndex = function () {
    return this.queries[this.queryIndex];
}

//deals with answer attmpt
geo_quiz.prototype.attempt = function (correct) {
    //check if answer was correct using isCorrectAnswer funcion
    if (this.getQueryIndex().isCorrectAnswer(correct)) {
        this.score++;
    }
    //chooses new question
    this.queryIndex = Math.floor(Math.random() * queries.length);
    //adds to progres counter
    this.counter++;
}
//checks if quiz is over
geo_quiz.prototype.isEnded = function () {
    return this.counter === 10;
}

//Grabs information from the list of questions
function Query(question, answers, correct, img) {
    this.question = question;
    this.answers = answers;
    this.correct = correct;
    this.img = img;
}
//compares the correct answer to the choice
Query.prototype.isCorrectAnswer = function (choice) {
    return this.correct === choice;
}

//fills out the quiz on the screen
function quiz_fill() {
    if (quiz.isEnded()) {
        //if quiz ends show the end screen
        showScores();
    }
    else {
        //presnet the quesion on the screen
        var element = document.getElementById("query");
        element.innerHTML = quiz.getQueryIndex().img + quiz.getQueryIndex().question;
        

        //present the options on the buttons
        var answers = quiz.getQueryIndex().answers;
        //assignes an answer to each button
        for (var i = 0; i < answers.length; i++) {
            var element = document.getElementById("answer_" + i);
            element.innerHTML = answers[i];
            attempt("button_" + i, answers[i]);
        }
        //changes the progres counter
        showProgress();
    }
};
//deals with clicking on the answer button
function attempt(id, attempt) {
    //give button a function
    var button = document.getElementById(id);
    button.onclick = function () {
        //checks the answer
        quiz.attempt(attempt);
        //starts new question
        quiz_fill();
    }
};

//deals with the question counter and updating it
function showProgress() {
    var currentQueryNumber = quiz.counter + 1;
    var element = document.getElementById("query_num");
    element.innerHTML = "Question " + currentQueryNumber + "/" + 10;
};

//deals with the end screen
function showScores() {
    //shows the restart button
    button_again.style.display = 'block'
    //calculates the %
    var procentage = quiz.score / quiz.counter * 100
    var gameOverHTML = "<h1>Score Board</h1>";
    gameOverHTML += "<h2 id='score'> Your score: " + quiz.score + "/10 " + procentage + "%</h2>";
    //shows only when the score is above 75%
    if (75 < procentage) {
        gameOverHTML += "<p><b>Congratulations!</b> You scored above 75%! Why won't you share the score with your friends?</p>";
        gameOverHTML += "<a href='https://www.facebook.com/sharer.php?u=https://frogabuser.github.io/GeoQuiz/'>Facebook</a> "
        gameOverHTML += "<a href='https://twitter.com/intent/tweet?url=https://frogabuser.github.io/GeoQuiz/&text='>Twitter</a> "
        gameOverHTML += "<a href='http://vk.com/share.php?url=https://frogabuser.github.io/GeoQuiz&title=GeoQuiz&comment='>VK</a> "
    }
    //prints the end screen
    var element = document.getElementById("questions_grid");
    element.innerHTML = gameOverHTML;
};


//All the question information is created here
var queries = [
    new Query("What’s the capital of Russia?", ["Moscow", "Berlin", "Warsaw", "Kiev"], "Moscow", '<img src="images/1.png" width="300" height="150" alt="Russia"><p></p>'),
    new Query("How many continents there are?", ["2", "4", "7", "12"], "7", '<img src="images/0.png" width="300" height="150"><p></p>'),
    new Query("Which country is not in Asia?", ["Japan", "China", "India", "Mexico"], "Mexico", '<img src="images/16.png" width="300" height="150"><p></p>'),
    new Query("In which country has the longest river?", ["Egypt", "U.S.A", "India", "Chile"], "Egypt", '<img src="images/17.jpg" width="300" height="150"><p></p>'),
    new Query("How many oceans north America is in contact with?", ["2", "3", "4", "5"], "2", '<img src="images/2.png" width="300" height="150"><p></p>'),
    new Query("What’s the name of the country in the picture?", ["Germany", "Italy", "Spain", "Australia"], "Germany", '<img src="images/3.jpg" width="300" height="150"><p></p>'),
    new Query("What's the capital of Ireland?", ["Belfast", "Tyrone", "London", "Dublin"], "Dublin", '<img src="images/4.png" width="300" height="150"><p></p>'),
    new Query("What's the capital of Kenya?", ["Kikiyu", "Mombasa", "Nairobi", "Italy"], "Nairobi", '<img src="images/5.png" width="300" height="150"><p></p>'),
    new Query("What's the capital of Somalia?", ["London", "Rio de janeiro", "Germany", "Mogadishu"], "Mogadishu", '<img src="images/6.jpg" width="300" height="150"><p></p>'),
    new Query("What's the capital of Chad?", ["N'Djamena", "Spain", "Australia", "Tirana"], "N'Djamena", '<img src="images/7.jpg" width="300" height="150"><p></p>'),
    new Query("What's the capital of Saudi Arabia?", ["N'Djamen", "Dubai", "Riyadh", "Abuja"], "Riyadh", '<img src="images/8.jpg" width="300" height="150"><p></p>'),
    new Query("What's the capital of Afganistan?", ["Zagreb", "Dubai", "Riyadh", "Kabul"], "Kabul", '<img src="images/9.png" width="300" height="150"><p></p>'),
    new Query("What's the capital of Greece?", ["Athens", "Algiers", "Rome", "Germany"], "Athens", '<img src="images/10.png" width="300" height="150"><p></p>'),
    new Query("What's the capital of Italy?", ["Managua", "Rome", "N'Djamen", "Athens"], "Rome", '<img src="images/11.png" width="300" height="150"><p></p>'),
    new Query("What's the capital of France?", ["Spain", "Rio de janeiro", "Paris", "Wellington"], "Paris", '<img src="images/12.png" width="300" height="150"><p></p>'),
    new Query("What's the capital of Brasil?", ["Riyadh", "Brasilia", "Rio de janeiro", "Rome"], "Brasilia", '<img src="images/13.png" width="300" height="150"><p></p>'),
    new Query("Where can you find Nile?", ["North America", "South America", "Africa", "Asia"], "Africa", '<img src="images/17.jpg" width="300" height="150"><p></p>'),
    new Query("Where can you find Amazon River?", ["Asia", "North America", "South America", "Africa"], "South America", '<img src="images/0.png" width="300" height="150"><p></p>'),
    new Query("Where can you find Yangtze River?", ["Africa", "Asia", "North America", "South America"], "Asia", '<img src="images/0.png" width="300" height="150"><p></p>'),
    new Query("Where can you find Mississippi River?", ["South America", "Africa", "Asia", "North America"], "North America", '<img src="images/0.png" width="300" height="150"><p></p>'),
    new Query("What's the name of the tallest mountain?", ["K2", "Mount Everest", "Lhotse", "Manaslu"], "Mount Everest", '<img src="images/0.png" width="300" height="150"><p></p>'),
    new Query("Which is not an ocean?", ["Atlantic", "Pacific", "Indian", "Baltic"], "Balitc", '<img src="images/0.png" width="300" height="150"><p></p>'),
    new Query("Which city is not in Australia?", ["New York", "Sydney", "Melbourne", "Perth"], "New York", '<img src="images/14.png" width="300" height="150"><p></p>'),
    new Query("Which city is not in Chile?", ["Santiago", "Valparasio", "Nairobi", "Arica"], "Nairobi", '<img src="images/15.jpg" width="300" height="150"><p></p>'),
    new Query("Which sea is the largest?", ["Philippine", "Coral", "Caribbean", "South China"], "Philippine", '<img src="images/0.png" width="300" height="150"><p></p>'),
    new Query("What is the tallest hill in the world?", ["Denali", "Cavanal Hill", "Everest", "Arthurs' Seat"], "Cavanal Hill", '<img src="images/0.png" width="300" height="150"><p></p>'),
    new Query("What is the deepest depression on earth?", ["The Mariana Trench", "Great Depression", "Major Depression", "Chronic Depression"], "The Mariana Trench", '<img src="images/0.png" width="300" height="150"><p></p>'),
    new Query("Which is not a name of a Canyon?", ["Black", "Chaco", "Grand", "Matt"], "Matt", '<img src="images/0.png" width="300" height="150"><p></p>'),
    new Query("What is the biggest volcano in the world?", ["Ojos del Salado", "Tipas", "Ojos Hermanos", "Incahuasi"], "Ojos del Salado", '<img src="images/0.png" width="300" height="150"><p></p>'),
    new Query("What is the largest lake in the world?", ["Michigan", "Superior", "Caspian Sea", "Victoria"], "Caspian Sea", '<img src="images/0.png" width="300" height="150"><p></p>')
];


//assigns geo_quiz function to var quiz
//could have been done better
var quiz = new geo_quiz(queries);
//prints the first question to the screen
quiz_fill();