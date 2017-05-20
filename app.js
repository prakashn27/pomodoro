"using strict";
// global variables
var pomodoroMin = 5;
var pomodoroSec = 0;
var breakMin = 2;
var breakSec = 0;


// Logic implementation
var currentTimerMin;
var currentTimerSec;
var isPomodoro = true;
var x;
init();

function init() {
  setPomodoro();
  updatePomodoroDuration();
  updateBreakDuration();
}
function changePomodoro(dur) {
  if(pomodoroMin === 0 && dur < 0) return;
  if(pomodoroMin === 59 && dur > 0) return;
  pomodoroMin = pomodoroMin + dur;
  updatePomodoroDuration();
}
function changeBreak(dur) {
  if(breakMin === 0 && dur < 0) return;
  if(breakMin === 59 && dur > 0) return;
  breakMin = breakMin + dur;
  updateBreakDuration();
}
function updatePomodoroDuration() {
  document.getElementById("pomodoroLength").innerHTML = pomodoroMin + ":00";
}
function updateBreakDuration() {
  document.getElementById("breakLength").innerHTML = breakMin + ":00";
}
function enableEditing() {
  document.getElementById("plus").disabled = false;
  document.getElementById("minus").disabled = false;
}
function disableEditing() {
  document.getElementById("plus").disabled = true;
  document.getElementById("minus").disabled = true;
}
function updateDisplay() {
  document.getElementById("pomodoro").innerHTML = currentTimerMin + ":" + ((currentTimerSec < 10)?"0"+currentTimerSec:currentTimerSec);
}
function stop() {
  enableEditing();
  clearInterval(x);
  document.getElementById("start").disabled = false;
  document.getElementById("stop").disabled = true;
}
function start() {
  if(isPomodoro) setPomodoro();
  else setShortBreak();
  disableEditing();
  document.getElementById("start").disabled = true;
  document.getElementById("stop").disabled = false;
  x = setInterval(function() {
    // pomodoro implementation
    if(currentTimerMin === 0 && currentTimerSec === 0) {
      if(isPomodoro) {
        alert("Pomodoro reached...");
        setShortBreak();
      }
      else {
        alert("break is OVER. Time to get things done...");
        setPomodoro();
      }
      stop();
      reset();
    } else if(currentTimerSec > 0) {
      currentTimerSec = currentTimerSec - 1;
    } else {
      currentTimerMin--;
      currentTimerSec = 59;
    }
    updateDisplay();
  }, 1000);
}
function setPomodoro() {
  isPomodoro = true;
  document.getElementById("main-layout").style.background = "#92e03e";
  currentTimerMin = pomodoroMin;
  currentTimerSec = pomodoroSec;
  updateDisplay();
}
function setShortBreak() {
  isPomodoro = false;
  document.getElementById("main-layout").style.background = "#3edae0";
  currentTimerMin = breakMin;
  currentTimerSec = breakSec;
  updateDisplay();
}