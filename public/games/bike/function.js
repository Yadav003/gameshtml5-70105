function gameStartEvent() {
  console.log("Game Started");
  Plaza.onGameStart();
}

function gameEndEvent(score) {
  Plaza.onGameEnd(score);
}

function ongameEnd(score) {
  c2_callFunction("gameover");
}

function gamePauseEvent() {
  Plaza.onGamePause();
}

function gameUnPauseEvent() {
  Plaza.onGameResume();
}

function gameQuitEvent(score) {
  console.log("Quit");
  Plaza.onGameQuit(score);
}

function gameRestartEvent() {
  Plaza.onGameRestart();
}

function ForcePause() {
  c2_callFunction("pause");
  console.log("function fired..!");
}
