'use strict'

var gNums = [];
var gLevel = 'easy';
var gMaxNum = 16;
var gMinNum = 1;
var gNextNum = gMinNum;
var gStartTime = 0;
var gElTimer = document.querySelector('.timer');
var gElNext = document.querySelector('.next');
var gTimerInterval;

function initPage() {
    if (gTimerInterval) clearInterval(gTimerInterval);
    gElTimer.innerText = '00:00.000';
    gNextNum = gMinNum;
    gElNext.innerText = gNextNum;
    renderBoard();
}

function renderBoard() {
    initNums();
    var elBoard = document.querySelector('table');
    var strHTML = '';
    for (var i = 0; i < gMaxNum; i++) {
        if (i % Math.sqrt(gMaxNum) === 0) strHTML += '<tr>';
        strHTML += `<td class="cell ${gLevel}" onclick="cellClicked(this)">${getNum()}</td>`;
        if ((i + 1) % Math.sqrt(gMaxNum) === 0) strHTML += '</tr>';
    }
    elBoard.innerHTML = strHTML;
}

function cellClicked(elCell) {
    var currNum = +elCell.innerText;
    if (currNum !== gNextNum) return;
    elCell.classList.add('clicked');
    gNextNum++;
    if (currNum === gMaxNum) {
        clearInterval(gTimerInterval);
        return;
    }
    if (currNum === gMinNum) {
        gStartTime = Date.now();
        gTimerInterval = setInterval(displayTimer, 53);
    }
    gElNext.innerText = gNextNum;
}

function changeLevel(level) {
    gLevel = level;
    switch (level) {
        case 'easy':
            gMaxNum = 16;
            break;
        case 'hard':
            gMaxNum = 25;
            break;
        case 'extreme':
            gMaxNum = 36;
    }
    initPage();
}

function displayTimer() {
    var newTime = Date.now();
    var timeDiff = newTime - gStartTime;
    var milliseconds = Math.floor(timeDiff % 1000);
    var seconds = Math.floor((timeDiff / 1000) % 60);
    var minutes = Math.floor((timeDiff / (1000 * 60)) % 60);
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    milliseconds = (milliseconds < 100) ? (milliseconds < 10) ? "00" + milliseconds : "0" + milliseconds : milliseconds;
    gElTimer.innerText = minutes + ":" + seconds + "." + milliseconds;
}

function getNum() {
    var randomIdx = getRandomInt(0, gNums.length - 1);
    var num = +gNums.splice(randomIdx, 1);
    return num;
}

function initNums() {
    gNums = [];
    for (var i = gMinNum; i <= gMaxNum; i++) {
        gNums.push(i);
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum and the minimum are inclusive 
}