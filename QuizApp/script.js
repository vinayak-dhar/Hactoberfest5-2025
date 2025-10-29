
const questions = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    answer: "Paris"
  },
  {
    question: "Who is known as the 'Father of the Nation' in India?",
    options: ["Subhas Chandra Bose", "Mahatma Gandhi", "Jawaharlal Nehru", "B. R. Ambedkar"],
    answer: "Mahatma Gandhi"
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Venus", "Mars", "Jupiter"],
    answer: "Mars"
  },
  {
    question: "How many continents are there in the world?",
    options: ["5", "6", "7", "8"],
    answer: "7"
  },
  {
    question: "Who wrote the national anthem of India?",
    options: ["Rabindranath Tagore", "Bankim Chandra Chatterjee", "Sarojini Naidu", "C. Rajagopalachari"],
    answer: "Rabindranath Tagore"
  },
  {
    question: "What is the largest ocean in the world?",
    options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
    answer: "Pacific Ocean"
  },
  {
    question: "In which year did India become independent?",
    options: ["1945", "1946", "1947", "1948"],
    answer: "1947"
  }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

// Get from localStorage if available
let score = localStorage.getItem("score") ? parseInt(localStorage.getItem("score")) : 0;
let currentQuesIdx = localStorage.getItem("index") ? parseInt(localStorage.getItem("index")) : 0;

function startQuiz(){
  score = 0;
  currentQuesIdx = 0;
  localStorage.removeItem("score");
  localStorage.removeItem("index");

  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion(){
  resetState();
  let currentQues = questions[currentQuesIdx];
  let questionNo = currentQuesIdx + 1;
  questionElement.innerHTML = questionNo + ". " + currentQues.question;

  currentQues.options.forEach(option => {
    const button = document.createElement("button");
    button.innerHTML = option;
    button.classList.add("btn");
    answerButtons.appendChild(button);

    button.addEventListener("click", selectAns);
  });
}

function resetState(){
  nextButton.style.display = "none";
  while(answerButtons.firstChild){
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAns(e){
  const selectedBtn = e.target;
  const selectedAnswer = selectedBtn.innerHTML;
  const correctAnswer = questions[currentQuesIdx].answer;

  if(selectedAnswer === correctAnswer){
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }

  // Save score and index to localStorage
  localStorage.setItem("score", score);
  localStorage.setItem("index", currentQuesIdx);

  Array.from(answerButtons.children).forEach(button => {
    button.disabled = true;
    if(button.innerHTML === correctAnswer){
      button.classList.add("correct");
    }
  });

  nextButton.style.display = "block";
}

function showScore(){
  resetState();
  questionElement.innerHTML = `Your score is ${score}!`;
  nextButton.innerHTML = "Take again";
  nextButton.style.display = "block";

  // Clear localStorage after quiz ends
  localStorage.removeItem("score");
  localStorage.removeItem("index");
}

function handleNextbtn(){
  currentQuesIdx++;
  if(currentQuesIdx < questions.length){
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if(currentQuesIdx < questions.length){
    handleNextbtn();
  } else {
    startQuiz();
  }
});

showQuestion(); // Load the current saved question

