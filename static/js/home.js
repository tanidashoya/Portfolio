
// window.addEventListener('DOMContentLoaded',() => {})
// window:「ブラウザのウィンドウ全体」＝最上位のグローバルオブジェクト 
// element.addEventListener(イベント名, 関数);
// ↑あるHTML要素（element）に対して、特定のイベントが起きたときに指定した関数（＝処理）を実行する、という命令です
// DOMContentLoaded ⇒ HTMLの読み込みが完了した時点で中の処理を実行する
// アロー関数：(引数) => {処理内容}
// document.querySelector('要素')⇒JavaScriptから操作するためにHTMLの要素を取得
window.addEventListener('DOMContentLoaded', () => {
  const header   = document.querySelector('header');
  const titleBox = document.querySelector('.title');           // <h1 class="title">
  const titleImg = document.querySelector('.title-img');
  const main     = document.querySelector('main');
  const hamburger = document.querySelector('.hamburger');

  /* ──────────── ① 2 回目以降は最初から非表示 ──────────── */
  // sessionStorage.getItem('animationPlayed')
  // sessionStorage:今のタブで開いている間だけ有効な保存場所
  // .getItem('animationPlayed'):以前このページで「アニメーションしたよ」のsessionが記録されているかを確認している
  if (sessionStorage.getItem('animationPlayed')) {
    titleBox.style.display = 'none';        // タイトルごと消す
    header.classList.add('show');           //headerに.showを加える。(headerを出現させる)
    titleImg.classList.add('show');         //title-imgを出現させる
    main.classList.add('show');
    hamburger.classList.add('show')             //mainを出現させる
    return;                                 // ここで処理終了。これより下の関数処理にはいかない
  }


  /* ──────────── ② 初回だけタイトルを <span> 分割して順番にアニメーションをかける準備 ──────────── */
  // ここでのtitleboxはh1要素の.titleクラスである。直接Connect..Reframe..Empowerが書かれている要素である
  //[...originalText]:文字列を1文字ずつ分解して配列（）リストにする書き方。例：["こ","ん","に","ち","は"]
  // 配列.forEach((char, i) => { ... })：配列の中身の文字を一文字ずつ取り出して処理する。処理内容はアロー関数で記述
  //document.createElement('span')：HTMLの<span>タグをjavascriptで生成する
  //ここでのcharは文字（1文字）で i は char の配列におけるインデックス
  // span.style.animationDelay：CSSのアニメーションの遅延時間をJavascriptから設定している（JSはdelayだけ設定し、アニメーション自体はCSSに任せている）
  //titlebox.appendChild(span)：作ったspan要素をtitlebox(クラス名.titleのh1要素)に追加する
  //   <h1 class="title">
  //     <span style="animation-delay: 0s">こ</span>
  //     <span style="animation-delay: 0.08s">ん</span>
  //     <span style="animation-delay: 0.16s">に</span>
  //     <span style="animation-delay: 0.24s">ち</span>
  //     <span style="animation-delay: 0.32s">は</span>
  //   </h1>/
  // スクリプトが読み込まれて上記のように分解されてspanが追加されてCSSのanimationが順次実行されていく。
  const originalText = titleBox.textContent; //変数に.titleの文字列を格納
  titleBox.textContent = '';                // いったん空に

  [...originalText].forEach((char, i) => {
    const span = document.createElement('span');
    span.textContent = char;
    span.style.animationDelay = `${i * 0.08}s`;
    titleBox.appendChild(span);
  });


  /* ──────────── ③ 文字をフェードアウト → 他要素を順次表示 ──────────── */
  // 4秒後にタイトルの文字（現在は.title spanとなっている）をフェードアウトする。
  // setTimeout(アロー関数, 4000)：4秒後に処理開始
  // querySelectorAll：指定したCSSセレクタに一致する要素を「全部」取得
  // querySelectorAll が返すのはほぼ配列だけど、厳密には「NodeList」（イテラブル）foEachを使えるがmap()やfilter()では変換が必要
  //アロー関数は引数が一つだけなら()を省略できる。spans.forEach(s => {処理})
  setTimeout(() => {
    const spans = document.querySelectorAll('.title span');

    // アニメーションレイヤー解除 & 今の opacity=1 を保持
    spans.forEach(s => {
      s.style.animation = 'none';
      s.style.opacity   = '1';
    });

    // 次フレームで opacity 0 → transition が発火してふわっと消える
    // 2フレーム遅らせて確実に再描画を挟んでからCSSの変更を適用させる(transitionを設定してふわっと消す)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        spans.forEach(s => {
          s.style.opacity = '0';
        });
      });
    });
  }, 4000);

  setTimeout(() => titleImg.classList.add('show'), 4200);
  setTimeout(() => header.classList.add('show'),   7500);
  setTimeout(() => hamburger.classList.add('show'),   7500);
  setTimeout(() => main.classList.add('show'),     7500);

  /* ──────────── ④ フラグを保存 ──────────── */
  //sessionを保存して2回目以降のアクセス時にはアニメーションが作動しないようにしている
  sessionStorage.setItem('animationPlayed', 'true');
});
