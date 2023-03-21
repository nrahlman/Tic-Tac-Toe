let playboard = document.querySelector(".playBoard");
let box = document.querySelector(".box");
let startGame = document.querySelector(".startGame");
let winningStatement = document.querySelector(".winningStatement");
let players = document.querySelector(".players");
let firstName = document.querySelector(".firstName");
let secondName = document.querySelector(".secondName");
let reset = document.querySelector(".reset");
let matrix = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];
let count = 0;
let playing = false;
let turnComplete = false;

playboard.addEventListener("click", (event) => {
  if (playing) {
    if (event.target.nodeName === "DIV" && event.target.innerHTML === "") {
      event.target.innerHTML = count % 2 === 0 ? "X" : "O";
      let elementName = event.target.className;
      let index1 = +elementName.split("")[0];
      let index2 = +elementName.split("")[1];
      matrix[index1][index2] = event.target.innerHTML;
      count++;
      turnComplete = true;
    }
    if (count >= 1) {
      winningCondition(matrix);
    }
    if (
      secondName.innerHTML === "O: " &&
      playing === true &&
      turnComplete === true
    ) {
      computerTurn();
      count++;
      winningCondition(matrix);
      turnComplete = false;
    }
  }
});
function computerTurn(event) {
  let classIndex = ["00", "01", "02", "10", "11", "12", "20", "21", "22"];
  let randomIndex = Math.floor(Math.random() * 8.99999);
  let randomBox = classIndex[randomIndex];
  let index1 = +randomBox.split("")[0];

  let index2 = +randomBox.split("")[1];

  let getElement = document.getElementsByClassName(randomBox);
  loop = 0;
  while (getElement[0].innerHTML && loop < 100) {
    randomIndex = Math.floor(Math.random() * 8.99999);
    randomBox = classIndex[randomIndex];
    index1 = +randomBox.split("")[0];
    index2 = +randomBox.split("")[1];
    getElement = document.getElementsByClassName(randomBox);
    loop++;
  }

  matrix[index1][index2] = "O";
  getElement[0].innerHTML = "O";
}

function getColumn(matrix, cindex) {
  let verticle = [];
  for (let i = 0; i < 3; i++) {
    verticle.push(matrix[i][cindex]);
  }
  return verticle;
}
function get1Diagonal(matrix) {
  let diagonal1 = [];
  diagonal1.push(matrix[0][0], matrix[1][1], matrix[2][2]);
  return diagonal1;
}
function get2Diagonal(matrix) {
  let diagonal2 = [];
  diagonal2.push(matrix[0][2], matrix[1][1], matrix[2][0]);
  return diagonal2;
}

function winningCondition(matrix) {
  for (let i = 0; i < 3; i++) {
    if (matrix[i].join("") == "XXX") {
      winningStatement.innerHTML = "X WINS";
      winningStatement.style.background = "blue";
      playing = false;
      return true;
    } else if (matrix[i].join("") == "OOO") {
      winningStatement.innerHTML = "O WINS";
      winningStatement.style.background = "red";
      playing = false;
      return true;
    }
  }
  for (let j = 0; j < 3; j++) {
    column = getColumn(matrix, j);
    if (column.join("") == "XXX") {
      winningStatement.innerHTML = "X WINS";
      winningStatement.style.background = "blue";
      playing = false;
      return true;
    } else if (column.join("") == "OOO") {
      winningStatement.innerHTML = "O WINS";
      winningStatement.style.background = "red";
      playing = false;
      return true;
    }
  }
  diagonal1 = get1Diagonal(matrix);
  if (diagonal1.join("") == "XXX") {
    winningStatement.innerHTML = "X WINS";
    winningStatement.style.background = "blue";
    playing = false;
    return true;
  }
  if (diagonal1.join("") == "OOO") {
    winningStatement.innerHTML = "O WINS";
    winningStatement.style.background = "red";
    playing = false;
    return true;
  }
  diagonal2 = get2Diagonal(matrix);
  if (diagonal2.join("") == "XXX") {
    winningStatement.innerHTML = "X WINS";
    winningStatement.style.background = "blue";
    playing = false;
    return true;
  }
  if (diagonal2.join("") == "OOO") {
    winningStatement.innerHTML = "O WINS";
    winningStatement.style.background = "red";
    playing = false;
    return true;
  }
  if (
    count === 9 &&
    diagonal2.join("") !== "OOO" &&
    diagonal2.join("") !== "XXX" &&
    diagonal1.join("") !== "OOO" &&
    diagonal1.join("") !== "XXX"
  ) {
    winningStatement.innerHTML = "Draw";
    winningStatement.style.background = "yellow";
  }
}

players.addEventListener("click", (event) => {
  if (event.target.id === "startGame") {
    const p1name = document.getElementById("P1");
    const input1 = p1name.value;
    const p2name = document.getElementById("P2");
    const input2 = p2name.value;

    firstName.innerHTML = `X: ${input1}`;
    secondName.innerHTML = `O: ${input2}`;
    players.style.display = "none";
    playing = true;
  }
});

reset.addEventListener("click", (event) => {
  if (event.target.id === "resetButton") {
    location.reload();
  }
});
