// Functionality

const allSquares = document.querySelectorAll('.squares');

let validIds = [],
  newIds = [],
  killIds = [],
  x,
  y,
  z,
  a,
  b,
  c,
  d,
  e,
  f,
  g,
  h,
  validId,
  currentValidId,
  validSquares,
  newPosition;

allSquares.forEach((squares) => {
  squares.addEventListener('click', (e) => {
    if (e.target.hasChildNodes(true)) {
      const square = e.target,
        piece = e.target.children[0],
        ID = square.id;

      if (piece.classList.contains('white')) {
        validId = ID;
        validId = ID.slice(-2);
        x = validId.substring(0, 1);
        y = validId.substring(1, 2);
        x = Number(x);
        y = Number(y);
        validId = Number(validId);
        currentValidId = validId;
        z = 10 * x + y;

        if (piece.classList.contains('pawn')) {
          a = 10 * (x - 1) + y;
          b = 10 * (x - 2) + y;

          validIds.push(a, b);
        } else if (piece.classList.contains('rook')) {
          rook();
        } else if (piece.classList.contains('knight')) {
          knight();
        } else if (piece.classList.contains('bishop')) {
          bishop();
        } else if (piece.classList.contains('queen')) {
          rook();
          bishop();
        } else {
          king();
        }
      } else {
        console.log(23423);
      }

      validIds.sort();
      validIds.filter((valid) => {
        if (
          valid <= 77 &&
          valid >= 0 &&
          valid !== 8 &&
          valid !== 9 &&
          valid !== 18 &&
          valid !== 19 &&
          valid !== 28 &&
          valid !== 29 &&
          valid !== 38 &&
          valid !== 39 &&
          valid !== 48 &&
          valid !== 49 &&
          valid !== 58 &&
          valid !== 59 &&
          valid !== 68 &&
          valid !== 69
        ) {
          newIds.push(valid);
        }
      });

      square.classList.toggle('current');
      currentSquare = document.querySelector(`#key-${currentValidId}`);
      currentPiece = currentSquare.children[0];

      newIds.forEach((valid) => {
        validSquares = document.querySelectorAll(`#key-${valid}`);
        validSquares.forEach((validSquare) => {
          if (validSquare.hasChildNodes(true)) {
            validSquare.classList.toggle('valid');
            if (validSquare.children[0].classList.contains('black')) {
              validSquare.classList.remove('valid');
              validSquare.classList.toggle('danger');
            } else if (validSquare.children[0].classList.contains('white')) {
              validSquare.classList.remove('valid');
            }
          } else {
            validSquare.classList.toggle('valid');
          }
          validSquare.addEventListener('click', (e) => {
            if (
              e.target.classList.contains('valid') ||
              e.target.classList.console('danger')
            ) {
              e.target.appendChild(currentPiece);
            }
            allSquares.forEach((allSquare) => {
              allSquare.classList.remove('valid');
              allSquare.classList.remove('current');
              allSquare.classList.remove('danger');
              allSquare.classList.toggle('rotate');
            });
            if (outerBoard.classList.contains('rotate-animate')) {
              outerBoard.classList.remove('rotate-animate');
              outerBoard.classList.add('reverse-rotate-animate');
            } else if (
              outerBoard.classList.contains('reverse-rotate-animate')
            ) {
              outerBoard.classList.remove('reverse-rotate-animate');
              outerBoard.classList.add('rotate-animate');
            } else {
              outerBoard.classList.add('rotate-animate');
            }
          });
        });
      });
    } else if (e.target.classList.contains('fas')) {
      const piece = e.target;
      if (piece.classList.contains('white')) {
        console.log(343);
      } else {
        console.log(349);
      }
    } else {
      return;
    }

    validIds = [];
    newIds = [];
  });
});

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
