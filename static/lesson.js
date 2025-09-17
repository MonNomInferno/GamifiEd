let player;

// Load YouTube Player API
function onYouTubeIframeAPIReady() {
  player = new YT.Player('lessonVideo', {
    events: {
      'onStateChange': onPlayerStateChange
    }
  });
}

// When video ends, unlock quiz
function onPlayerStateChange(event) {
  if (event.data === YT.PlayerState.ENDED) {
    document.getElementById("quiz-section").classList.remove("hidden");
    document.getElementById("video-status").innerText = "✅ Video complete! Now take the quiz.";
  }
}

// Check MCQ answers
function checkAnswer(button, isCorrect) {
  if (isCorrect) {
    button.style.background = "#4caf50";
  } else {
    button.style.background = "#f44336";
  }
}

// Submit quiz
function submitQuiz() {
  document.getElementById("quiz-result").innerText =
    "🎉 Quiz submitted! Progress saved.";
}