const boxes = document.querySelectorAll(".box");
const gameInfo= document.querySelector(".gameInfo");
const newGameBtn = document.querySelector(".btn");


let currentPlayer;
let gameGrid;

const winningPosition = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
 

// let's create a function to initialise the game 
function initGame(){
    currentPlayer = "X";
    gameGrid = ["", "", "", "", "", "", "", "", "",];
    // ui pr empty bhi krna padega
    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        box.classList = `box box${index+1}`;
        
    });
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;

}
initGame();

function swapTurn(){
    if(currentPlayer === "X"){
        currentPlayer = "O";
    }
    else{
currentPlayer = "X"
    }
    //ui update krdo
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver(){
    let answer = "";
    winningPosition.forEach( (position) =>{
        // all 3 boxes should be non-empty and exactly same in value 
        if ( (gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") &&
         (gameGrid[position[0]]=== gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])) {
             
            // check if winner is X 
            if(gameGrid[position[0]] === "X")
                answer  = "X";
            else
            answer = "O";
//   disable pointer event 
boxes.forEach((box) =>{
    box.style.pointerEvents = "none"
})
            // now we know X/O is a winner 
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
         }
    } );
//  it means we have a winner
if(answer !== ""){
gameInfo.innerText = `Winner Player - ${answer}`;
newGameBtn.classList.add("active");
return;
}

// let's check when there is no winner  
let fillcount = 0;
gameGrid.forEach( (box) =>{
    if(box != "")
        fillcount++;
});

//let's check whether there is tie
if(fillcount === 9){
    gameInfo.innerText = "game Tied !";
    newGameBtn.classList.add("active");
}

}

function handleClick(index){
    if(gameGrid[index] === ""){
        boxes[index].innerText= currentPlayer;
        gameGrid[index] =currentPlayer;
        boxes[index].style.pointerEvents ="none";
        //swap kro turn ko
        swapTurn();
        // check koi jeet toh nhi gya   
        checkGameOver();

    }
}


boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    });
});
newGameBtn.addEventListener("click", initGame);


let musicStarted = false;

function handleClick(index){
    // Music start only once after first click
    if (!musicStarted) {
        const bgMusic = document.getElementById("bg-music");
        bgMusic.play().catch((err) => {
            console.log("Autoplay blocked:", err);
        });
        musicStarted = true;
    }

    if(gameGrid[index] === ""){
        boxes[index].innerText= currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        swapTurn();
        checkGameOver();
    }
}
function toggleMusic() {
    const bgMusic = document.getElementById("bg-music");
    if (bgMusic.paused) {
        bgMusic.play();
    } else {
        bgMusic.pause();
    }
}