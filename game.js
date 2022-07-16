allPieces.forEach((pieces) => {
  if (pieces.classList.contains('white')) {
    pieces.addEventListener('click', whiteMain);
  }
});

function whiteMain(e) {
  play(e, 'white', 'black');
}

function blackMain(e) {
  play(e, 'black', 'white');
}

function play(e, color, invertedColor) {
  resetSquares(e);

  let ID = e.target.parentElement.id;

  ID = ID.slice(-2);
  x = Number(ID.substring(0, 1));
  y = Number(ID.substring(1, 2));

  current = Number(ID);

  if (e.target.classList.contains(color)) {
    if (e.target.classList.contains('pawn')) {
      if (color === 'white') {
        whitePawn();
      } else {
        blackPawn();
      }
    } else if (e.target.classList.contains('rook')) {
      rook();
    } else if (e.target.classList.contains('knight')) {
      knight();
    } else if (e.target.classList.contains('bishop')) {
      bishop();
    } else if (e.target.classList.contains('queen')) {
      queen();
    } else {
      king();
      if (color === 'white') {
        castle(85, color);
        castleQueen(85, color);
      } else {
        castle(15, color);
        castleQueen(15, color);
      }
    }
  } else {
    return;
  }

  currentSquare = document.querySelector(`#key-${current}`);
  currentSquare.classList.toggle('current');

  currentPiece = currentSquare.children[0];

  validIds.sort();
  validIds.filter((valid) => {
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
      newIds.push(valid);
    }
  });

  newIds.forEach((valid) => {
    validSquares = document.querySelectorAll(`#key-${valid}`);
    validMoves(invertedColor);

    validSquares.forEach((squares) => {
      squares.addEventListener('click', (e) => {
        movement(e);
      });
    });
  });
  allPieces.forEach((pieces) => {
    pieces.addEventListener('click', (e) => {
      kill(e);
    });
  });

  // castleRight(color);
  // castleLeft(color);

  newIds = [];
  validIds = [];
}

function resetSquares(e) {
  allSquares.forEach((squares) => {
    if (e.target.parentElement.id !== `key-${current}`) {
      if (
        squares.classList.contains('current') ||
        squares.classList.contains('valid') ||
        squares.classList.contains('check') ||
        squares.classList.contains('danger')
      ) {
        squares.classList.remove('current', 'danger', 'valid', 'check');
      }
    }
  });
}

function validMoves(invertedColor) {
  validSquares.forEach((squares) => {
    squares.classList.toggle('valid');
    if (squares.hasChildNodes()) {
      squares.classList.remove('valid');
      if (squares.children[0].classList.contains(invertedColor)) {
        if (squares.children[0].classList.contains('king')) {
          squares.classList.toggle('check');
        } else {
          squares.classList.toggle('danger');
        }
      }
    }
  });
}

function movement(e) {
  if (e.target.innerHTML === '' && e.target.classList.contains('valid')) {
    e.target.appendChild(currentPiece);
    currentSquare.innerHTML = '';

    switchPlayers();
    resetSquares(e);
  }
}

function kill(e) {
  if (e.target.parentElement.classList.contains('danger')) {
    killPiece = e.target;
    killSquare = killPiece.parentElement;

    if (currentPiece.classList.contains('white')) {
      if (blackKill.innerHTML === '') {
        blackKill.appendChild(killPiece);
      } else {
        blackKill.insertBefore(killPiece, blackKill.children[0]);
      }
    } else {
      if (whiteKill.innerHTML === '') {
        whiteKill.appendChild(killPiece);
      } else {
        whiteKill.insertBefore(killPiece, whiteKill.children[0]);
      }
    }

    let killId = killSquare.id;
    killId = killId.slice(-2);
    killId = killId.substring(0, 1);

    killSquare.appendChild(currentPiece);
    currentSquare.innerHTML = '';

    if (killSquare.children[0].classList.contains('pawn')) {
      if (killSquare.children[0].classList.contains('white')) {
        if (killId === '1') {
          killSquare.children[0].src =
            'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Chess_qlt45.svg/800px-Chess_qlt45.svg.png';
          killSquare.children[0].classList = 'chess white queen';
        }
      } else {
        if (killId === '8') {
          killSquare.children[0].src =
            'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Chess_qdt45.svg/800px-Chess_qdt45.svg.png';
          killSquare.children[0].classList = 'chess black queen';
        }
      }
    }

    switchPlayers();

    resetSquares(e);
  }
}

