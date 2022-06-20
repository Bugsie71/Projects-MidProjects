const startBtn = document.querySelector(".startBtn");
const gameContainer = document.querySelector(".gameContainer");
const game = document.querySelector(".game");
const levelContainer = document.querySelector(".level");
const container = document.querySelector(".container");

let activeGame = false;
let orginialOrder = [];
let playerOrder = [];
let level = 1;
let timesSelected = 0;

function start() {
    startBtn.style.display = "none";
    gameContainer.style.display = "flex";

    levelContainer.innerHTML = level;
    createBoxes();

    setTimeout(() => nextLevel(), 500);
}

function createBoxes() {
    for (let i = 0; i < 9; i++) {
        const box = document.createElement("li");
        box.classList.add("box");
        box.id = i;
        box.addEventListener("click", () => {
            playerOrder.push(parseInt(box.id)),
                timesSelected++,
                checkOrder(timesSelected);
        });

        game.append(box);
    }
}

function nextLevel() {
    container.style.backgroundColor = "rgb(50, 50, 255)";
    setTimeout(() => (container.style.backgroundColor = "blue"), 300);

    const randomNum = Math.floor(Math.random() * 9);

    orginialOrder.push(randomNum);
    levelContainer.innerHTML = level;

    container.style["pointer-events"] = "none";
    flashSequence(orginialOrder);
}

function flashSequence(orginialOrder) {
    let i = 0;
    let box;

    setTimeout(() => {
        let myTimer = setInterval(() => {
            box = document.getElementById(orginialOrder[i]);
            box.classList.add("active");
            setTimeout(() => {
                box.classList.remove("active");
            }, 400);
            i++;

            if (i === orginialOrder.length) {
                clearInterval(myTimer);
                container.style["pointer-events"] = "";
            }
        }, 500 * (i + 1));
    }, 300);
}

function checkOrder(select) {
    if (JSON.stringify(orginialOrder) === JSON.stringify(playerOrder)) {
        level++;
        playerOrder = [];
        timesSelected = 0;
        nextLevel();
    } else if (orginialOrder[select - 1] !== playerOrder[select - 1]) {
        gameover();
    }
}

function gameover() {
    gameContainer.style.display = "none";
    startBtn.innerHTML = `
	You made it to Level ${level}
	Try again :)
	`;
    startBtn.style.display = "block";
}

function resetGame() {
    const boxes = document.querySelectorAll(".box");
    boxes.forEach((box) => {
        box.remove();
    });
    orginialOrder = [];
    playerOrder = [];
    level = 1;
    timesSelected = 0;
}

startBtn.addEventListener("click", () => {
    if (!activeGame) {
        start();
        activeGame = true;
    } else {
        resetGame();
        start();
    }
});
