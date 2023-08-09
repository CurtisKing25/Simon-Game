//Array to store the the randomly generated pattern
let randomPattern = [];
//Array to store the user's input
let userPattern = [];
//Round counter for rounds successfully completed
let round = 0;
//Time duration between flashes 
let flashTime = 1500;
//Variable that stores if the 5 second timer is counting down
let timing = false;
//defines a variable for later use in the timer function
let tooSlow;
//variable to control if the buttons can be pressed
let canPress = false;

//Reads in the lights so they can be made pressable with event listeners
const greenClick = document.querySelector('#green');
const redClick = document.querySelector('#red');
const blueClick = document.querySelector('#blue');
const yellowClick = document.querySelector('#yellow');

//Starts the javascript using the START button
function start()
{
    console.log("Start");
    //Makes button green
    document.getElementById("startCircle").style.background = 'rgb(0,255,0)';
    //Starts the game after 3 seconds
    setTimeout(() => startGame(generateRandom),3000);
    //back to round 0 for new sequence
    round=0;
}

//Starts the game loop
function startGame()
{
    console.log("StartGame");
    generateRandom(flashPattern);
}

//Generates a random number between 1 and 4
function generateRandom(flashPattern)
{
    console.log("generateRandom");
    //Generates number
    let x = Math.floor((Math.random() * 4) + 1);
    //Adds it to the randomPattern array
    randomPattern.push(x);
    flashPattern(x)
}

//asynchronous function to flash the pattern
async function flashPattern()
{
    //If timing, meaning player successfully completed the round and their last input
    //triggered a timer
    if(timing)
    {
        timing = false;
        //clear the timer so colours can flash
        clearTimeout(tooSlow);
        console.log("stop timer");
    }
    console.log("flash Pattern of length = "+randomPattern.length);
    //loop to flash lights
    for(let i =0; i<randomPattern.length;i++)
    {
        //decides when the interval between flashes speeds up
        if(i>=12)flashTime=250;
        else if(i>=8)flashTime=500;
        else if(i>=4)flashTime=750;
        else flashTime = 1000;
        //Chooses which colour turns on
        colourOn(randomPattern[i]);
        //awaits a promise, pausing the loop until setTimeout completes
        //unless it's on the last flash
        if(i!==randomPattern.length-1)await new Promise(r => setTimeout(r, flashTime));
    }
    timing = true;
    //function waits 5 seconds to call timeout
    tooSlow = setTimeout(() => timeOut(),5000);
    console.log("Start timer");
    canPress = true;
}

//Chooses light based on input
function colourOn(i)
{
    console.log("colourOn ");
    switch(i)
    {
        case 1:
            greenOn(i);
            break;
        case 2:
            redOn(i);
            break;
        case 3:
            blueOn(i);
            break;
        case 4:
            yellowOn(i);
            break;
    }
}
//The On() functions flash the light on and the off() function ends the flash
function greenOn(i)
{
    console.log("greenOn");
    //flashes light
    document.getElementById("green").style.background = 'rgb(0,255,0)';
    //decides how long the flash should last
    if(i>=12)setTimeout(() => greenOff(),100);
    else if(i>=8)setTimeout(() => greenOff(),150);
    else if(i>=4)setTimeout(() => greenOff(),200);
    else setTimeout(() => greenOff(),250);
}
function greenOff()
{
    console.log("greenOff");
    //Ends flash
    document.getElementById("green").style.background = 'rgb(0,153,0)';
}

function redOn(i)
{
    console.log("redOn");
    document.getElementById("red").style.background = 'rgb(255,0,0)';
    if(i>=12)setTimeout(() => redOff(),100);
    else if(i>=8)setTimeout(() => redOff(),150);
    else if(i>=4)setTimeout(() => redOff(),200);
    else setTimeout(() => redOff(),250);
}
function redOff()
{
    console.log("redOff");
    document.getElementById("red").style.background = 'rgb(153,0,0)';
}

function blueOn(i)
{
    console.log("blueOn");
    document.getElementById("blue").style.background = 'rgb(0,0,255)';
    if(i>=12)setTimeout(() => blueOff(),100);
    else if(i>=8)setTimeout(() => blueOff(),150);
    else if(i>=4)setTimeout(() => blueOff(),200);
    else setTimeout(() => blueOff(),250);
}
function blueOff()
{
    console.log("blueOff");
    document.getElementById("blue").style.background = 'rgb(0,0,153)';
}

function yellowOn(i)
{
    console.log("yellowOn");
    document.getElementById("yellow").style.background = 'rgb(255,255,0)';
    if(i>=12)setTimeout(() => yellowOff(),100);
    else if(i>=8)setTimeout(() => yellowOff(),150);
    else if(i>=4)setTimeout(() => yellowOff(),200);
    else setTimeout(() => yellowOff(),250);
}
function yellowOff()
{
    console.log("yellowOff");
    document.getElementById("yellow").style.background = 'rgb(153,153,0)';
}

