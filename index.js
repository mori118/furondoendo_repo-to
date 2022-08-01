// State 相当の値を準備
// ----------------------------------------------------------------------------
let up;    // 空白ピース基準で 1 つ上のピースの場所を記録
let down;  // 空白ピース基準で 1 つ下のピースの場所を記録
let left;  // 空白ピース基準で 1 つ左のピースの場所を記録
let right; // 空白ピース基準で 1 つ右のピースの場所を記録
let count=0;// クリック数を記録

// 各ピースの場所を記録
let positions = [
   6,  4,  3, 10,
   7,  2,  1,  5,
   9, 13, 11,  8,
  15, 14, 12, 16,
];

function randomizePositions(array){
  for (var i = array.length; 1 < i; i--) {
      var k = Math.floor(Math.random() * i);
      [array[k], array[i - 1]] = [array[i - 1], array[k]];
  }
}

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
  document.getElementById('count').innerHTML = "Crick"+count+"されました" ;
}

// 初期化処理
// ----------------------------------------------------------------------------
randomizePositions(positions);
component();
calcAdjacentPositions();

//配列の要素の順番を確認する関数
function isFinished(array){
  for(var i = 0; (array.length - 1) > i; i++){
    if (i+1!=array[i]){
      return false;
    }
    if (array[i]==(array.length - 1)){
      return true;
    }
  }
}

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
    count++;
    component();

    // 隣接するピースを再計算する
    calcAdjacentPositions();
  }
  //クリアした時に，アラートを表示（OKを押すとリロード）
  if(isFinished(positions)==true){
    window.alert("手数"+count+"でクリアおめでとう！");
    window.alert("Restart!!");
    document.location.reload();
  }
}


// 1 ～ 15 番ピースのクリックを監視し、クリックされたら pieceClickHandler を呼ぶ
// ----------------------------------------------------------------------------
for (let n = 1; n <= 15; n = n + 1) {
  const piece = document.querySelector('.piece-' + n);
  piece.addEventListener('click', pieceClickHandler);
}