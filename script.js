// --- Weather Section ---
const weatherDataDiv = document.getElementById('weatherData');
const weatherSection = document.getElementById('weatherSection');
const cityForm = document.getElementById('cityForm');
const cityInput = document.getElementById('cityInput');

// Use a demo city (e.g., London) and a demo response if no API key is available
function fetchWeatherDemo(city = "London") {
  // Demo weather data for London or other cities
  let icon = "10d", desc = "light rain", temp = 16;
  if (city.toLowerCase() === "paris") { icon = "01d"; desc = "clear sky"; temp = 22; }
  if (city.toLowerCase() === "new york") { icon = "04d"; desc = "broken clouds"; temp = 18; }
  if (city.toLowerCase() === "tokyo") { icon = "13d"; desc = "snow"; temp = 2; }
  weatherDataDiv.innerHTML = `
    <img id="weatherIcon" src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="icon">
    <span><b>${city.charAt(0).toUpperCase() + city.slice(1)}</b>: ${temp}°C, ${desc}</span>
  `;
  // Change background based on weather
  if (desc.includes('rain')) document.body.style.background = 'linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)';
  else if (desc.includes('cloud')) document.body.style.background = 'linear-gradient(120deg, #d7d2cc 0%, #304352 100%)';
  else if (desc.includes('clear')) document.body.style.background = 'linear-gradient(120deg, #fceabb 0%, #f8b500 100%)';
  else if (desc.includes('snow')) document.body.style.background = 'linear-gradient(120deg, #e0eafc 0%, #cfdef3 100%)';
  else document.body.style.background = 'linear-gradient(120deg, #e0eafc 0%, #cfdef3 100%)';
}

// Default load
fetchWeatherDemo();

// Handle city form submit
if (cityForm) {
  cityForm.onsubmit = function(e) {
    e.preventDefault();
    const city = cityInput.value.trim();
    if (city) {
      fetchWeatherDemo(city);
    }
  };
}

// --- Quiz Section ---
const quizContainer = document.getElementById('quizContainer');
const quizScoreDiv = document.getElementById('quizScore');

// Basic quiz questions
const quizQuestions = [
  {
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    answer: "Paris"
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    answer: "Mars"
  },
  {
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    answer: "4"
  },
  {
    question: "Which animal is known as the King of the Jungle?",
    options: ["Tiger", "Elephant", "Lion", "Bear"],
    answer: "Lion"
  },
  {
    question: "Which is the largest ocean on Earth?",
    options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
    answer: "Pacific Ocean"
  }
];

let quizIndex = 0;
let quizScore = 0;

// Applause audio
const applause = new Audio("https://cdn.pixabay.com/audio/2022/03/15/audio_115b9b7bfa.mp3");

// Paper drop appreciation
function showPaperDrop() {
  const colors = ["#fff", "#ff69b4", "#a8edea", "#fed6e3", "#fcb69f", "#ffecd2"];
  for (let i = 0; i < 30; i++) {
    const paper = document.createElement("div");
    paper.className = "paper-drop";
    paper.style.left = Math.random() * 100 + "vw";
    paper.style.background = colors[Math.floor(Math.random() * colors.length)];
    paper.style.width = 16 + Math.random() * 16 + "px";
    paper.style.height = 16 + Math.random() * 16 + "px";
    paper.style.opacity = 0.8 + Math.random() * 0.2;
    paper.style.borderRadius = Math.random() > 0.5 ? "50%" : "8px";
    paper.style.animationDuration = (2 + Math.random() * 2) + "s";
    document.body.appendChild(paper);
    setTimeout(() => paper.remove(), 4000);
  }
}

// Show quiz question and handle completion
function showQuizQuestion() {
  if (quizIndex >= quizQuestions.length) {
    quizContainer.innerHTML = `<div class="quiz-question">Quiz Complete! 🎉</div>`;
    quizScoreDiv.textContent = `Your Score: ${quizScore} / ${quizQuestions.length}`;
    applause.play();
    showPaperDrop();
    return;
  }
  const q = quizQuestions[quizIndex];
  quizContainer.innerHTML = `
    <div class="quiz-question">${q.question}</div>
    <div class="quiz-options">
      ${q.options.map(opt => `<button class="quiz-option">${opt}</button>`).join('')}
    </div>
  `;
  document.querySelectorAll('.quiz-option').forEach(btn => {
    btn.onclick = () => {
      if (btn.textContent === q.answer) {
        btn.classList.add('correct');
        quizScore++;
      } else {
        btn.classList.add('incorrect');
        document.querySelectorAll('.quiz-option').forEach(b => {
          if (b.textContent === q.answer) b.classList.add('correct');
        });
      }
      quizIndex++;
      setTimeout(showQuizQuestion, 900);
    };
  });
  quizScoreDiv.textContent = `Score: ${quizScore} / ${quizQuestions.length}`;
}

showQuizQuestion();