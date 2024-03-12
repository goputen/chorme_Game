// variables
let board;
let boardWidth = 750;
let boardHeight = 250;
let context;
//dino
let dinoWidth = 88;
let dinoHeight = 94;
let dinoX = 50;
let dinoY = boardHeight - dinoHeight;

let dino = {
    x: dinoX,
    y: dinoY,
    width: dinoWidth,
    height: dinoHeight
}



//cactus



let cactusArray = [];


let cactus1width = 34;
let cactus2width = 69;
let cactus3width = 102;

let cactusHeight = 70;
let cactusX = 700;
let cactusY = boardHeight - cactusHeight;



let leftShiftX = 0;
let jumpY = 0;
let down = 0.35;
let gameOver = false;
let score = 0;





window.onload = function () {
    board = document.getElementById("gameBorder");
    board.height = boardHeight;
    board.width = boardWidth;

    context = board.getContext('2d');
    //dino showing
    context.fillStyle = "red";
    context.fillRect(dino.x, dino.y, dino.width, dino.height);


    requestAnimationFrame(update);
    setInterval(placeCactus, 1000);
    document.addEventListener('keydown', jumpDino);
}

function update() {

    requestAnimationFrame(update);
    if (gameOver) {
        return;
    }



    context.clearRect(0, 0, board.width, board.height);
    context.fillStyle = "yellow";
    jumpY = jumpY + down;
    dino.y = Math.min(dino.y + jumpY, dinoY);

    context.fillRect(dino.x, dino.y, dino.width, dino.height);

    scores();
    for (let i = 0; i <= cactusArray.length; i++) {
        let cactus = cactusArray[i];
        context.fillStyle = "green";
        cactus.x = cactus.x + leftShiftX;
        context.fillRect(cactus.x, cactus.y, cactus.width, cactus.height);


        if (collision(dino, cactus)) {
            gameOver = true;
            context.fillStyle = "red";
            context.fillRect(dino.x, dino.y, dino.width, dino.height);

        }

    }

    return gameOver;
}




function scores() {
    if (leftShiftX < 0) {
        message.innerText="";  

        score = score + 0.1;
        document.getElementById('score').innerText = Math.floor(score);
    }else{
     message.innerText="click up arrow to start";  
    }
}




function placeCactus() {
    if (gameOver) {
        score = 0;
        return;
    }

    let cactus = {
        x: cactusX,
        y: cactusY,
        width: null,
        height: cactusHeight
    }

    let placeCactusChance = Math.random();
    if (placeCactusChance > 0.9) {
        cactus.width = cactus3width;
        cactusArray.push(cactus);
    }
    else if (placeCactusChance > 0.7) {
        cactus.width = cactus2width;
        cactusArray.push(cactus);
    }
    else if (placeCactusChance > 0.5) {
        cactus.width = cactus1width;
        cactusArray.push(cactus);
    }

    if (cactusArray.length == 5) {
        cactusArray.shift();

    }
}

function jumpDino(e) {
    leftShiftX = -8;
    if (gameOver) {
        return;
    }
    if ((e.key == " " || e.code == "ArrowUp") && (dino.y == dinoY)) {
        jumpY = -10;

    }
}

function collision(a, b) {
    return a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y;


}