function switchPlayers() {
  if (currentPiece.classList.contains('white')) {
    allPieces.forEach((pieces) => {
      pieces.removeEventListener('click', whiteMain);
      pieces.addEventListener('click', blackMain);
      pieces.classList.add('rotate');
    });

    outerBoard.classList.remove('reverse-rotate-animate');
    outerBoard.classList.add('rotate-animate');
  } else {
    allPieces.forEach((pieces) => {
      pieces.removeEventListener('click', blackMain);
      pieces.addEventListener('click', whiteMain);
      pieces.classList.remove('rotate');
    });

    outerBoard.classList.remove('rotate-animate');
    outerBoard.classList.add('reverse-rotate-animate');
  }
}

function castle(number, color) {
  if (current === number) {
    let firstSquare = document.querySelector(`#key-${number}`);
    let secondSquare = document.querySelector(`#key-${number + 1}`);
    let thirdSquare = document.querySelector(`#key-${number + 2}`);
    let fourthSquare = document.querySelector(`#key-${number + 3}`);

    if (
      firstSquare.innerHTML !== '' &&
      firstSquare.children[0].classList.contains('king') &&
      firstSquare.children[0].classList.contains(color) &&
      secondSquare.innerHTML === '' &&
      thirdSquare.innerHTML === '' &&
      fourthSquare.innerHTML !== '' &&
      fourthSquare.children[0].classList.contains('rook') &&
      fourthSquare.children[0].classList.contains(color)
    ) {
      fourthSquare.classList.toggle('valid');
    }
    allPieces.forEach((pieces) => {
      if (
        pieces.parentElement.classList.contains('valid') &&
        pieces.classList.contains(color)
      ) {
        if (color === 'white') {
          pieces.removeEventListener('click', whiteMain);
        } else {
          pieces.removeEventListener('click', blackMain);
        }
        pieces.addEventListener('click', (e) => {
          if (
            e.target.classList.contains(color) &&
            e.target.parentElement.classList.contains('valid')
          ) {
            thirdSquare.appendChild(firstSquare.children[0]);
            secondSquare.appendChild(fourthSquare.children[0]);
            firstSquare.innerHTML = '';
            fourthSquare.innerHTML = '';

            switchPlayers(e);

            resetSquares(e);
          }
        });
        if (color === 'white') {
          pieces.addEventListener('click', whiteMain);
        } else {
          pieces.addEventListener('click', blackMain);
        }
      }
    });
  }
}

function castleQueen(number, color) {
  if (current === number) {
    let firstSquare = document.querySelector(`#key-${number}`);
    let secondSquare = document.querySelector(`#key-${number - 1}`);
    let thirdSquare = document.querySelector(`#key-${number - 2}`);
    let fourthSquare = document.querySelector(`#key-${number - 3}`);
    let fifthSquare = document.querySelector(`#key-${number - 4}`);

    if (
      firstSquare.innerHTML !== '' &&
      firstSquare.children[0].classList.contains('king') &&
      firstSquare.children[0].classList.contains(color) &&
      secondSquare.innerHTML === '' &&
      thirdSquare.innerHTML === '' &&
      fourthSquare.innerHTML === '' &&
      fifthSquare.innerHTML !== '' &&
      fifthSquare.children[0].classList.contains('rook') &&
      fifthSquare.children[0].classList.contains(color)
    ) {
      fifthSquare.classList.toggle('valid');
    }
    allPieces.forEach((pieces) => {
      if (
        pieces.parentElement.classList.contains('valid') &&
        pieces.classList.contains(color)
      ) {
        if (color === 'white') {
          pieces.removeEventListener('click', whiteMain);
        } else {
          pieces.removeEventListener('click', blackMain);
        }
        pieces.addEventListener('click', (e) => {
          if (
            e.target.classList.contains(color) &&
            e.target.parentElement.classList.contains('valid')
          ) {
            thirdSquare.appendChild(firstSquare.children[0]);
            secondSquare.appendChild(fifthSquare.children[0]);
            firstSquare.innerHTML = '';
            fourthSquare.innerHTML = '';
            fifthSquare.innerHTML = '';

            switchPlayers(e);

            resetSquares(e);
          }
        });
        if (color === 'white') {
          pieces.addEventListener('click', whiteMain);
        } else {
          pieces.addEventListener('click', blackMain);
        }
      }
    });
  }
}
