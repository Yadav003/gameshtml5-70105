function gameStartEvent()
{
	console.log("Game Started");
	Plaza.onGameStart();
}

function gameEndEvent(score)
{
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
	Plaza.onGameRestart();
}

function gameQuitEvent2(score)
{
	Plaza.gameQuitEvent2(score);
}


function startTimer()
{
	         //   document.getElementById("number").style.display = "";

                var seconds = document.getElementById("number").textContent;
                setTimeout(function () {
                    //   seconds.style.display = "";
                },1000);
                  var countdown = setInterval(function () {
                    seconds--;

                    document.getElementById("number").textContent = seconds;
                    if (seconds==0)
                    {
                        console.log(score);
                      gameQuitEvent(score);
                        clearInterval(countdown);
                        document.getElementById("number").style.visibility = "hidden";
                        document.getElementById("number").textContent = "3";
                    }

                    else if (seconds<=0)
                    {
                        clearInterval(countdown);
                    }

                    //document.getElementById("countdown").textContent = '0';

                }, 1000);
}


function setSingleSession()
{
isSingleSession = true;
}

function endScreen()
{
if (!isSingleSession) 
{
//=========Normal play
stoppausescreen = true;
// document.getElementById("quitscreen").style.display = "";
document.getElementById("restart").style.display = "";
document.getElementById("gamequit").style.display = "";
document.getElementById("number").style.display = "";
// document.getElementById("score").style.display = "";
// document.getElementById("score").textContent = score;
}
    else
    {
//=========singlesession play
stoppausescreen = true;
document.getElementById("number").style.display = "none";
// document.getElementById("setsinglesessionquitscreen").style.display = "";
document.getElementById("gamequit").style.display = "";
// document.getElementById("score").style.display = "";
// document.getElementById("score").textContent = score;

    }
}
function refresh()
{
    gameEndEvent(score);
    setTimeout(function(){
        window.location.reload();

        gameStartEvent();
    }, 500);
}

function foo() {
    backbuttonpress();

    console.log("back button pressed value: " + backbuttonpress());

}
function backbuttonpress()
{
    if(backbuttonpressed === 1)
    {
        return 1;
    }
    else
    {
        return 0;
    }

}
function getscore(gamescore)
{
score = gamescore;
}

var isSingleSession = false;
var pausescreenplay = false;

var score;
var backbuttonpressed = 0;