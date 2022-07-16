const whiteKill = document.querySelector('.white-kill'),
  blackKill = document.querySelector('.black-kill');

let allSquares = document.querySelectorAll('.squares'),
  allPieces = document.querySelectorAll('.chess'),
  validIds = [],
  newIds = [],
  x,
  y,
  a,
  b,
  c,
  d,
  e,
  f,
  g,
  h,
  firstPawnSquare,
  secondPawnSquare;

let currentSquare,
  current,
  firstSquare,
  secondSquare,
  thirdSquare,
  fourthSquare,
  fifthSquare;
