// white pawn movement

function whitePawn() {
  a = 10 * (x - 1) + y;
  b = 10 * (x - 2) + y;

  blockPawn();
  whitePawnKill();
}

// black pawn movement
function blackPawn() {
  a = 10 * (x + 1) + y;
  b = 10 * (x + 2) + y;

  blockPawn();
  blackPawnKill();
}

// block Pawn Path
function blockPawn() {
  firstPawnSquare = document.querySelector(`#key-${a}`);
  secondPawnSquare = document.querySelector(`#key-${b}`);

  if (firstPawnSquare.hasChildNodes()) {
    return;
  } else if (secondPawnSquare.hasChildNodes()) {
    validIds.push(a);
  } else {
    if (x === 6) {
      validIds.push(a, b);
    } else {
      validIds.push(a);
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

  if (firstPawnSquare !== null) {
    if (firstPawnSquare.innerHTML !== '') {
      if (firstPawnSquare.children[0].classList.contains(color)) {
        validIds.push(a);
      }
    }
  }

  if (secondPawnSquare !== null) {
    if (secondPawnSquare.innerHTML !== '') {
      if (secondPawnSquare.children[0].classList.contains(color)) {
        validIds.push(b);
      }
    }
  }
}

//  white rook movement
function rook() {
  // down
  let i = 1;
  while (x - i >= 0) {
    a = 10 * (x - i) + y;

    validIds.push(a);
    blockPathSquare = document.querySelector(`#key-${a}`);

    if (blockPathSquare.hasChildNodes()) {
      break;
    }

    i++;
  }

  // up
  i = 1;
  while (x + i <= 7) {
    a = 10 * (x + i) + y;

    validIds.push(a);

    blockPathSquare = document.querySelector(`#key-${a}`);

    if (blockPathSquare.hasChildNodes()) {
      break;
    }
    i++;
  }

  // left
  i = 1;
  while (y - i >= 0) {
    a = 10 * x + y - i;

    validIds.push(a);

    blockPathSquare = document.querySelector(`#key-${a}`);

    if (blockPathSquare.hasChildNodes()) {
      break;
    }

    i++;
  }

  // right
  i = 1;
  while (y + i <= 7) {
    a = 10 * x + y + i;

    validIds.push(a);

    blockPathSquare = document.querySelector(`#key-${a}`);

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
  while (y - i >= 0) {
    a = 10 * (x - i) + y - i;

    validIds.push(a);

    blockPathSquare = document.querySelector(`#key-${a}`);

    if (blockPathSquare.hasChildNodes()) {
      break;
    }
    i++;
  }

  // up left
  i = 1;
  while (y - i >= 0) {
    a = 10 * (x + i) + y - i;

    validIds.push(a);

    blockPathSquare = document.querySelector(`#key-${a}`);

    if (blockPathSquare.hasChildNodes()) {
      break;
    }
    i++;
  }

  // up right
  i = 1;
  while (y + i <= 7) {
    a = 10 * (x + i) + y + i;

    validIds.push(a);

    blockPathSquare = document.querySelector(`#key-${a}`);

    if (blockPathSquare.hasChildNodes()) {
      break;
    }
    i++;
  }

  // down right
  i = 1;
  while (y + i <= 7) {
    a = 10 * (x - i) + y + i;

    validIds.push(a);

    blockPathSquare = document.querySelector(`#key-${a}`);

    if (blockPathSquare.hasChildNodes()) {
      break;
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
