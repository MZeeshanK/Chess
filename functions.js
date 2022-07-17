// white pawn movement

function whitePawn() {
  a = 10 * (x - 1) + y;
  b = 10 * (x - 2) + y;

  blockPawn(7, 2);
  whitePawnKill(validIds);
}

// black pawn movement
function blackPawn() {
  a = 10 * (x + 1) + y;
  b = 10 * (x + 2) + y;

  blockPawn(2, 7);
  blackPawnKill(validIds);
}

// block Pawn Path
function blockPawn(condition, lastRow) {
  firstPawnSquare = document.querySelector(`#key-${a}`);
  secondPawnSquare = document.querySelector(`#key-${b}`);

  if (x === lastRow) {
    if (firstPawnSquare.innerHTML !== '') {
      return;
    } else {
      if (x === condition) {
        validIds.push(a, b);
      } else {
        validIds.push(a);
      }
    }
  } else {
    if (firstPawnSquare.innerHTML !== '') {
      return;
    } else if (secondPawnSquare.innerHTML !== '') {
      validIds.push(a);
    } else {
      if (x === condition) {
        validIds.push(a, b);
      } else {
        validIds.push(a);
      }
    }
  }
}

function whitePawnKill(array) {
  a = 10 * (x - 1) + y - 1;
  b = 10 * (x - 1) + y + 1;

  pawnKillCondition('black', array);
}

function blackPawnKill(array) {
  a = 10 * (x + 1) + y - 1;
  b = 10 * (x + 1) + y + 1;

  pawnKillCondition('white', array);
}

function pawnKillCondition(color, array) {
  firstPawnSquare = document.querySelector(`#key-${a}`);
  secondPawnSquare = document.querySelector(`#key-${b}`);

  if (
    firstPawnSquare !== null &&
    firstPawnSquare.innerHTML !== '' &&
    firstPawnSquare.children[0].classList.contains(color)
  ) {
    array.push(a);
  }

  if (
    secondPawnSquare !== null &&
    secondPawnSquare.innerHTML !== '' &&
    secondPawnSquare.children[0].classList.contains(color)
  ) {
    array.push(b);
  }
}

//  white rook movement
function rook(array) {
  // down
  let i = 1;
  while (x - i >= 1) {
    a = 10 * (x - i) + y;

    array.push(a);
    let blockPathSquare = document.querySelector(`#key-${a}`);

    if (blockPathSquare.innerHTML !== '') {
      break;
    }

    i++;
  }

  // up
  i = 1;
  while (x + i <= 8) {
    a = 10 * (x + i) + y;

    array.push(a);

    let blockPathSquare = document.querySelector(`#key-${a}`);

    if (blockPathSquare.hasChildNodes()) {
      break;
    }
    i++;
  }

  // left
  i = 1;
  while (y - i >= 1) {
    a = 10 * x + y - i;

    array.push(a);

    let blockPathSquare = document.querySelector(`#key-${a}`);

    if (blockPathSquare.innerHTML !== '') {
      break;
    }

    i++;
  }

  // right
  i = 1;
  while (y + i <= 8) {
    a = 10 * x + y + i;

    array.push(a);

    let blockPathSquare = document.querySelector(`#key-${a}`);

    if (blockPathSquare.hasChildNodes()) {
      break;
    }

    i++;
  }
}

//  Knight Movement
function knight(array) {
  a = 10 * (x + 2) + (y + 1);
  b = 10 * (x + 2) + (y - 1);
  c = 10 * (x - 2) + (y + 1);
  d = 10 * (x - 2) + (y - 1);
  e = 10 * (x + 1) + (y + 2);
  f = 10 * (x + 1) + (y - 2);
  g = 10 * (x - 1) + (y + 2);
  h = 10 * (x - 1) + (y - 2);

  array.push(a, b, c, d, e, f, g, h);
}

