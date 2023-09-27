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
const XHTML = `
  <svg width="135px" height="135px" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--noto" preserveAspectRatio="xMidYMid meet" fill="#000000">
    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
    <g id="SVGRepo_iconCarrier">
      <path d="M114.31 117.18L81.14 68.9l33-49.02c.48-.73.54-1.66.12-2.43a2.357 2.357 0 0 0-2.08-1.25H84.33c-.78 0-1.51.38-1.95 1.03L64 43.97L45.62 17.22a2.373 2.373 0 0 0-1.95-1.03H15.83c-.87 0-1.68.48-2.08 1.25c-.42.77-.36 1.71.12 2.43L46.86 68.9l-33.17 48.28c-.49.72-.55 1.66-.14 2.44c.41.77 1.22 1.26 2.09 1.26H44.9c.79 0 1.52-.39 1.96-1.04L64 94.36l17.15 25.48c.44.65 1.17 1.04 1.96 1.04h29.25c.88 0 1.68-.49 2.1-1.26c.4-.78.35-1.72-.15-2.44z" fill="#304390"></path>
    </g>
  </svg>
`;
const OHTML = `
  <svg width="135px" height="135px" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--noto" preserveAspectRatio="xMidYMid meet" fill="#000000">
    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
    <g id="SVGRepo_iconCarrier">
      <path d="M64.01 15.06c-34.13 0-55.46 24.1-55.46 53.82c0 29.73 21.33 53.82 55.46 53.82c34.12 0 55.45-24.1 55.45-53.82c-.01-29.73-21.33-53.82-55.45-53.82zm0 81.78c-17.73 0-28.82-12.52-28.82-27.96s11.08-27.96 28.82-27.96c17.73 0 28.81 12.52 28.81 27.96c-.01 15.44-11.09 27.96-28.81 27.96z" clip-rule="evenodd" fill="#304343" fill-rule="evenodd"></path>
    </g>
  </svg>
`;

playboard.addEventListener("click", (event) => {
  if (playing) {
    if (event.target.nodeName === "DIV" && event.target.innerHTML === "") {
      event.target.innerHTML = count % 2 === 0 ? XHTML : OHTML;
      if (event.target.innerHTML==="X"){
        event.target.style.color='rgb(48, 67, 144)'
      }
      else{
      event.target.style.color='rgb(48, 67, 67)'}
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
  getElement[0].innerHTML = OHTML;
  getElement[0].style.color='rgb(48, 67, 67)'
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
      winningStatement.style.background = "rgb(48, 67, 144)";
      playing = false;
      const duration = 15 * 1000,
      animationEnd = Date.now() + duration,
      defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
    
    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }
    
    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();
    
      if (timeLeft <= 0) {
        return clearInterval(interval);
      }
    
      const particleCount = 50 * (timeLeft / duration);
      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        })
      );
      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        })
      );
    }, 250);
      return true;
    } else if (matrix[i].join("") == "OOO") {
      winningStatement.innerHTML = "O WINS";
      winningStatement.style.background = "rgb(48, 67, 67)";
      playing = false;
      const duration = 15 * 1000,
      animationEnd = Date.now() + duration,
      defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
    
    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }
    
    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();
    
      if (timeLeft <= 0) {
        return clearInterval(interval);
      }
    
      const particleCount = 50 * (timeLeft / duration);
      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        })
      );
      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        })
      );
    }, 250);
      return true;
    }
  }
  for (let j = 0; j < 3; j++) {
    column = getColumn(matrix, j);
    if (column.join("") == "XXX") {
      winningStatement.innerHTML = "X WINS";
      winningStatement.style.background = "rgb(48, 67, 144)";
      playing = false;
      const duration = 15 * 1000,
      animationEnd = Date.now() + duration,
      defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
    
    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }
    
    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();
    
      if (timeLeft <= 0) {
        return clearInterval(interval);
      }
    
      const particleCount = 50 * (timeLeft / duration);
      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        })
      );
      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        })
      );
    }, 250);
      return true;
    } else if (column.join("") == "OOO") {
      winningStatement.innerHTML = "O WINS";
      winningStatement.style.background = "rgb(48, 67, 67)";
      playing = false;
      const duration = 15 * 1000,
      animationEnd = Date.now() + duration,
      defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
    
    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }
    
    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();
    
      if (timeLeft <= 0) {
        return clearInterval(interval);
      }
    
      const particleCount = 50 * (timeLeft / duration);
      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        })
      );
      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        })
      );
    }, 250);
      return true;
    }
  }
  diagonal1 = get1Diagonal(matrix);
  if (diagonal1.join("") == "XXX") {
    winningStatement.innerHTML = "X WINS";
    winningStatement.style.background = "rgb(48, 67, 144)";
    playing = false;
    const duration = 15 * 1000,
      animationEnd = Date.now() + duration,
      defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
    
    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }
    
    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();
    
      if (timeLeft <= 0) {
        return clearInterval(interval);
      }
    
      const particleCount = 50 * (timeLeft / duration);
      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        })
      );
      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        })
      );
    }, 250);
    return true;
  }
  if (diagonal1.join("") == "OOO") {
    winningStatement.innerHTML = "O WINS";
    winningStatement.style.background = "rgb(48, 67, 67)";
    playing = false;
    const duration = 15 * 1000,
      animationEnd = Date.now() + duration,
      defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
    
    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }
    
    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();
    
      if (timeLeft <= 0) {
        return clearInterval(interval);
      }
    
      const particleCount = 50 * (timeLeft / duration);
      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        })
      );
      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        })
      );
    }, 250);
    return true;
  }
  diagonal2 = get2Diagonal(matrix);
  if (diagonal2.join("") == "XXX") {
    winningStatement.innerHTML = "X WINS";
    winningStatement.style.background = "rgb(48, 67, 144)";
    playing = false;
    const duration = 15 * 1000,
      animationEnd = Date.now() + duration,
      defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
    
    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }
    
    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();
    
      if (timeLeft <= 0) {
        return clearInterval(interval);
      }
    
      const particleCount = 50 * (timeLeft / duration);
      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        })
      );
      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        })
      );
    }, 250);
    return true;
  }
  if (diagonal2.join("") == "OOO") {
    winningStatement.innerHTML = "O WINS";
    winningStatement.style.background = "rgb(48, 67, 67)";
    playing = false;
    const duration = 15 * 1000,
      animationEnd = Date.now() + duration,
      defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
    
    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }
    
    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();
    
      if (timeLeft <= 0) {
        return clearInterval(interval);
      }
    
      const particleCount = 50 * (timeLeft / duration);
      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        })
      );
      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        })
      );
    }, 250);
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
