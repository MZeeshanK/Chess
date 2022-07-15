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
  outerIndex = index + 1;

  squares.map((square, index) => {
    index = index + 1;
    let number;
    number = `key-${outerIndex}${index}`;
    if (row.classList.contains('row-reverse')) {
      number = `key-${outerIndex}${9 - index}`;
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
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Chess_rdt45.svg/800px-Chess_rdt45.svg.png" class="black chess rook"/>
            `;
            break;
          case 1:
          case 6:
            square.innerHTML = `
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Chess_ndt45.svg/800px-Chess_ndt45.svg.png" class="black chess knight"/>
              `;
            break;
          case 2:
          case 5:
            square.innerHTML = `
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Chess_bdt45.svg/800px-Chess_bdt45.svg.png" class="black chess bishop"/>
              `;
            break;
          case 3:
            square.innerHTML = `
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Chess_qdt45.svg/800px-Chess_qdt45.svg.png" class="black chess queen"/>
              `;
            break;
          case 4:
            square.innerHTML = `
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Chess_kdt45.svg/800px-Chess_kdt45.svg.png" class="black chess king"/>
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
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Chess_pdt45.svg/800px-Chess_pdt45.svg.png" class="black chess pawn"/>
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
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Chess_plt45.svg/800px-Chess_plt45.svg.png" class="white chess pawn"/>
          `;
      });
      break;
    case 7:
      squares.forEach((square, index) => {
        switch (index) {
          case 0:
          case 7:
            square.innerHTML = `
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Chess_rlt45.svg/800px-Chess_rlt45.svg.png" class="white chess rook"/>
            `;
            break;
          case 1:
          case 6:
            square.innerHTML = `
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Chess_nlt45.svg/800px-Chess_nlt45.svg.png" class="white chess knight"/>
                `;
            break;
          case 2:
          case 5:
            square.innerHTML = `
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Chess_blt45.svg/800px-Chess_blt45.svg.png" class="white chess bishop"/>
              `;
            break;
          case 4:
            square.innerHTML = `
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Chess_qlt45.svg/800px-Chess_qlt45.svg.png" class="white chess queen"/>

              `;
            break;
          case 3:
            square.innerHTML = `
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Chess_klt45.svg/800px-Chess_klt45.svg.png" class="white chess king"/>
              `;
            break;
          default:
            return;
        }
      });
      break;
  }
});
