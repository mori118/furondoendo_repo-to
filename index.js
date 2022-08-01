// State 相当の値を準備
// ----------------------------------------------------------------------------
let up;    // 空白ピース基準で 1 つ上のピースの場所を記録
let down;  // 空白ピース基準で 1 つ下のピースの場所を記録
let left;  // 空白ピース基準で 1 つ左のピースの場所を記録
let right; // 空白ピース基準で 1 つ右のピースの場所を記録

// 各ピースの場所を記録
let positions = [
   6,  4,  3, 10,
   7,  2,  1,  5,
   9, 13, 11,  8,
  15, 14, 12, 16,
];


// 空白ピースを基準に、上下左右のピースの場所を調べる関数
// ----------------------------------------------------------------------------
function calcAdjacentPositions() {
  const empty = positions[15];

  let temp_up    = empty - 4;
  let temp_down  = empty + 4;
  let temp_left  = empty - 1;
  let temp_right = empty + 1;

  if (temp_up   <   1 ) temp_up    = null;
  if (temp_down >   16) temp_down  = null;
  if (empty % 4 === 1 ) temp_left  = null;
  if (empty % 4 === 0 ) temp_right = null;

  up    = temp_up;
  down  = temp_down;
  left  = temp_left;
  right = temp_right;
}


// Component 相当の関数を準備 (State => View にあたるもの)
// ----------------------------------------------------------------------------
function component() {
  for (let n = 0; n < 16; n = n + 1) {
    const piece = document.querySelector('.piece-' + (n + 1));

    piece.style.order = positions[n];
  }
}


// 初期化処理
// ----------------------------------------------------------------------------
component();
calcAdjacentPositions();


// ピースがクリックされたときに実行する処理 (関数)
// ----------------------------------------------------------------------------
function pieceClickHandler(event) {
  // event.target からピースの番号 N を特定する (文字で取得されるので数値に変換する)
  const N = Number(event.target.innerText);

  if (
    positions[N - 1] === up   ||
    positions[N - 1] === down ||
    positions[N - 1] === left ||
    positions[N - 1] === right
  ) {
    // ピースの場所を入れ替える
    [ positions[15], positions[N - 1] ] = [ positions[N - 1], positions[15] ];

    // State => View の反映を行う
    component();

    // 隣接するピースを再計算する
    calcAdjacentPositions(); 
  }
}


// 1 ～ 15 番ピースのクリックを監視し、クリックされたら pieceClickHandler を呼ぶ
// ----------------------------------------------------------------------------
for (let n = 1; n <= 15; n = n + 1) {
  const piece = document.querySelector('.piece-' + n);

  piece.addEventListener('click', pieceClickHandler);
}
