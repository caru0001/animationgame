window.addEventListener("load", pageDisplayed);

//Create global variables
let point;
let lives;
let speed;

//Create global constants
const goodwig = document.querySelector("#goodwig_container");
const goodmakeup = document.querySelector("#goodmakeup_container");
const goodshoes = document.querySelector("#goodshoes_container");
const badwig = document.querySelector("#badwig_container");
const badmakeup = document.querySelector("#badmakeup_container");
const badshoes = document.querySelector("#badshoes_container");

function pageDisplayed() {
  console.log(pageDisplayed);

  //Hide level_complete & game_over screens
  document.querySelector("#level_complete").classList.add("hide");
  document.querySelector("#game_over").classList.add("hide");

  //Show start screen
  document.querySelector("#start").classList.remove("hide");
  document.querySelector("#start_button").addEventListener("click", startGame);
}

function startGame() {
  console.log("startGame");

  //Play music
  document.querySelector("#music").play();

  //Hide other screens
  document.querySelector("#level_complete").classList.add("hide");
  document.querySelector("#game_over").classList.add("hide");
  document.querySelector("#start").classList.add("hide");

  //Reset points
  point = 0;
  document.querySelector("#points").textContent = point;

  //Reset lives to 3
  lives = 3;

  speed = 1;

  //Start timer-animation
  document.querySelector("#time_sprite").classList.add("timer");
  //Stop game when animation end
  document.querySelector("#time_container").addEventListener("animationend", stopGame);

  //Start falling animation (goodwig)
  goodwig.classList.add("pos" + ranNumber(1, 6), "delay" + ranNumber(1, 4), "speed" + speed, "falling");
  //Restart animation after 1 iteration (good)
  goodwig.addEventListener("animationiteration", restartGood);
  //Listen for click (good)
  goodwig.addEventListener("mousedown", goodClick);

  //Start falling animation (goodmakeup)
  goodmakeup.classList.add("pos" + ranNumber(1, 6), "delay" + ranNumber(1, 4), "speed" + speed, "falling");
  //Restart animation after 1 iteration (goodmakeup)
  goodmakeup.addEventListener("animationiteration", restartGood);
  //Listen for click (good)
  goodmakeup.addEventListener("mousedown", goodClick);

  //Start falling animation (goodshoes)
  goodshoes.classList.add("pos" + ranNumber(1, 6), "delay" + ranNumber(1, 4), "speed" + speed, "falling");
  //Restart animation after 1 iteration (goodshoes)
  goodshoes.addEventListener("animationiteration", restartGood);
  //Listen for click (good)
  goodshoes.addEventListener("mousedown", goodClick);

  //Start falling animation (bad)
  badwig.classList.add("pos" + ranNumber(1, 6), "delay" + ranNumber(1, 4), "speed" + speed, "falling");
  //Restart animation after 1 iteration (bad)
  badwig.addEventListener("animationiteration", restartBad);
  //Listen for click (bad)
  badwig.addEventListener("mousedown", badClick);

  //Start falling animation (bad)
  badmakeup.classList.add("pos" + ranNumber(1, 6), "delay" + ranNumber(1, 4), "speed" + speed, "falling");
  //Restart animation after 1 iteration (bad)
  badmakeup.addEventListener("animationiteration", restartBad);
  //Listen for click (bad)
  badmakeup.addEventListener("mousedown", badClick);

  //Start falling animation (badshoes)
  badshoes.classList.add("pos" + ranNumber(1, 6), "delay" + ranNumber(1, 4), "speed" + speed, "falling");
  //Restart animation after 1 iteration (bad)
  badshoes.addEventListener("animationiteration", restartBad);
  //Listen for click (bad)
  badshoes.addEventListener("mousedown", badClick);
}

