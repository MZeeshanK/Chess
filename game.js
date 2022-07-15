allPieces.forEach((pieces) => {
  if (pieces.classList.contains('white')) {
    pieces.addEventListener('click', whiteMain);
  } else {
    // pieces.addEventListener('click', blackMain);
  }
});

function whiteMain(e) {
  play(e, 'white', 'black');
}

function blackMain(e) {
  play(e, 'black', 'white');
}

function play(e, color, invertedColor) {
  // allPieces.forEach((pieces) => {
  //   if (color === 'white') {
  //     pieces.removeEventListener('click', blackMain);
  //   } else {
  //     pieces.removeEventListener('click', whiteMain);
  //   }
  // });
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
        movement(e, color);
      });
    });
    allPieces.forEach((pieces) => {
      pieces.addEventListener('click', (e) => {
        kill(e, color);
      });
    });
  });

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

function movement(e, color) {
  if (e.target.innerHTML === '' && e.target.classList.contains('valid')) {
    e.target.appendChild(currentPiece);
    currentSquare.innerHTML = '';

    switchPlayers(color);
    resetSquares(e);
  }
}

function kill(e, color) {
  if (e.target.parentElement.classList.contains('danger')) {
    killPiece = e.target;
    killSquare = killPiece.parentElement;

    if (color === 'white') {
      if (blackKill.innerHTML === '') {
        blackKill.appendChild(killPiece);
      } else {
        blackKill.insertBefore(killPiece, blackKill.children[0]);
      }
    } else if (color === 'black') {
      if (whiteKill.innerHTML === '') {
        whiteKill.appendChild(killPiece);
      } else {
        whiteKill.insertBefore(killPiece, whiteKill.children[0]);
      }
    }

    killSquare.appendChild(currentPiece);
    currentSquare.innerHTML = '';

    switchPlayers(color);

    resetSquares(e);
  }
}

function switchPlayers(color) {
  allPieces.forEach((pieces) => {
    if (color === 'white') {
      pieces.removeEventListener('click', whiteMain);
      pieces.addEventListener('click', blackMain);
    } else {
      pieces.removeEventListener('click', blackMain);
      pieces.addEventListener('click', whiteMain);
    }
  });
}
