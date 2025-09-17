let progress = JSON.parse(localStorage.getItem("progress")) || {1:true,2:false,3:false,4:false};
let bee = document.getElementById("bee");


// --- Dashboard UI ---
function updateUI() {
  let completed = Object.values(progress).filter(v => v).length;
  let total = Object.keys(progress).length;
  let percent = Math.round((completed/total)*100);

  document.getElementById("topics").innerText = `${completed}/${total} Topics`;
  document.getElementById("percent").innerText = percent + "% Complete";
  document.getElementById("progress-fill").style.width = percent + "%";

  document.getElementById("level").innerText = "Level " + completed;
  document.getElementById("achievement").innerText =
    completed > 1 ? `Completed ${completed-1} topics!` : "Start your first lesson!";
  document.getElementById("next-goal").innerText =
    completed < total ? `Complete ${total-completed} more to finish!` : "All done 🎉";

  for (let i=1; i<=total; i++) {
    let flower = document.getElementById(`lesson-${i}`);
    if (flower) flower.src = progress[i] ? "flower_yellow.png" : "flower_gray.png";
  }
}
function openLesson(id) {
  if (!progress[id]) return;
  alert(`Opening Lesson ${id}...`);
  localStorage.setItem("currentLesson", id);
  window.location.href = "lesson.html";

  progress[id] = true;
  if (progress[id+1] !== undefined) progress[id+1] = true;
  localStorage.setItem("progress", JSON.stringify(progress));
  updateUI();
  let flower = document.getElementById(`lesson-${id}`);
  bee.style.top = flower.style.top;
  bee.style.left = flower.style.left;
}
updateUI();

const chatbotIcon = document.getElementById('chatbot-icon');
const chatbotWindow = document.getElementById('chatbot-window');
const chatbotClose = document.getElementById('chatbot-close');
const chatbotSend = document.getElementById('chatbot-send');
const chatbotInput = document.getElementById('chatbot-input');
const chatbotMessages = document.getElementById('chatbot-messages');

// Toggle chatbot window
chatbotIcon.addEventListener('click', () => {
  chatbotWindow.style.display = chatbotWindow.style.display === 'flex' ? 'none' : 'flex';
});

// Close button
chatbotClose.addEventListener('click', () => {
  chatbotWindow.style.display = 'none';
});

// Send message
chatbotSend.addEventListener('click', sendMessage);
chatbotInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') sendMessage();
});

function sendMessage() {
  const message = chatbotInput.value.trim();
  if (!message) return;

  // User message
  appendMessage('You', message);

  // Clear input
  chatbotInput.value = '';

  // Simple bot response
  setTimeout(() => {
    const botResponse = getBotResponse(message);
    appendMessage('BeeBot', botResponse);
  }, 500);
}

function appendMessage(sender, message) {
  const msgDiv = document.createElement('div');
  msgDiv.classList.add('chat-message');
  msgDiv.innerHTML = `<strong>${sender}:</strong> ${message}`;
  chatbotMessages.appendChild(msgDiv);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// Demo bot logic
function getBotResponse(input) {
  input = input.toLowerCase();
  if (input.includes('hello') || input.includes('hi')) return 'Hello! I am BeeBot 🐝. How can I help you?';
  if (input.includes('how are you')) return 'I am buzzing with energy! 😄';
  if (input.includes('2+2')) return 'Buzz.... It is 4';
  
  return "I'm not sure about that. Try saying 'Hi'!";
}