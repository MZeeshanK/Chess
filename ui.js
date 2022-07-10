const board = document.querySelector('.inner-board'),
  outerBoard = document.querySelector('.board');

// UI ONLY

for (let x = 1; x <= 8; x++) {
  const row = document.createElement('div');
  row.className = 'row';
  board.appendChild(row);
}

let rows = document.querySelectorAll('.row');
rows = Array.from(rows);

rows.forEach((row) => {
  for (let x = 1; x <= 8; x++) {
    const squares = document.createElement('div');
    squares.className = 'squares';
    row.appendChild(squares);
  }
});

rows.map((row, index) => {
  if (index % 2 !== 0) {
    row.classList.add('row-reverse');
  }
  let squares = row.children;
  squares = Array.from(squares);
  outerIndex = index;

  squares.map((square, index) => {
    index = index;
    let number;
    number = `key-${outerIndex}${index}`;
    if (outerIndex === 0) {
      number = `key-${index}`;
    }
    if (row.classList.contains('row-reverse')) {
      number = `key-${outerIndex}${7 - index}`;
    }
    square.id = number;
  });

  switch (index) {
    case 0:
      squares.forEach((square, index) => {
        switch (index) {
          case 0:
          case 7:
            square.innerHTML = ` 
                <i class="fas fa-chess-rook black rook rotate"></i>
              `;
            break;
          case 1:
          case 6:
            square.innerHTML = ` 
                <i class="fas fa-chess-knight black knight rotate"></i>
              `;
            break;
          case 2:
          case 5:
            square.innerHTML = `
                <i class="fas fa-chess-bishop black bishop rotate"></i>
              `;
            break;
          case 3:
            square.innerHTML = `
                <i class="fas fa-chess-queen black queen rotate"></i>
              `;
            break;
          case 4:
            square.innerHTML = `
                <i class="fas fa-chess-king black king rotate"></i>
              `;
            break;
          default:
            return;
        }
      });
      break;
    case 1:
      squares.forEach((square) => {
        square.innerHTML = `
            <i class ="fas fa-chess-pawn black pawn rotate"></i>
          `;
      });
      break;
    // testing purposes
    case 5:
      // squares.forEach((square) => {
      //   square.innerHTML = `
      //     <i class ="fas fa-chess-pawn black pawn rotate"></i>
      //     `;
      // });
      break;
    case 6:
      squares.forEach((square) => {
        square.innerHTML = `
             <i class="fas fa-chess-pawn white pawn"></i>
          `;
      });
      break;
    case 7:
      squares.forEach((square, index) => {
        switch (index) {
          case 0:
          case 7:
            square.innerHTML = `
                <i class="fas fa-chess-rook white rook"></i>
              `;
            break;
          case 1:
          case 6:
            square.innerHTML = `
              <i class="fas fa-chess-knight white knight"></i>
              `;
            break;
          case 2:
          case 5:
            square.innerHTML = `
              <i class="fas fa-chess-bishop white bishop"></i>
              `;
            break;
          case 4:
            square.innerHTML = `
                <i class="fas fa-chess-queen white queen"></i>

              `;
            break;
          case 3:
            square.innerHTML = `
                <i class="fas fa-chess-king white king"></i>
              `;
            break;
          default:
            return;
        }
      });
      break;
  }
});
