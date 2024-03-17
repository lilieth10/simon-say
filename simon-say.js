let machineSequence = [];
let userSequence = [];
let round = 0;

document.querySelector('button[type=button]').onclick = startGame;

updateTurn('Press "Start" to play');
updateTurnNumber('0');
blockUserInput();

function startGame() {
    statusRestart();
    turnHandler();
}

function statusRestart() {
    machineSequence = [];
    userSequence = [];
    round = 0;
}

function turnHandler() {
    updateTurn("Machine's turn");
    blockUserInput();

    const $newBox = getRandomBox();
    machineSequence.push($newBox);

    const USER_DELAY = (machineSequence.length + 1) * 1000;

    machineSequence.forEach(function ($box, index) {
        const MS_DELAY = (index + 1) * 1000;
        setTimeout(function () {
            highlight($box);
        }, MS_DELAY);
    });

    setTimeout(function () {
        updateTurn("User's turn");
        unblockUserInput();
    }, USER_DELAY);

    userSequence = [];
    round++;
    updateTurnNumber(round);
}

function blockUserInput() {
    document.querySelectorAll('.box').forEach(function ($box) {
        $box.onclick = function () {
        };
    });
}

function unblockUserInput() {
    document.querySelectorAll('.box').forEach(function ($box) {
        $box.onclick = inputHandler;
    });
}

function inputHandler(event) {
    const $box = event.target;
    highlight($box);
    userSequence.push($box)

    const $machineBox = machineSequence[userSequence.length - 1];
    if ($box.id !== $machineBox.id) {
        loseGame();
        return;
    }

    if (userSequence.length === machineSequence.length) {
        blockUserInput();
        setTimeout(turnHandler, 1000);
    }
}

function getRandomBox() {
    const $boxes = document.querySelectorAll('.box');
    const index = Math.floor(Math.random() * $boxes.length);
    return $boxes[index];
}

function highlight($box) {
    $box.style.opacity = 1;
    setTimeout(function () {
        $box.style.opacity = 0.5;
    }, 500);
}

function loseGame() {
    blockUserInput();
    statusRestart();
    updateTurn('You lost! Press "Start" to play again', true);
}

function updateTurn(status, error = false) {
    const $status = document.querySelector('#status');
    $status.textContent = status;
    if (error) {
        $status.classList.remove('alert-success');
        $status.classList.add('alert-danger');
    } else {
        $status.classList.remove('alert-danger');
        $status.classList.add('alert-success');
    }
}

function updateTurnNumber(round) {
    document.querySelector('#round').textContent = round;
}