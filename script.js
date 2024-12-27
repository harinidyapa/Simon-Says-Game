let gameSeq=[];
let userSeq=[];
let started=false;
let h2=document.querySelector("h2");
let btns=["yellow","red","purple","green"];
let h1=document.querySelector("#gameover");
let level=0;
let high=0;
let h3=document.querySelector("#max");
let btnSound=new Audio("sound-1-167181.mp3");
let gameOver=new Audio("game-over-arcade-6435.mp3");
document.addEventListener("keypress",function()
{
    if(started==false)
    {
        started=true;
        levelUp();
        if (h1 && !document.body.contains(h1)) {
            document.body.appendChild(h1); // Re-add the h1 element if it was removed
        }
        if (h1) {
            h1.remove(); // Remove Game Over message if present
        }
    }
});
function gameFlash(btn)
{
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },200);
}
function userFlash(btn)
{
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    },200);
}
function levelUp()
{
    userSeq=[];
    level++;
    h2.innerText=`Level ${level}`;
    let randIdx=Math.floor(Math.random()*3);
    let randColor=btns[randIdx];
    let randBtn=document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    gameFlash(randBtn);
}
function checkAns(idx)
{
    if(userSeq[idx] === gameSeq[idx])
    {
        if(userSeq.length == gameSeq.length)
        {
            setTimeout(levelUp,1000);
        }
    }
    else{
        h2.innerHTML=`Your score : <b>${level-1} </b>. Press any key to start again`;
        if (h1) {
            h1.innerText = "Game Over!"; // Display Game Over message
            document.body.appendChild(h1); // Make sure it's displayed
        }
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor="white";
        },650);
        high=Math.max(high,level-1);
        h3.innerText=`Your maximum score : ${high}`;
        reset();
        gameOver.play();
    }
}
function btnPress()
{
    let btn=this;
    userFlash(btn);
    let userColor=btn.getAttribute("id");
    userSeq.push(userColor);
    checkAns(userSeq.length-1);
    btnSound.play();
}
let allBtns=document.querySelectorAll(".btn");
for(btn of allBtns)
{
    btn.addEventListener("click",btnPress);
}
function reset()
{
    started=false;
    gameSeq=[];
    userSeq=[];
    level=0;
}