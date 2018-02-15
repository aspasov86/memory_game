var time = document.getElementById("time");
var sec = 0;
var min = 0;
var hour = 0;

function timer() {
  sec++;
  if (sec > 59) {
    sec = 0;
    min++;
    if (min > 59) {
      min = 0;
      hour++;
    }
  }

  if (sec < 10 && min < 10 && hour < 10) {
    time.innerHTML = `0${hour}:0${min}:0${sec}`;
  } else if (sec > 9 && min < 10 && hour < 10) {
    time.innerHTML = `0${hour}:0${min}:${sec}`;
  } else if (sec < 10 && min > 9 && hour < 10) {
    time.innerHTML = `0${hour}:${min}:0${sec}`;
  } else if (sec < 10 && min < 10 && hour > 9) {
    time.innerHTML = `${hour}:0${min}:0${sec}`;
  } else if (sec > 9 && min > 9 && hour < 10) {
    time.innerHTML = `0${hour}:${min}:${sec}`;
  } else if (sec > 9 && min < 10 && hour > 9) {
    time.innerHTML = `${hour}:0${min}:${sec}`;
  } else if (sec < 10 && min > 9 && hour > 9) {
    time.innerHTML = `${hour}:${min}:0${sec}`;
  } else if (sec > 9 && min > 9 && hour > 10) {
    time.innerHTML = `${hour}:${min}:${sec}`;
  }
}
