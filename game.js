// Functionality

allSquares.forEach((squares) => {
  squares.addEventListener('click', whiteMain);
  // squares.addEventListener('click', blackMain);
});

function move(e, condition, reverseCondition) {
  resetSquares(e);
  // variables to ease the code
  let ID = e.target.id;

  if (e.target.innerHTML !== '') {
    // finding the position of the pieces

    ID = ID.slice(-2);
    x = ID.substring(0, 1);
    y = ID.substring(1, 2);
    x = Number(x);
    y = Number(y);
    ID = Number(ID);
    currentValidId = ID;
    z = 10 * x + y;

    if (e.target.children[0].classList.contains(condition)) {
      if (e.target.children[0].classList.contains('pawn')) {
        pawn(condition);
      } else if (e.target.children[0].classList.contains('rook')) {
        rook();
      } else if (e.target.children[0].classList.contains('knight')) {
        knight();
      } else if (e.target.children[0].classList.contains('bishop')) {
        bishop();
      } else if (e.target.children[0].classList.contains('queen')) {
        queen();
      } else {
        king();
        let ids;
        if (condition === 'white') {
          ids = 85;
        } else {
          ids = 15;
        }
        kingRook(e, ids, condition);
      }
    } else {
      return;
    }

    // filtering the valid moves
    validIds.sort();
    validIds.filter((valid) => {
      if (
        valid <= 88 &&
        valid >= 11 &&
        valid !== 20 &&
        valid !== 19 &&
        valid !== 30 &&
        valid !== 29 &&
        valid !== 40 &&
        valid !== 39 &&
        valid !== 50 &&
        valid !== 49 &&
        valid !== 60 &&
        valid !== 59 &&
        valid !== 70 &&
        valid !== 69 &&
        valid !== 80 &&
        valid !== 79
      ) {
        newIds.push(valid);
      }
    });

    currentSquare = document.querySelector(`#key-${currentValidId}`);
    currentSquare.classList.toggle('current');

    newIds.forEach((ids) => {
      validSquares = document.querySelectorAll(`#key-${ids}`);

      validSquares.forEach((valid) => {
        valid.classList.toggle('valid');

        if (valid.innerHTML !== '') {
          valid.classList.remove('valid');
          if (valid.children[0].classList.contains(reverseCondition)) {
            if (valid.children[0].classList.contains('king')) {
              valid.classList.toggle('check');
            } else {
              valid.classList.toggle('danger');
            }
          }
        }

        // place in new position
        valid.addEventListener('click', (e) => {
          if (e.target.innerHTML === '') {
            e.target.appendChild(currentSquare.children[0]);

            currentSquare.innerHTML = '';
          } else {
            if (e.target.children[0].classList.contains(reverseCondition)) {
              e.target.innerHTML = '';
              e.target.appendChild(currentSquare.children[0]);
              currentSquare.innerHTML = '';
            }
          }
          specialPawn(e, condition);
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

  if (condition === 'white') {
    switchtoBlack();
  } else {
    switchToWhite();
  }
  resetArrays();
}

function resetSquares(e) {
  allSquares.forEach((all) => {
    if (e.target.id !== `key-${currentValidId}`) {
      if (
        all.classList.contains('current') ||
        all.classList.contains('danger') ||
        all.classList.contains('valid')
      ) {
        all.classList.remove('danger');
        all.classList.remove('valid');
        all.classList.remove('current');
      }
    }
  });
}

function resetArrays() {
  validIds = [];
  newIds = [];
}

function pawn(condition) {
  if (condition === 'black') {
    blackPawn();
  } else {
    whitePawn();
  }
}

function switchtoBlack() {
  allSquares.forEach((squares) => {
    squares.removeEventListener('click', whiteMain);
    squares.addEventListener('click', blackMain);
  });
}

function switchToWhite() {
  allSquares.forEach((squares) => {
    squares.removeEventListener('click', blackMain);
    squares.addEventListener('click', whiteMain);
  });
}

function whiteMain(e) {
  move(e, 'white', 'black');
}

function blackMain(e) {
  move(e, 'black', 'white');
}

function specialPawn(e, color) {
  if (e.target.children[0].classList.contains('pawn')) {
    let str = e.target.id;
    if (color === 'white') {
      if (str.substring(str.length - 2, str.length - 1) === '1') {
        e.target.innerHTML = `
            <i class="fas fa-chess-queen white queen"></i>
          `;
      }
    } else {
      if (str.substring(str.length - 2, str.length - 1) === '8') {
        e.target.innerHTML = `
            <i class="fas fa-chess-queen black queen"></i>
          `;
      }
    }
  }
}

function kingRook(e, ids, color) {
  let required = document.querySelector(`#key-${ids}`);
  let required2 = document.querySelector(`#key-${ids + 1}`);
  let required3 = document.querySelector(`#key-${ids + 2}`);
  let required4 = document.querySelector(`#key-${ids + 3}`);
  validIds.push(ids + 3);
  if (e.target.children[0].classList.contains(`king ${color}`)) {
    if (
      required.children[0].classList.contains(`king ${color}`) &&
      required2.innerHTML === '' &&
      required3.innerHTML === '' &&
      required4.children[0].classList.contains(`rook ${color}`)
    ) {
      required2.innerHTML = required4.innerHTML;
      required3.innerHTML = required.innerHTML;
      required.innerHTML = '';
      required4.innerHTML = '';
    }
  }
}
