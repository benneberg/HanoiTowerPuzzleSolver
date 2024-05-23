// script.js
const moves = [];
let moveIndex = 0;
let totalSteps = 0;
const solveButton = document.getElementById('solveButton');
const stepCounter = document.getElementById('stepCounter');

function moveDisk(disk, source, target) {
    const diskElement = document.getElementById(disk);
    const targetTower = document.getElementById(target);

    // Move the disk visually to the target tower
    targetTower.appendChild(diskElement);
}

function hanoi(n, source, auxiliary, target) {
    if (n === 1) {
        moves.push([`disk${n}`, source, target]);
    } else {
        hanoi(n - 1, source, target, auxiliary);
        moves.push([`disk${n}`, source, target]);
        hanoi(n - 1, auxiliary, source, target);
    }
}

function solveHanoi() {
    moves.length = 0; // Reset moves
    moveIndex = 0;
    hanoi(3, 'tower1', 'tower2', 'tower3');
    totalSteps = moves.length;
    updateStepCounter();
    animateMoves();
}

function animateMoves() {
    if (moveIndex < moves.length) {
        const [disk, source, target] = moves[moveIndex];
        moveDisk(disk, source, target);
        moveIndex++;
        updateStepCounter();
        setTimeout(animateMoves, 1000); // Adjust the delay for smoother animation
    } else {
        // When all moves are completed, change button text to "Run again"
        solveButton.textContent = 'Run again';
        solveButton.disabled = false;
    }
}

function updateStepCounter() {
    stepCounter.textContent = `Step ${moveIndex}/${totalSteps}`;
}

solveButton.addEventListener('click', () => {
    if (solveButton.textContent === 'Solve') {
        solveHanoi();
        solveButton.textContent = 'Solving...';
        solveButton.disabled = true; // Disable button during solving
    } else {
        resetGame();
        solveButton.textContent = 'Solve';
    }
});

// Resetting the app 
function resetGame() {
    const tower1 = document.getElementById('tower1');
    const tower2 = document.getElementById('tower2');
    const tower3 = document.getElementById('tower3');

    // Moving all disks back to tower1 in correct order
    const disks = ['disk3', 'disk2', 'disk1'];
    disks.forEach(diskId => {
        const diskElement = document.getElementById(diskId);
        tower1.appendChild(diskElement);
    });

    // Clear tower2 and tower3
    while (tower2.firstChild) {
        tower2.removeChild(tower2.firstChild);
    }
    while (tower3.firstChild) {
        tower3.removeChild(tower3.firstChild);
    }

    // Reset the step counter and move index
    moveIndex = 0;
    totalSteps = 0;
    updateStepCounter();
}
