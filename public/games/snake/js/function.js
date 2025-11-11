function gameStartEvent() {
console.log("Game Started");
try {Plaza.onGameStart();
}catch (e)
}

function gameEndEvent(score) {
 try {console.log("gameEndEvent");
    Plaza.onGameEnd(score);
}catch (e) {
  console.log(e);
}
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
try {
  console.log("gameRestartEvent");
  Plaza.onGameRestart();
}catch (e){
  console.log(e);
}

}

function ForcePause() {
  c2_callFunction("pause");
  console.log("function fired..!");
}
