const heading = document.querySelector("#game-heading");
const table = document.querySelector("tbody");
const cells = document.querySelectorAll(".game-square");
const restartButt = document.querySelector("#restart-button");
cells.forEach((cell, iterator) => {
  cell.setAttribute("id", `${iterator}`);
});
const rows = document.querySelectorAll("tr");
rows.forEach((row, iterator) => {
  row.setAttribute("id", `${iterator}`);
});
let cellsArr = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];
const endGame = () => {
  cellsArr = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  mod = 0;
  numberMoves = 0;
  cells.forEach((cell) => {
    cell.disabled = true;
  });
  restartButt.style.display = "block";
};
restartButt.addEventListener("click", () => {
  cells.forEach((cell) => {
    cell.disabled = false;
    cell.textContent = "";
    heading.textContent = "Player 1's Turn";
  });
  restartButt.style.display = "none";
});
const checkFinished = (twodArr) => {
  for (let i = 0; i < 3; i++) {
    if (i == 0) {
      if (twodArr[0][0] != "") {
        //horizontal check row 1
        if (twodArr[0][0] == twodArr[0][1] && twodArr[0][0] == twodArr[0][2])
          return twodArr[0][0];

        //vertical check col 1
        if (twodArr[0][0] == twodArr[1][0] && twodArr[0][0] == twodArr[2][0])
          return twodArr[0][0];
      }
    }
    if (i == 1) {
      if (twodArr[1][1] != "") {
        //horizontal check row 2
        if (twodArr[1][1] == twodArr[1][0] && twodArr[1][1] == twodArr[1][2])
          return twodArr[1][1];

        //check cross
        if (twodArr[1][1] == twodArr[0][0] && twodArr[1][1] == twodArr[2][2])
          return twodArr[1][1];
        if (twodArr[1][1] == twodArr[0][2] && twodArr[1][1] == twodArr[2][0])
          return twodArr[1][1];

        //vertical check col 2
        if (twodArr[1][1] == twodArr[0][1] && twodArr[1][1] == twodArr[2][1])
          return twodArr[1][1];
      }
    }
    if (i == 2) {
      if (twodArr[2][2] != "") {
        //horizontal check row 3
        if (twodArr[2][2] == twodArr[2][0] && twodArr[2][2] == twodArr[2][1])
          return twodArr[2][2];

        //vertical check col 3
        if (twodArr[2][2] == twodArr[0][2] && twodArr[2][2] == twodArr[1][2])
          return twodArr[2][2];
      }
    }
  }
  return null;
};
let numberMoves = 0;
let mod = 0;
let symbol;
const toggle_player = () => {
  mod += 1;
  heading.textContent = `Player ${(mod % 2) + 1}'s Turn`;
  symbol = mod % 2 == 0 ? "O" : "X";
};
const make_move = () => {
  put_in_cell();
};
const put_in_cell = () => {
  table.addEventListener("click", (e) => {
    if (e.target.classList.contains("game-square")) {
      if (e.target.disabled == true) return;
      toggle_player();
      e.target.textContent = symbol;
      e.target.disabled = true;
      numberMoves++;
      if (
        cellsArr[
          Number(e.target.parentElement.parentElement.getAttribute("id"))
        ][Number(e.target.getAttribute("id")) % 3] == ""
      )
        cellsArr[
          Number(e.target.parentElement.parentElement.getAttribute("id"))
        ][Number(e.target.getAttribute("id")) % 3] = e.target.textContent;
      const result = checkFinished(cellsArr);
      if (result == "X" || result == "O") {
        const player = result == "X" ? "1" : "2";
        heading.textContent = `Player ${player} Won!`;
        endGame();
      }
      if (numberMoves == 9) {
        heading.textContent = `Tie Game!`;
        endGame();
      }
    }
  });
};
make_move();
