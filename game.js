// Functionality

allSquares.forEach((squares) => {
  squares.addEventListener('click', (e) => {
    // variables to ease the code
    const square = e.target,
      piece = e.target.children[0];

    let ID = square.id;

    if (e.target.hasChildNodes()) {
      // finding the position of the pieces
      ID = ID.slice(-2);
      x = ID.substring(0, 1);
      y = ID.substring(1, 2);
      x = Number(x);
      y = Number(y);
      ID = Number(ID);
      currentValidId = ID;
      z = 10 * x + y;

      if (piece.classList.contains('white')) {
        if (piece.classList.contains('pawn')) {
          whitePawn();
          whitePawnKill();
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

      // filtering the valid moves
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

      killIds.sort();
      killIds.filter((kill) => {
        if (
          kill <= 77 &&
          kill >= 0 &&
          kill !== 8 &&
          kill !== 9 &&
          kill !== 18 &&
          kill !== 19 &&
          kill !== 28 &&
          kill !== 29 &&
          kill !== 38 &&
          kill !== 39 &&
          kill !== 48 &&
          kill !== 49 &&
          kill !== 58 &&
          kill !== 59 &&
          kill !== 68 &&
          kill !== 69
        ) {
          newKillIds.push(kill);
        }
      });

      //

      square.classList.toggle('current');
      currentSquare = document.querySelector(`#key-${currentValidId}`);
      currentPiece = currentSquare.children[0];

      killIds.forEach((kills) => {
        killSquare = document.querySelectorAll(`#key-${kills}`);
        killSquare.forEach((kill) => {
          if (
            kill.hasChildNodes() &&
            kill.children[0].classList.contains('black')
          ) {
            kill.classList.toggle('valid');
          }
        });
      });

      newIds.forEach((valid) => {
        validSquares = document.querySelectorAll(`#key-${valid}`);
        validSquares.forEach((validSquare) => {
          if (validSquare.hasChildNodes()) {
            if (validSquare.children[0].classList.contains('black')) {
              validSquare.classList.toggle('danger');
            }
          } else {
            validSquare.classList.toggle('valid');
          }
          validSquare.addEventListener('click', (e) => {
            if (
              e.target.classList.contains('valid') ||
              e.target.classList.contains('danger')
            ) {
              e.target.appendChild(currentPiece);
              // document.querySelector(currentSquare).innerHTML = '';
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

    console.log(validIds);

    validIds = [];
    newIds = [];
    killIds = [];
  });
});
