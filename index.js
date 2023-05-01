const boxes=document.querySelectorAll(".box");
const gameInfo=document.querySelector(".game-info");
const newGameBtn=document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPositions=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];



//Lets Create a function to initialize the game.

function initGame(){
    currentPlayer="X";
    gameGrid=["","","","","","","","",""];
    //UI par bhi empty karna hoga boxes ko.
    boxes.forEach((box,index)=>{
        box.innerText="";
        boxes[index].style.pointerEvents="all";

        //Initailize box with css properties again.
        box.classList=`box box${index+1}`;

    });
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

initGame();


function checkGameOver(){
    let answer="";
    winningPositions.forEach((position)=>{
        //All Three boxes should be non empty and exactly same in value.
        if((gameGrid[position[0]]!=="" || gameGrid[position[1]]!=="" || gameGrid[position[2]]!=="")
        && (gameGrid[position[0]]===gameGrid[position[1]]) &&(gameGrid[position[1]]===gameGrid[position[2]])){

            //CheckWinner:
            if(gameGrid[position[0]]==="X"){
                answer="X";
            }
            else{
                answer="O";
            }

            //Disable pointer events: // Dono ko ek saath winner hone se avoid karega.
            boxes.forEach((box)=>{
                box.style.pointerEvents="none";
            })

            //Now we know that X/O is winner.
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });

    //That means We have got the winner.
    if(answer!==""){
        gameInfo.innerText=`Winner Player - ${answer}`;
        newGameBtn.classList.add("active");
        return;
    }


    //Lets check whether there is TIE.
    let fillCount=0;
    gameGrid.forEach((box)=>{
        if(box!==""){
            fillCount++;
        }
    });

    //Board is filled , so ga,e is tied:
    if(fillCount===9){
        gameInfo.innerText="Game Tied !";
        newGameBtn.classList.add("active");
    }
}

function swapTurn(){
    if(currentPlayer==="X"){
        currentPlayer="O";
    }
    else{
        currentPlayer="X";
    }
    //UI Update:
    gameInfo.innerText=`Current Player -  ${currentPlayer}`;
}


function handleClick(index){
    if(gameGrid[index]===""){
        boxes[index].innerText=currentPlayer;
        gameGrid[index]=currentPlayer;
        boxes[index].style.pointerEvents="none";
        //Swap karo turn ko:
        swapTurn();
        //Check koi jeet toh nhi gaya.
        checkGameOver();
    }
}

boxes.forEach((box,index)=>{
    box.addEventListener("click", ()=>{
        handleClick(index);
    })
});

newGameBtn.addEventListener("click",initGame);