const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const output = document.getElementById("output");
const statusText = document.getElementById("statusText");
const recordDot = document.getElementById("recordDot");

// Browser Speech Recognition
window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

if (!window.SpeechRecognition) {
  alert("Speech recognition not supported. Use Google Chrome.");
}

const recognition = new SpeechRecognition();
recognition.lang = "en-IN";
recognition.continuous = true;
recognition.interimResults = true;

let finalTranscript = "";

// START
startBtn.addEventListener("click", () => {
  finalTranscript = "";
  output.value = "";
  recognition.start();

  recordDot.style.display = "inline-block";
  statusText.innerText = "Listening...";
  startBtn.disabled = true;
  stopBtn.disabled = false;
});

// STOP
stopBtn.addEventListener("click", () => {
  recognition.stop();

  recordDot.style.display = "none";
  statusText.innerText = "Stopped";
  startBtn.disabled = false;
  stopBtn.disabled = true;
});

// RESULT
recognition.onresult = (event) => {
  let interimTranscript = "";

  for (let i = event.resultIndex; i < event.results.length; i++) {
    const transcript = event.results[i][0].transcript;

    if (event.results[i].isFinal) {
      finalTranscript += transcript + " ";
    } else {
      interimTranscript += transcript;
    }
  }

  output.value = finalTranscript + interimTranscript;
};

// ERROR HANDLING
recognition.onerror = (event) => {
  statusText.innerText = "Error: " + event.error;
};

// AUTO-RESTART (keeps listening)
recognition.onend = () => {
  if (startBtn.disabled) {
    recognition.start();
  }
};
