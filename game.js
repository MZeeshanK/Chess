// Functionality

allSquares.forEach((squares) => {
  squares.addEventListener('click', (e) => {
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

    // variables to ease the code
    const square = e.target,
      piece = e.target.children[0];

    let ID = square.id;

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

      if (piece.classList.contains('white')) {
        if (piece.classList.contains('pawn')) {
          whitePawn();
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
        console.log(213);
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
      if (squares.children[0].classList.contains('white')) {
        currentSquare = document.querySelector(`#key-${currentValidId}`);
        currentSquare.classList.toggle('current');
      }

      newIds.forEach((ids) => {
        validSquares = document.querySelectorAll(`#key-${ids}`);

        validSquares.forEach((valid) => {
          valid.classList.toggle('valid');

          if (valid.innerHTML !== '') {
            valid.classList.remove('valid');
            if (valid.children[0].classList.contains('black')) {
              valid.classList.toggle('danger');
            }
          }
          valid.addEventListener('click', (e) => {
            if (e.target.innerHTML === '') {
              e.target.appendChild(currentSquare.children[0]);
              currentSquare.innerHTML = '';
            } else {
              if (e.target.children[0].classList.contains('black')) {
                e.target.innerHTML = '';
                e.target.appendChild(currentSquare.children[0]);
                currentSquare.innerHTML = '';
              }
            }
          });
        });
      });

      newIds.push(currentValidId);

      // newIds.forEach((valid) => {
      //   validSquares = document.querySelectorAll(`#key-${valid}`);
      //   validSquares.forEach((validSquare) => {
      //     if (validSquare.hasChildNodes()) {
      //       if (validSquare.children[0].classList.contains('black')) {
      //         validSquare.classList.toggle('danger');
      //       }
      //     } else {
      //       validSquare.classList.toggle('valid');
      //     }
      //     validSquare.addEventListener('click', (e) => {
      //       if (
      //         e.target.classList.contains('valid') ||
      //         e.target.classList.contains('danger')
      //       ) {
      //         console.log(123);
      //         e.target.appendChild(currentPiece);
      //         // document.querySelector(currentSquare).innerHTML = '';
      //       }
      //       allSquares.forEach((allSquare) => {
      //         allSquare.classList.remove('valid');
      //         allSquare.classList.remove('current');
      //         allSquare.classList.remove('danger');
      //         // allSquare.classList.toggle('rotate');
      //       });
      //       // next move
      //       // if (outerBoard.classList.contains('rotate-animate')) {
      //       //   outerBoard.classList.remove('rotate-animate');
      //       //   outerBoard.classList.add('reverse-rotate-animate');
      //       // } else if (
      //       //   outerBoard.classList.contains('reverse-rotate-animate')
      //       // ) {
      //       //   outerBoard.classList.remove('reverse-rotate-animate');
      //       //   outerBoard.classList.add('rotate-animate');
      //       // } else {
      //       //   outerBoard.classList.add('rotate-animate');
      //       // }
      //     });
      //   });
      // });
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

    console.log(newIds);

    validIds = [];
    newIds = [];
  });
});
