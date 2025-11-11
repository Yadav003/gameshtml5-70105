
function gameStartEvent()
{
  console.log("Game Started");
   try {
    Plaza.onGameStart();
  } catch (e) {
    console.log(e);
  }
}

function gameEndEvent(score)
{
   try {
     Plaza.onGameEnd(score);
  } catch (e) {
   console.log(e);
  }
 
}

function gamePauseEvent()
{
  try {
     Plaza.onGamePause();
  } catch (e) {
    console.log(e);
  }
 
}

function gameUnPauseEvent()
{
  try {
    Plaza.onGameResume();
  } catch (e) {
    console.log(e);
  }
}

function gameQuitEvent(score)
{
   try {
    Plaza.onGameQuit(score);
  } catch (e) {
    console.log(e);
  }
}

function gameRestartEvent()
{
   try {
   Plaza.onGameRestart();
  } catch (e) {
    console.log(e);
  }
}
