
// window.addEventListener('DOMContentLoaded', () => {
// これはHTMLが完全に読み込まれた状態で実行するという命令 
// const connect = document.querySelector('.connect');
// document.querySelector() は 該当する最初の1つの要素を取得する関数。取得した値をそれぞれ変数に格納している

window.addEventListener('DOMContentLoaded', () => {
  const connect = document.querySelector('.connect');
  const reframe = document.querySelector('.reframe');
  const empower = document.querySelector('.empower');

  // 順番に時間差でクラス追加
  // setTimeoutは【第二引数に渡された時間が経過したのち、第一引数ののコードが実行される】
  // classList.add ⇒ 引数に渡したコードが追加される
  setTimeout(() => {
    connect.classList.add('show');
  }, 0); // すぐ

  setTimeout(() => {
    reframe.classList.add('show');
  }, 1200); // 1.2秒後（connectが表示されてから）

  setTimeout(() => {
    empower.classList.add('show');
  }, 2400); // さらに1.2秒後（reframeのあと）
});