function goodClick() {
  console.log("goodClick");

  document.querySelector("#good_sound").play();

  console.log(this);

  //Make it so that you can only click once on the same one
  this.removeEventListener("mousedown", goodClick);

  //Freeze animation
  this.classList.add("freeze");

  //Add point
  point++;
  document.querySelector("#points").textContent = point;
  if (point >= 6) {
    speed = 3;
  } else if (point >= 4) {
    speed = 2;
  }
  console.log("Speed = " + speed);

  //Start "disappear" animation
  this.firstElementChild.classList.add("good_animation");

  //Listen to animationend
  this.addEventListener("animationend", restartGood);
}

function restartGood() {
  console.log("restartGood");
  //Clean up container and sprite
  this.classList = "";
  this.firstElementChild.classList = "";

  //Restart animation
  this.offsetLeft;

  //Add random position to container and fall animation on element
  this.classList.add("pos" + ranNumber(1, 6), "speed" + speed, "falling");

  //Listen for click on element
  this.addEventListener("mousedown", goodClick);
}

function badClick() {
  console.log("badClick");

  document.querySelector("#bad_sound").play();

  console.log(this);

  //Make it so that you can only click once on the same one
  this.removeEventListener("mousedown", badClick);

  //Freeze animation
  this.classList.add("freeze");

  //Remove point
  point--;
  document.querySelector("#points").textContent = point;

  //Start "disappear" animation
  this.firstElementChild.classList.add("bad_animation");

  //Listen to animationend
  this.addEventListener("animationend", restartBad);

  //Remove life
  document.querySelector("#life" + lives).classList.add("gray");
  lives--;
  if (lives == 0) {
    stopGame();
  }
}

function restartBad() {
  console.log("restartBad");

  //Clean up container and sprite
  this.classList = "";
  this.firstElementChild.classList = "";

  //Restart animation
  this.offsetLeft;

  //Add random position to container and fall animation on element
  this.classList.add("pos" + ranNumber(1, 6), "speed" + speed, "falling");

  //Listen for click on element
  this.addEventListener("mousedown", badClick);
}

function stopGame() {
  console.log("stopGame");

  // Stop the music
  document.querySelector("#music").pause();

  //Stop timer
  document.querySelector("#time_sprite").classList.remove("timer");
  document.querySelector("#time_container").removeEventListener("animationend", stopGame);

  //Remove all classes and eventlisteners on goodwig
  goodwig.classList = "";
  goodwig.firstElementChild.classList = "";
  goodwig.removeEventListener("mousedown", goodClick);
  goodwig.removeEventListener("animationiteration", restartGood);
  goodwig.removeEventListener("animationend", restartGood);

  //Remove all classes and eventlisteners on goodmakeup
  goodmakeup.classList = "";
  goodmakeup.firstElementChild.classList = "";
  goodmakeup.removeEventListener("mousedown", goodClick);
  goodmakeup.removeEventListener("animationiteration", restartGood);
  goodmakeup.removeEventListener("animationend", restartGood);

  //Remove all classes and eventlisteners on badwig
  badwig.classList = "";
  badwig.firstElementChild.classList = "";
  badwig.removeEventListener("mousedown", badClick);
  badwig.removeEventListener("animationiteration", restartBad);
  badwig.removeEventListener("animationend", restartBad);

  //Remove all classes and eventlisteners on badmakeup
  badmakeup.classList = "";
  badmakeup.firstElementChild.classList = "";
  badmakeup.removeEventListener("mousedown", badClick);
  badmakeup.removeEventListener("animationiteration", restartBad);
  badmakeup.removeEventListener("animationend", restartBad);

  if (lives == 0) {
    gameOver();
  } else if (point >= 10) {
    levelComplete();
  } else {
    gameOver();
  }
}

function levelComplete() {
  console.log("Condragulations");
  document.querySelector("#level_complete").classList.remove("hide");
  document.querySelector("#play_again_button2").addEventListener("click", pageDisplayed);
  document.querySelector("#level_complete_points").textContent = "POINTS = " + point;
}

function gameOver() {
  console.log("I'm sorry, my dear");
  document.querySelector("#game_over").classList.remove("hide");
  document.querySelector("#play_again_button1").addEventListener("click", pageDisplayed);
  document.querySelector("#game_over_points").textContent = "POINTS = " + point;
}

//Create function for random numbers
function ranNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