// bishop movement
function bishop(array) {
  // down left
  let i = 1;
  while (y - i >= 1) {
    a = 10 * (x - i) + y - i;

    array.push(a);

    let blockPathSquare = document.querySelector(`#key-${a}`);

    if (blockPathSquare !== null) {
      if (blockPathSquare.innerHTML !== '') {
        break;
      }
    }

    i++;
  }

  // up left
  i = 1;
  while (y - i >= 1) {
    a = 10 * (x + i) + y - i;

    array.push(a);

    let blockPathSquare = document.querySelector(`#key-${a}`);

    if (blockPathSquare !== null) {
      if (blockPathSquare.innerHTML !== '') {
        break;
      }
    }
    i++;
  }

  // down right
  i = 1;
  while (y + i <= 8) {
    a = 10 * (x + i) + y + i;

    array.push(a);

    let blockPathSquare = document.querySelector(`#key-${a}`);

    if (blockPathSquare !== null) {
      if (blockPathSquare.innerHTML !== '') {
        break;
      }
    }
    i++;
  }

  // up right
  i = 1;
  while (y + i <= 9) {
    a = 10 * (x - i) + y + i;

    array.push(a);

    let blockPathSquare = document.querySelector(`#key-${a}`);

    if (blockPathSquare !== null) {
      if (blockPathSquare.innerHTML !== '') {
        break;
      }
    }
    i++;
  }
}

// queen Movement
function queen(array) {
  rook(array);
  bishop(array);
}

// king Movement
function kings(array) {
  // down left
  a = 10 * (x - 1) + y - 1;
  // down right
  b = 10 * (x - 1) + y + 1;
  // up right
  c = 10 * (x + 1) + y + 1;
  // up left
  d = 10 * (x + 1) + y - 1;
  // left
  e = 10 * x + y - 1;
  // right
  f = 10 * x + y + 1;
  // up
  g = 10 * (x + 1) + y;
  // down
  h = 10 * (x - 1) + y;

  array.push(a, b, c, d, e, f, g, h);
}

function arrayReduce(array, newArray) {
  array.sort();
  array.filter((valid) => {
    if (
      valid >= 11 &&
      valid <= 88 &&
      valid !== 19 &&
      valid !== 20 &&
      valid !== 29 &&
      valid !== 30 &&
      valid !== 39 &&
      valid !== 40 &&
      valid !== 49 &&
      valid !== 50 &&
      valid !== 59 &&
      valid !== 60 &&
      valid !== 69 &&
      valid !== 70 &&
      valid !== 79 &&
      valid !== 80
    ) {
      newArray.push(valid);
    }
  });
}

// check not working still need some work to do

function check(king) {
  let ID = king.parentElement.id;
  let color;
  if (king.classList.contains('white')) {
    color = 'white';
  } else {
    color = 'black';
  }

  ID = ID.slice(-2);
  x = Number(ID.substring(0, 1));
  y = Number(ID.substring(1, 2));

  current = Number(ID);

  checkRook(king, color, 'pawn');
  checkRook(king, color, 'rook');
  checkRook(king, color, 'knight');
  checkRook(king, color, 'bishop');
  checkRook(king, color, 'queen');
  checkRook(king, color, 'king');
}

function checkRook(king, color, piece) {
  if (piece === 'rook') {
    rook(checkIds);
    checkCheck(king, color, 'rook');
  } else if (piece === 'knight') {
    knight(checkIds);
    checkCheck(king, color, 'knight');
  } else if (piece === 'bishop') {
    bishop(checkIds);
    checkCheck(king, color, 'bishop');
  } else if (piece === 'queen') {
    queen(checkIds);
    checkCheck(king, color, 'queen');
  } else if (piece === 'king') {
    kings(checkIds);
    checkCheck(king, color, 'king');
  } else if (piece === 'pawn') {
    if (color === 'white') {
      blackPawnKill(checkIds);
      checkCheck(king, color, 'pawn');
    } else {
      whitePawnKill(checkIds);
      checkCheck(king, color, 'pawn');
    }
  }
}

function checkCheck(king, color, piece) {
  arrayReduce(checkIds, newcheckIds);
  console.log(newcheckIds);

  newcheckIds.forEach((check) => {
    checkSquares = document.querySelectorAll(`#key-${check}`);

    checkSquares.forEach((check) => {
      if (check.innerHTML !== '') {
        if (
          check.children[0].classList.contains(piece) &&
          !check.children[0].classList.contains(color)
        ) {
          king.parentElement.classList.add('check');
        }
      }
    });
  });
}
