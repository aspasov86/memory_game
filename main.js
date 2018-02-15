var icons = [
  "<i class='fa fa-file-image-o' aria-hidden='true'></i>",
  '<i class="fa fa-snowflake-o" aria-hidden="true"></i>',
  '<i class="fa fa-microchip" aria-hidden="true"></i>',
  '<i class="fa fa-thermometer-quarter" aria-hidden="true"></i>',
  '<i class="fa fa-address-card" aria-hidden="true"></i>',
  '<i class="fa fa-quora" aria-hidden="true"></i>',
  '<i class="fa fa-shower" aria-hidden="true"></i>',
  '<i class="fa fa-bell" aria-hidden="true"></i>',
  '<i class="fa fa-beer" aria-hidden="true"></i>',
  '<i class="fa fa-battery-full" aria-hidden="true"></i>',
  '<i class="fa fa-anchor" aria-hidden="true"></i>',
  '<i class="fa fa-car" aria-hidden="true"></i>',
  '<i class="fa fa-cc" aria-hidden="true"></i>',
  '<i class="fa fa-commenting-o" aria-hidden="true"></i>',
  '<i class="fa fa-database" aria-hidden="true"></i>',
  '<i class="fa fa-diamond" aria-hidden="true"></i>',
  '<i class="fa fa-female" aria-hidden="true"></i>',
  '<i class="fa fa-eyedropper" aria-hidden="true"></i>',
  "<i class='fa fa-file-image-o' aria-hidden='true'></i>",
  '<i class="fa fa-snowflake-o" aria-hidden="true"></i>',
  '<i class="fa fa-microchip" aria-hidden="true"></i>',
  '<i class="fa fa-thermometer-quarter" aria-hidden="true"></i>',
  '<i class="fa fa-address-card" aria-hidden="true"></i>',
  '<i class="fa fa-quora" aria-hidden="true"></i>',
  '<i class="fa fa-shower" aria-hidden="true"></i>',
  '<i class="fa fa-bell" aria-hidden="true"></i>',
  '<i class="fa fa-beer" aria-hidden="true"></i>',
  '<i class="fa fa-battery-full" aria-hidden="true"></i>',
  '<i class="fa fa-anchor" aria-hidden="true"></i>',
  '<i class="fa fa-car" aria-hidden="true"></i>',
  '<i class="fa fa-cc" aria-hidden="true"></i>',
  '<i class="fa fa-commenting-o" aria-hidden="true"></i>',
  '<i class="fa fa-database" aria-hidden="true"></i>',
  '<i class="fa fa-diamond" aria-hidden="true"></i>',
  '<i class="fa fa-female" aria-hidden="true"></i>',
  '<i class="fa fa-eyedropper" aria-hidden="true"></i>'
];

var container = document.getElementsByClassName("container")[0];
var boxes = document.getElementsByClassName("box");
var startBtn = document.getElementById("startBtn");
var startDiv = document.getElementById("start");
var enterName = document.getElementById("enterName");
var userName = document.querySelector("[name='name']");
var nameDiv = document.getElementById("nameDiv");
var change = document.getElementById("change");
var scoreboard = document.getElementById("scoreboard");
var clicks = 0;
var gameOver = 0;
var twoBox = [];
var ids = [];
var resolvedBoxes = [];
var topResults = [];


defaultPage()

startBtn.addEventListener("click", startGame);

function changeUser() {
  nameDiv.style.display = "none";
  enterName.style.display = "block";
}

function defaultPage() {
  if (localStorage.topResults) {
    let text = "";
    topResults = JSON.parse(localStorage.topResults);
    for (let i = 0; i < topResults.length; i++) {
      topResults[i].value = value(topResults[i].time);
    }
    topResults.sort(function (a,b) {
      return a.value - b.value;
    })
    for (let i = 0; i < topResults.length; i++) {
      if (i < 7) {
        text += `
        <div class="col-sm-2">
          <div class="scores">
            <p>${topResults[i].name}</p>
            <p>${topResults[i].time}</p>
          </div>
        </div>
        `;
      }
    }
    scoreboard.innerHTML = text;
  }
  if (localStorage.memName) {
    nameDiv.style.display = "block";
    nameDiv.children[0].innerText = localStorage.memName;
    enterName.style.display = "none";

    change.addEventListener("click", changeUser);
  }
}


function startGame() {
  startDiv.style.display = "none";
  if (localStorage.memName) {
    if (userName.value != "") {
      localStorage.memName = userName.value;
    } else {
      localStorage.memName = nameDiv.children[0].innerText;
    }
  } else {
    localStorage.setItem("memName", userName.value);
  }
  createTable();
  addClickEvents(resolvedBoxes);
  setInterval(timer, 1000);
}



function createTable() {
  var text ="";
  for (let i = 0; i < 36; i++) {
    var rand = Math.floor(Math.random()*icons.length)
    text += "<div class='box' data-id=" + i + "><div class='back'>" + icons[rand] + "</div><div class='front'></div></div>";
    icons.splice(rand, 1);
  }
  container.innerHTML = text;
}

function flip() {
  twoBox.push(this);
  var back = this.children[0];
  var front = this.children[1];
  back.style.transform = "perspective(900px) rotateY(0deg)";
  front.style.transform = "perspective(900px) rotateY(180deg)";
  clicks++;
  var id = parseInt(this.getAttribute("data-id"));
  ids.push(id);
  this.removeEventListener("click", flip);
  if (clicks == 2) {
    removeEvents();
    checkFlip(ids);
  }
}

function checkFlip(ids) {
  var front1 = twoBox[0].children[1];
  var back1 = twoBox[0].children[0];
  var front2 = twoBox[1].children[1];
  var back2 = twoBox[1].children[0];
  if (back1.innerHTML == back2.innerHTML) {
    gameOver++;
    if (gameOver == 18) {
       // new level maybe ???
       topResults.push({
         name: localStorage.memName,
         time: time.innerText
       })
       localStorage.topResults = JSON.stringify(topResults);
       location.reload();
    }
    resolvedBoxes.push(ids[0]);
    resolvedBoxes.push(ids[1]);
    resetArrs();
    addClickEvents(resolvedBoxes);
  } else {
    setTimeout(function () {
      front1.style.transform = "perspective(900px) rotateY(0)";
      back1.style.transform = "perspective(900px) rotateY(180deg)";
      front2.style.transform = "perspective(900px) rotateY(0)";
      back2.style.transform = "perspective(900px) rotateY(180deg)";
      resetArrs()
      addClickEvents(resolvedBoxes);
    }, 700)
  }
}


function removeEvents() {
  for (var i = 0; i < boxes.length; i++) {
    boxes[i].removeEventListener("click", flip)
  }
}

//add or return event to those which are not resolved
function addClickEvents(arr) {
  var noBoxes = [];
  var reducedBoxes = [];
  //filling in the array noBoxes with the order numbers of boxes (length should be 36)
  for (let i = 0; i < boxes.length; i++) {
    noBoxes.push(i);
  }
  //push to a reducedBoxes the order numbers for which we shouldn't returnEvent
  noBoxes.forEach(function (e) {
    if (arr.indexOf(e) == -1) {
      reducedBoxes.push(e);
    }
  })
  //returnEvent for those boxes which we didn't got!
  for (var i = 0; i < reducedBoxes.length; i++) {
    boxes[reducedBoxes[i]].addEventListener("click", flip);
  }
}

function resetArrs() {
  clicks = 0;
  twoBox.length = 0;
  ids.length = 0;
}

function value(string) {
  var replaceString = string.replace(/:/g, "");
  var x = parseInt(replaceString);
  return x;
}
