function gameStartEvent()
{
	console.log("Game Started");
	Plaza.onGameStart();
}

function gameEndEvent(score)
{

	c2_callFunction('SetSingleSession');

	Plaza.onGameEnd(score);
}

function gamePauseEvent()
{
	Plaza.onGamePause();
}

function gameUnPauseEvent()
{
	Plaza.onGameResume();
}

function gameQuitEvent(score)
{
	Plaza.onGameQuit(score);
}

function gameRestartEvent()
{
	c2_callFunction('SetSingleSession');
	
	Plaza.onGameRestart();
}

function gameQuitEvent2(score)
{
	Plaza.gameQuitEvent2(score);
}