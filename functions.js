// white pawn movement

function whitePawn() {
  a = 10 * (x - 1) + y;
  b = 10 * (x - 2) + y;

  if (x === 6) {
    validIds.push(a, b);
  } else {
    validIds.push(a);
  }
}

function whitePawnKill() {
  a = 10 * (x - 1) + y - 1;
  b = 10 * (x - 1) + y + 1;

  killIds.push(a, b);
}

// black pawn movement
function blackPawn() {
  a = 10 * (x + 1) + y;
  b = 10 * (x + 2) + y;

  validIds.push(a, b);
}

//  white rook movement
function rook() {
  for (let i = 0; i <= 7; i++) {
    a = 10 * i + y;

    if (a !== z) {
      validIds.push(a);
    }
  }
  for (let i = 0; i <= 7; i++) {
    a = 10 * x + i;

    if (a !== z) {
      validIds.push(a);
    }
  }
}

// white Knight Movement
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

// white bishop movement
function bishop() {
  let i = 1;
  while (y - i >= 0) {
    a = 10 * (x - i) + y - i;
    b = 10 * (x + i) + y - i;
    validIds.push(a, b);
    i++;
  }
  i = 1;
  while (y + i <= 7) {
    a = 10 * (x + i) + y + i;
    b = 10 * (x - i) + y + i;
    validIds.push(a, b);
    i++;
  }
}

// White king Movement
function king() {
  // king
  a = 10 * (x - 1) + y - 1;
  b = 10 * (x - 1) + y + 1;
  c = 10 * (x + 1) + y + 1;
  d = 10 * (x + 1) + y - 1;
  e = 10 * x + y - 1;
  f = 10 * x + y + 1;
  g = 10 * (x + 1) + y;
  h = 10 * (x - 1) + y;

  validIds.push(a, b, c, d, e, f, g, h);
}
