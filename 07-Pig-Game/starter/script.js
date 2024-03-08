"use strict";

const btnNewGame = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const p0ScoreDis = document.getElementById("score--0");
const p1ScoreDis = document.getElementById("score--1");
const p0CurScoredis = document.getElementById("current--0");
const p1CurScoredis = document.getElementById("current--1");
const p0Active = document.querySelector(".player--0");
const p1Active = document.querySelector(".player--1");
const imgDice = document.querySelector(".dice");

const player0 = {
  name: "player1",
  score: 0,
  curScore: 0,
  active: true,
};

const player1 = {
  name: "player2",
  score: 0,
  curScore: 0,
  active: false,
};

const p0ActiveBackground = function () {
  p0Active.classList.add("player--active");
  p1Active.classList.remove("player--active");
};

const p1ActiveBackground = function () {
  p0Active.classList.remove("player--active");
  p1Active.classList.add("player--active");
};

const gameStart = function () {
  player0.score = 0;
  player1.score = 0;
  player0.curScore = 0;
  player1.curScore = 0;
  p0ScoreDis.textContent = "0";
  p1ScoreDis.textContent = "0";
  p0CurScoredis.textContent = "0";
  p1CurScoredis.textContent = "0";
  imgDice.classList.add("hidden");
  player0.active = true;
  player1.active = false;

  if (!p0Active.classList.contains("player--active")) {
    p0ActiveBackground();
  }
  if (p0Active.classList.contains("player--winner")) {
    p0Active.classList.remove("player--winner");
  }
  if (p1Active.classList.contains("player--winner")) {
    p1Active.classList.remove("player--winner");
  }
};
gameStart();

const switchPlayer = function () {
  if (player0.active === true) {
    player0.active = false;
    player1.active = true;
    p1ActiveBackground();
  } else {
    player0.active = true;
    player1.active = false;
    p0ActiveBackground();
  }
};

const newGame = function () {
  gameStart();
};

const rollDice = function () {
  const randomNumber = Math.trunc(Math.random() * 6) + 1;
  imgDice.src = `dice-${randomNumber}.png`;
  imgDice.classList.remove("hidden");

  if (randomNumber !== 6) {
    if (player0.active) {
      player0.curScore += randomNumber;
      p0CurScoredis.textContent = player0.curScore;
    } else if (player1.active) {
      player1.curScore += randomNumber;
      p1CurScoredis.textContent = player1.curScore;
    }
  } else if (randomNumber === 6) {
    player0.curScore = 0;
    player1.curScore = 0;
    p0CurScoredis.textContent = player0.curScore;
    p1CurScoredis.textContent = player1.curScore;
    switchPlayer();
  }
};

const hold = function () {
  if (player0.active) {
    player0.score += player0.curScore;
    p0CurScoredis.textContent = "0";
    player0.curScore = 0;
    p0ScoreDis.textContent = player0.score;

    if (player0.score >= 100) {
      p0Active.classList.add("player--winner");
    }
  } else {
    player1.score += player1.curScore;
    p1CurScoredis.textContent = "0";
    player0.curScore = 0;
    p1ScoreDis.textContent = player1.score;

    if (player1.score >= 100) {
      p1Active.classList.add("player--winner");
    }
  }
  switchPlayer();
  imgDice.classList.add("hidden");
};

btnNewGame.addEventListener("click", newGame);
btnRoll.addEventListener("click", rollDice);
btnHold.addEventListener("click", hold);
