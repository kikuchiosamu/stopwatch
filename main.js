const timer =document.getElementById("timer");
const start =document.getElementById("start");
const stop =document.getElementById("stop");
const reset =document.getElementById("reset");

let startTime; 
let elapsedTime = 0;
let timeId;
let timeToadd = 0;

function updateTimeText(){
  let m = Math.floor(elapsedTime / 60000);
  let s = Math.floor(elapsedTime % 60000 / 1000);
  let ms = elapsedTime % 1000;
  
  m = ("0" + m).slice(-2);
  s = ("0" + s).slice(-2);
  ms = ("0" +ms).slice(-3);
  
  timer.textContent = m + ":" + s + ":" + ms;
}

function countUp(){
  timeId = setTimeout(function(){
    elapsedTime = Date.now() - startTime + timeToadd;
    updateTimeText()
    countUp();
  },10);
}

start.addEventListener("click",function(){
  startTime = Date.now();
  countUp();
  start.disabled = true;
  stop.disabled = false;
  reset.disabled = true;
});

stop.addEventListener("click",function(){
  clearTimeout(timeId);
  timeToadd += Date.now() - startTime;
  start.disabled = false;
  stop.disabled = true;
  reset.disabled = false;
});

reset.addEventListener("click",function(){
    elapsedTime = 0;
    timeToadd = 0;
    updateTimeText();
    start.disabled = false;
    stop.disabled = true;
    reset.disabled = true;
});