function gameStartEvent() {
console.log("gameStartEvent");
try {Plaza.onGameStart();
}catch (e){}

}

function gameEndEvent(score) {
 try {console.log("gameEndEvent");
    Plaza.onGameEnd(score);
}catch (e)  {
  console.log(e);
}
}


function gamePauseEvent() {
  try {
    Plaza.onGamePause();

  }catch (e){
      console.log(e);
}
}
function gameUnPauseEvent() {
  try {
   Plaza.onGameResume();
  }catch (e){
      console.log(e);
}
}

function gameQuitEvent(score) {
try {
  console.log("Quit");
 Plaza.onGameQuit(score);
}catch (e){
  console.log(e);
}

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
try {
   console.log("ForcePause");
}catch (e){
  console.log(e);
}

}

