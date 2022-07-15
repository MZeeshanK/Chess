// white pawn movement

function whitePawn() {
  a = 10 * (x - 1) + y;
  b = 10 * (x - 2) + y;

  blockPawn(7, 2);
  whitePawnKill();
}

// black pawn movement
function blackPawn() {
  a = 10 * (x + 1) + y;
  b = 10 * (x + 2) + y;

  blockPawn(2, 7);
  blackPawnKill();
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

function whitePawnKill() {
  a = 10 * (x - 1) + y - 1;
  b = 10 * (x - 1) + y + 1;

  pawnKillCondition('black');
}

function blackPawnKill() {
  a = 10 * (x + 1) + y - 1;
  b = 10 * (x + 1) + y + 1;

  pawnKillCondition('white');
}

function pawnKillCondition(color) {
  firstPawnSquare = document.querySelector(`#key-${a}`);
  secondPawnSquare = document.querySelector(`#key-${b}`);

  if (
    firstPawnSquare !== null &&
    firstPawnSquare.innerHTML !== '' &&
    firstPawnSquare.children[0].classList.contains(color)
  ) {
    validIds.push(a);
  }

  if (
    secondPawnSquare !== null &&
    secondPawnSquare.innerHTML !== '' &&
    secondPawnSquare.children[0].classList.contains(color)
  ) {
    validIds.push(b);
  }
}

//  white rook movement
function rook() {
  // down
  let i = 1;
  while (x - i >= 1) {
    a = 10 * (x - i) + y;

    validIds.push(a);
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

    validIds.push(a);

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

    validIds.push(a);

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

    validIds.push(a);

    let blockPathSquare = document.querySelector(`#key-${a}`);

    if (blockPathSquare.hasChildNodes()) {
      break;
    }

    i++;
  }
}

//  Knight Movement
function knight() {
  a = 10 * (x + 2) + (y + 1);
  b = 10 * (x + 2) + (y - 1);
  c = 10 * (x - 2) + (y + 1);
  d = 10 * (x - 2) + (y - 1);
  e = 10 * (x + 1) + (y + 2);
  f = 10 * (x + 1) + (y - 2);
  g = 10 * (x - 1) + (y + 2);
  h = 10 * (x - 1) + (y - 2);

  validIds.push(a, b, c, d, e, f, g, h);
}

// bishop movement
function bishop() {
  // down left
  let i = 1;
  while (y - i >= 1) {
    a = 10 * (x - i) + y - i;

    validIds.push(a);

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

    validIds.push(a);

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

    validIds.push(a);

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

    validIds.push(a);

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
function queen() {
  rook();
  bishop();
}

// king Movement
function king() {
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

  validIds.push(a, b, c, d, e, f, g, h);
}

function kingRook(e, ids, color) {
  let required = document.querySelector(`#key-${ids}`);
  let required2 = document.querySelector(`#key-${ids + 1}`);
  let required3 = document.querySelector(`#key-${ids + 2}`);
  let required4 = document.querySelector(`#key-${ids + 3}`);
}
