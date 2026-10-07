const questions = [
    {
        category: "SPACE",
        question: "Which planet is known as the Red Planet?",
        answers: ["Venus", "Mars", "Jupiter", "Mercury"],
        correct: 1,
        fact: "Mars looks red because iron-rich dust on its surface has rusted."
    },
    {
        category: "NATURE",
        question: "What is the largest animal on Earth?",
        answers: ["African elephant", "Colossal squid", "Blue whale", "Giraffe"],
        correct: 2,
        fact: "A blue whale can grow longer than a basketball court."
    },
    {
        category: "ARTS & CULTURE",
        question: "Who painted the Mona Lisa?",
        answers: ["Vincent van Gogh", "Claude Monet", "Michelangelo", "Leonardo da Vinci"],
        correct: 3,
        fact: "Leonardo da Vinci began painting the Mona Lisa around 1503."
    },
    {
        category: "AROUND THE WORLD",
        question: "What is the capital city of Japan?",
        answers: ["Kyoto", "Tokyo", "Osaka", "Hiroshima"],
        correct: 1,
        fact: "Tokyo is one of the world's most populous metropolitan areas."
    },
    {
        category: "SCIENCE",
        question: "What is the chemical symbol for gold?",
        answers: ["Ag", "Go", "Gd", "Au"],
        correct: 3,
        fact: "Au comes from the Latin word aurum, meaning gold."
    },
    {
        category: "FOOD & DRINK",
        question: "Which country is credited with inventing pizza?",
        answers: ["Greece", "Italy", "France", "Mexico"],
        correct: 1,
        fact: "Modern pizza developed in Naples, Italy."
    },
    {
        category: "OCEANS",
        question: "What is the largest ocean on Earth?",
        answers: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        correct: 3,
        fact: "The Pacific Ocean covers more area than all of Earth's land combined."
    },
    {
        category: "LANGUAGE",
        question: "How many letters are there in the English alphabet?",
        answers: ["24", "25", "26", "27"],
        correct: 2,
        fact: "The modern English alphabet has 26 letters, from A to Z."
    },
    {
        category: "ANIMALS",
        question: "What is a group of lions called?",
        answers: ["A pride", "A pack", "A flock", "A colony"],
        correct: 0,
        fact: "A lion family group is called a pride."
    },
    {
        category: "INVENTIONS",
        question: "Who is commonly credited with inventing the telephone?",
        answers: ["Thomas Edison", "Nikola Tesla", "Alexander Graham Bell", "Guglielmo Marconi"],
        correct: 2,
        fact: "Alexander Graham Bell was awarded a U.S. telephone patent in 1876."
    }
];

const welcomeScreen = document.querySelector("#welcome-screen");
const gameScreen = document.querySelector("#game-screen");
const resultsScreen = document.querySelector("#results-screen");
const startButton = document.querySelector("#start-button");
const restartButton = document.querySelector("#restart-button");
const nextButton = document.querySelector("#next-button");
const questionCount = document.querySelector("#question-count");
const scoreDisplay = document.querySelector("#score");
const progress = document.querySelector(".progress-track");
const progressFill = document.querySelector("#progress-fill");
const categoryDisplay = document.querySelector("#question-category");
const questionTitle = document.querySelector("#question-title");
const answersContainer = document.querySelector("#answers");
const feedback = document.querySelector("#answer-feedback");
const finalScore = document.querySelector("#final-score");
const resultTitle = document.querySelector("#result-title");
const resultCopy = document.querySelector("#result-copy");
const resultMessage = document.querySelector("#result-message");
const resultBadge = document.querySelector("#result-badge");

let currentQuestion = 0;
let score = 0;
let answerLocked = false;

function startQuiz() {
    currentQuestion = 0;
    score = 0;
    scoreDisplay.textContent = "0";
    welcomeScreen.hidden = true;
    resultsScreen.hidden = true;
    gameScreen.hidden = false;
    showQuestion();
}

function showQuestion() {
    const item = questions[currentQuestion];
    answerLocked = false;
    questionCount.textContent = `QUESTION ${currentQuestion + 1} / ${questions.length}`;
    categoryDisplay.textContent = item.category;
    questionTitle.textContent = item.question;
    feedback.textContent = "";
    nextButton.hidden = true;
    nextButton.innerHTML = currentQuestion === questions.length - 1
        ? 'See my results <span aria-hidden="true">→</span>'
        : 'Next question <span aria-hidden="true">→</span>';
    progress.setAttribute("aria-valuenow", String(currentQuestion));
    progressFill.style.width = `${(currentQuestion / questions.length) * 100}%`;
    answersContainer.replaceChildren();

    item.answers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.className = "answer-option";
        button.type = "button";
        button.dataset.answer = String(index);
        button.innerHTML = `<span class="answer-letter">${String.fromCharCode(65 + index)}</span><span class="answer-text"></span><span class="answer-mark" aria-hidden="true"></span>`;
        button.querySelector(".answer-text").textContent = answer;
        button.addEventListener("click", () => chooseAnswer(index));
        answersContainer.append(button);
    });
}

function chooseAnswer(selectedIndex) {
    if (answerLocked) return;
    answerLocked = true;

    const item = questions[currentQuestion];
    const isCorrect = selectedIndex === item.correct;
    const choices = answersContainer.querySelectorAll(".answer-option");

    if (isCorrect) {
        score += 1;
        scoreDisplay.textContent = String(score);
    }

    choices.forEach((choice, index) => {
        choice.disabled = true;
        if (index === item.correct) {
            choice.classList.add("is-correct");
            choice.querySelector(".answer-mark").textContent = "✓";
        } else if (index === selectedIndex) {
            choice.classList.add("is-incorrect");
            choice.querySelector(".answer-mark").textContent = "×";
        }
    });

    feedback.textContent = `${isCorrect ? "That's right!" : "Not quite."} ${item.fact}`;
    feedback.classList.toggle("is-correct", isCorrect);
    feedback.classList.toggle("is-incorrect", !isCorrect);
    nextButton.hidden = false;
    progress.setAttribute("aria-valuenow", String(currentQuestion + 1));
    progressFill.style.width = `${((currentQuestion + 1) / questions.length) * 100}%`;
    nextButton.focus();
}

function showResults() {
    gameScreen.hidden = true;
    resultsScreen.hidden = false;
    finalScore.textContent = String(score);

    if (score === questions.length) {
        resultTitle.textContent = "You're a quiz whiz!";
        resultCopy.textContent = "A perfect round. Your curious mind is on fire.";
        resultMessage.textContent = "Perfect score! Go on, take a bow.";
        resultBadge.textContent = "🏆";
    } else if (score >= Math.ceil(questions.length * 0.6)) {
        resultTitle.textContent = "Nicely done!";
        resultCopy.textContent = "You know your stuff. Fancy another round?";
        resultMessage.textContent = "That's a pretty great result!";
        resultBadge.textContent = "🎉";
    } else {
        resultTitle.textContent = "Good brain stretch!";
        resultCopy.textContent = "Every question is a chance to learn something new.";
        resultMessage.textContent = "A rematch is only a tap away.";
        resultBadge.textContent = "🌱";
    }
    restartButton.focus();
}

startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", startQuiz);
nextButton.addEventListener("click", () => {
    if (!answerLocked) return;
    currentQuestion += 1;
    if (currentQuestion === questions.length) {
        showResults();
    } else {
        showQuestion();
        questionTitle.focus();
    }
});
