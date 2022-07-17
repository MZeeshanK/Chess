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
      rook(validIds);
    } else if (e.target.classList.contains('knight')) {
      knight(validIds);
    } else if (e.target.classList.contains('bishop')) {
      bishop(validIds);
    } else if (e.target.classList.contains('queen')) {
      queen(validIds);
    } else {
      kings(validIds);
      if (color === 'white') {
        castle(85, 86, 87, 88, null, color);
        castle(85, 84, 83, 82, 81, color);
      } else {
        castle(15, 16, 17, 18, null, color);
        castle(15, 14, 13, 12, 11, color);
      }
    }
  } else {
    return;
  }

  currentSquare = document.querySelector(`#key-${current}`);
  currentSquare.classList.toggle('current');

  currentPiece = currentSquare.children[0];

  arrayReduce(validIds, newIds);

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

  // check(blackKing);

  newIds = [];
  validIds = [];
  checkIds = [];
  newcheckIds = [];
}

function resetSquares(e) {
  allSquares.forEach((squares) => {
    if (e.target.parentElement.id !== `key-${current}`) {
      if (
        squares.classList.contains('current') ||
        squares.classList.contains('valid') ||
        squares.classList.contains('danger') ||
        squares.classList.contains('check')
      ) {
        squares.classList.remove('current', 'check', 'danger', 'valid');
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
    let newId = e.target.id;
    newId = newId.slice(-2);
    newId = newId.substring(0, 1);

    e.target.appendChild(currentPiece);

    specialPawn(currentPiece, newId);

    currentSquare.innerHTML = '';

    switchPlayers();
    resetSquares(e);
  }
}

function kill(e) {
  if (
    e.target.parentElement.classList.contains('danger') ||
    e.target.parentElement.classList.contains('check')
  ) {
    killPiece = e.target;
    killSquare = killPiece.parentElement;

    if (currentPiece.classList.contains('white')) {
      if (blackKill.innerHTML === '') {
        blackKill.appendChild(killPiece);
      } else {
        blackKill.insertBefore(killPiece, blackKill.children[0]);
      }
      if (killPiece.classList.contains('king')) {
        gameOver.style = 'display:flex;transform:rotate(180deg);';
        document.querySelector('#winner-heading').textContent = 'white wins';
        document.querySelector('#winner-heading').style = 'color:#ddd;';
      }
    } else {
      if (whiteKill.innerHTML === '') {
        whiteKill.appendChild(killPiece);
      } else {
        whiteKill.insertBefore(killPiece, whiteKill.children[0]);
      }
      if (killPiece.classList.contains('king')) {
        gameOver.style = 'display:flex';
        document.querySelector('#winner-heading').textContent = 'black wins';
        document.querySelector('#winner-heading').style = 'color:#333;';
      }
    }

    let killId = killSquare.id;
    killId = killId.slice(-2);
    killId = killId.substring(0, 1);

    killSquare.appendChild(currentPiece);

    specialPawn(currentPiece, killId);

    currentSquare.innerHTML = '';

    let tieArray = [];

    allSquares.forEach((squares) => {
      if (squares.innerHTML !== '') {
        tieArray.push(squares);
      }
    });

    console.log(tieArray.length);

    if (tieArray.length === 2) {
      document.querySelector('#winner-heading').textContent = 'Match Tied';
      if (currentPiece.classList.contains('white')) {
        gameOver.style.cssText = 'display:flex;transform:rotate(180deg);';
      } else {
        gameOver.style.cssText = 'display:flex;';
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

  // check(blackKing);
  // check(whiteKing);
}

function specialPawn(currentPiece, newId) {
  console.log(currentSquare);
  if (currentPiece.classList.contains('pawn')) {
    if (currentPiece.classList.contains('white')) {
      if (newId === '1') {
        currentPiece.src =
          'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Chess_qlt45.svg/800px-Chess_qlt45.svg.png';
        currentPiece.classList = 'chess white queen';
      }
    } else {
      if (newId === '8') {
        currentPiece.src =
          'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Chess_qdt45.svg/800px-Chess_qdt45.svg.png';
        currentPiece.classList = 'chess black queen';
      }
    }
  }
}

function castle(number, number2, number3, number4, number5, color) {
  if (current === number) {
    let firstSquare = document.querySelector(`#key-${number}`);
    let secondSquare = document.querySelector(`#key-${number2}`);
    let thirdSquare = document.querySelector(`#key-${number3}`);
    let fourthSquare = document.querySelector(`#key-${number4}`);
    let fifthSquare;
    if (number5 !== null) {
      fifthSquare = document.querySelector(`#key-${number5}`);
    }

    if (
      firstSquare.innerHTML !== '' &&
      firstSquare.children[0].classList.contains('king') &&
      firstSquare.children[0].classList.contains(color) &&
      secondSquare.innerHTML === '' &&
      thirdSquare.innerHTML === ''
    ) {
      if (fifthSquare === undefined) {
        if (
          fourthSquare.innerHTML !== '' &&
          fourthSquare.children[0].classList.contains('rook') &&
          fourthSquare.children[0].classList.contains(color)
        ) {
          fourthSquare.classList.toggle('valid');
        }
      } else {
        if (
          fourthSquare.innerHTML === '' &&
          fifthSquare.innerHTML !== '' &&
          fifthSquare.children[0].classList.contains('rook') &&
          fifthSquare.children[0].classList.contains(color)
        ) {
          fifthSquare.classList.toggle('valid');
        }
      }
    }
    castleMove(
      color,
      firstSquare,
      secondSquare,
      thirdSquare,
      fourthSquare,
      fifthSquare
    );
  }
}

function castleMove(
  color,
  firstSquare,
  secondSquare,
  thirdSquare,
  fourthSquare,
  fifthSquare
) {
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
          if (fifthSquare === undefined) {
            secondSquare.appendChild(fourthSquare.children[0]);
          } else {
            secondSquare.appendChild(fifthSquare.children[0]);
            fifthSquare.innerHTML = '';
          }
          thirdSquare.appendChild(firstSquare.children[0]);
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

document.querySelector('#play-again').addEventListener('click', () => {
  window.location.reload();
});
