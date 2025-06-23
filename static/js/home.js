
// window.addEventListener('DOMContentLoaded', () => {
// これはHTMLが完全に読み込まれた状態で実行するという命令 
// const connect = document.querySelector('.connect');
// document.querySelector() は 該当する最初の1つの要素を取得する関数。取得した値をそれぞれ変数に格納している

// 意味すること（逐語解説）
// sessionStorage.getItem('animationPlayed') が存在しないか確認
// 　→ つまり「このタブで初めてアクセスされた」状態
// アニメーションを順番に実行
// 　→ .connect, .reframe, .empower それぞれに .show クラスを追加
// sessionStorage に animationPlayed: 'true' を保存
// 　→ これにより次回からは「もう表示した」と判定される


window.addEventListener('DOMContentLoaded', () => {
  
  // const title = document.querySelector('.title');
  // const reframe = document.querySelector('.reframe');
  // const empower = document.querySelector('.empower');
  // const titleimg = document.querySelector('.title-img')
  const header = document.querySelector('header')
  const main = document.querySelector('main')

    // 順番に時間差でクラス追加
    // setTimeoutは【第二引数に渡された時間が経過したのち、第一引数ののコードが実行される】
    // classList.add ⇒ 引数に渡したコードが追加される
    if (!sessionStorage.getItem('animationPlayed')){
      // setTimeout(() => {
      //   title.classList.add('show');
      // }, 800); // すぐ

      // setTimeout(() => {
      //   reframe.classList.add('show');
      // }, 2400); // 1.2秒後（connectが表示されてから）

      // setTimeout(() => {
      //   empower.classList.add('show');
      // }, 4000); // さらに1.2秒後（reframeのあと）

      // setTimeout(() => {
      //   titleimg.classList.add('show');
      // }, 3600);

      setTimeout(() => {
        header.classList.add('show')
      },6000)

      setTimeout(() => {
        main.classList.add('show')
      },6000)

      sessionStorage.setItem('animationPlayed','true')

      // 2回目以降
    } else {
      // title.classList.add('show');
      // reframe.classList.add('show');
      // empower.classList.add('show');
      // titleimg.classList.add('show');
      header.classList.add('show');
      main.classList.add('show');
    }
});


window.addEventListener('DOMContentLoaded', () => {
  const title = document.querySelector('.title');
  const text = title.textContent;  // 元の文字列を取得
  title.textContent = '';          // 中身を一旦空に

  [...text].forEach((char, index) => {
    const span = document.createElement('span');
    span.textContent = char;
    span.style.animationDelay = `${index * 0.08}s`; // 1文字ごとに遅らせる
    title.appendChild(span);
  });
});