//Adds event listeners for each button
greenClick.addEventListener("click",(event) =>
{
    //if you're allowed to press the button
    if(canPress)
    {
        //Adds the number associated with the colour to the userPattern array
        userPattern.push(1);
        //light flashes
        greenOn();
        //This triggers if a new input was received in time
        if(timing)
        {
            //cancels timeOut
            clearTimeout(tooSlow);
            console.log("More time!");
            //resets 5 second input timer
            tooSlow = setTimeout(() => timeOut(),5000);
        }
        //Waits a second and then checks to see if the user is right
        setTimeout(() => check(),1000);
    }
}
)

redClick.addEventListener("click",(event) =>
{
    if(canPress)
    {
        userPattern.push(2);
        redOn();
        if(timing)
        {
            clearTimeout(tooSlow);
            console.log("More time!");
            tooSlow = setTimeout(() => timeOut(),5000);
        }
        setTimeout(() => check(),1000);
    }
}
)

blueClick.addEventListener("click",(event) =>
{
    if(canPress)
    {
        userPattern.push(3);
        blueOn();
        if(timing)
        {
            clearTimeout(tooSlow);
            console.log("More time!");
            tooSlow = setTimeout(() => timeOut(),5000);
        }
        setTimeout(() => check(),1000);
    }
}
)

yellowClick.addEventListener("click",(event) =>
{
    if(canPress)
    {
        userPattern.push(4);
        yellowOn();
        if(timing)
        {
            clearTimeout(tooSlow);
            console.log("More time!");
            tooSlow = setTimeout(() => timeOut(),5000);
        }
        setTimeout(() => check(),1000);
    }
}
)

function check()
{
    console.log("check");
    for(let i=0; i < userPattern.length; i++)
    {
        console.log("i = "+i);
        console.log(randomPattern[i]+" = "+userPattern[i]);
        //if the last digit is correct (meaning all prior are correct)
        if(randomPattern[i]===userPattern[i] && randomPattern.length-1===i)
        {
            console.log(randomPattern.length-1+" = "+i+ " Finished");
            //no longer allowed to press the buttons
            canPress = false;
            //made it to next round, increments counter
            round++;
            //pops elements from the array until it's empty
            while (userPattern.length>0)
            {
                userPattern.pop();
            }
            //waits a second and generates a new random number to make the sequence longer
            setTimeout(() => generateRandom(flashPattern),1000);
        }
        //if current digit is correct
        else if(randomPattern[i]===userPattern[i])
        {
            console.log("correct");
        }
        //Otherwise a mistake was made. call endGame()
        else
        {
            endGame();
        }
    }
}

//asynchronous function to flash all of the lights on and off
async function allFlash()
{
    //loops 5 times
    for(let i=0;i<5;i++)
    {
        //all lights flash on
        document.getElementById("green").style.background = 'rgb(0,255,0)';
        document.getElementById("red").style.background = 'rgb(255,0,0)';
        document.getElementById("blue").style.background = 'rgb(0,0,255)';
        document.getElementById("yellow").style.background = 'rgb(255,255,0)';
        //waits half a second
        await new Promise(r => setTimeout(r, 250));
        //all lights flash off
        document.getElementById("green").style.background = 'rgb(0,153,0)';
        document.getElementById("red").style.background = 'rgb(153,0,0)';
        document.getElementById("blue").style.background = 'rgb(0,0,153)';
        document.getElementById("yellow").style.background = 'rgb(153,153,0)';
        //waits half a second
        await new Promise(r => setTimeout(r, 500));
    }
}

//ends game and resets it
function endGame()
{
    canPress = false;
    //if timing meaning a mistake was made and a timer is active
    //other wise the timeOut() function would be called
    if(timing)
    {
        clearTimeout(tooSlow);
        console.log("wrong input");
    }
    //all lights flash
    allFlash();
    console.log("endGame");
    //empties arrays
    while (randomPattern.length>0)
    {
        randomPattern.pop();
    }
    while (userPattern.length>0)
    {
        userPattern.pop();
    }

    //sets start circle back to red to indicate that the game is over
    setTimeout(() => document.getElementById("startCircle").style.background = 'rgb(255,0,0)',4000);
    //if rounds made it past the highscore set it as the new highscore
    if(round>document.getElementById("highScore").innerHTML)
    {
        //Pads the score with a 0 on the left
        //until the score reaches double digits
        document.getElementById("highScore").innerHTML = String(round).padStart(2, '0');
    }
    //last score updates on screen
    document.getElementById("lastScore").innerHTML = String(round).padStart(2, '0');
    //time between flashes goes back to 1 second
    flashTime = 1000;
}

//Called when the player doesn't input a signal for 5 seconds
function timeOut()
{
    console.log("Out of time");
    //sets timing to false as we no longer need to clear the timeout
    timing = false;
    //End the game for going too long without input
    endGame();
}