var _isDebug = false;

function gameStartEvent()
{
	if(_isDebug)
		return;

	Plaza.onGameStart();
}

function gameEndEvent(score)
{
	if(_isDebug)
		return;

	Plaza.onGameEnd(score);
}

function gamePauseEvent()
{
	if(_isDebug)
		return;

	Plaza.onGamePause();
}

function gameUnPauseEvent()
{
	if(_isDebug)
		return;

	Plaza.onGameResume();
}

function gameQuitEvent(score)
{
	if(_isDebug)
		return;

	Plaza.onGameQuit(score);
}

function gameRestartEvent()
{
	if(_isDebug)
		return;

	Plaza.onGameRestart();
}

function gameQuitEvent2(score)
{
	if(_isDebug)
		return;

	Plaza.gameQuitEvent2(score);
}