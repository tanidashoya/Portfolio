// JavaScript例


// document.querySelector() は HTML内から特定の要素を取得する関数
// ".hamburger" → クラス名 .hamburger のボタンを取得
// "nav" → <nav> タグを取得（今回はメニュー）
const hamburger = document.querySelector(".hamburger");
const nav = document.querySelector("nav");


//.addEventListener("click", () => {...})
// → クリックイベントが発生したときに中の処理を実行
// nav.classList.toggle("active")
// → active クラスをON/OFF切り替え
// 🔄 この結果、CSSの nav.active { display: flex; } が効く＝メニューが表示される
hamburger.addEventListener("click", () => {
  nav.classList.toggle("active");
});


// event.target：クリックされた場所のHTML要素
// nav.contains(event.target)
// → メニュー内がクリックされたかどうかを判定
// hamburger.contains(event.target)
// → ハンバーガー自体がクリックされたかを判定
// 両方外れてたらメニューを閉じる
// 👆 これで「外をクリックしたらメニューを閉じる」UIが実現

document.addEventListener("click", (event) => {
  const isClickInsideMenu = nav.contains(event.target);
  const isClickOnHamburger = hamburger.contains(event.target);

  if (!isClickInsideMenu && !isClickOnHamburger) {
    nav.classList.remove("active");
  }
});


/*
✅ ステップ①：要素の取得
js
コードをコピーする
const hamburger = document.querySelector(".hamburger");
const nav = document.querySelector("nav");
🎯 目的
この2行は 「HTMLにある特定のパーツ（タグ）をJavaScriptで触れるようにする」 ためのコードです。
これがないと、JavaScriptはどのボタンがクリックされたのか分からないし、どのメニューを表示すればいいのかも分かりません。

🔍 分解して理解する
document
ブラウザで読み込んだHTML全体のことを意味します。

JavaScriptではこの document オブジェクトを使って、HTMLを操作します。

querySelector("...")
HTMLの中から特定の要素を1つだけ探してくる関数。

カッコの中は CSSと同じ書き方：

".hamburger" → .hamburger クラスの要素

"nav" → <nav> タグ（クラスなしでもOK）

js
コードをコピーする
const nav = document.querySelector("nav");
↑このように書くと、JavaScriptはHTML内の

html
コードをコピーする
<nav>〜</nav>
という部分を記憶して「この部分をあとで操作するよ」と準備してくれる。

🔧 具体的な流れのイメージ：
plaintext
コードをコピーする
HTMLを読み込む
↓
JavaScriptが「.hamburger」というクラス名の要素を探す
↓
それを「hamburger」という名前の変数に入れる
↓
今後、hamburger と書けばそのボタンを操作できる
🧪 実験してみたい人向け：
Chromeなどのブラウザでページを開いたら、F12キー（開発者ツール）を押して、
「Console」タブにこう書いて Enter してみて：

js
コードをコピーする
document.querySelector(".hamburger")
→ HTMLの .hamburger 要素が取得されて表示されるよ！

✅ この部分を一言で言うと？
HTMLの中の「ハンバーガー」と「メニュー」をJavaScriptに教えてあげて、操作の準備をしている段階

*/


/*
② ハンバーガーボタンをクリックしたときの動作
js
コードをコピーする
hamburger.addEventListener("click", () => {
  nav.classList.toggle("active");
});
🎯 意味と流れを丁寧に解説：
hamburger.addEventListener("click", ...)
addEventListener() は、ユーザーが何か操作（イベント）をしたときに、何かを実行させる関数。

"click" はイベントの種類。ここでは「クリックされたとき」を意味します。

()の中に関数（() => { ... }）を渡して、「クリックされたらこの中のことを実行してね」と指示しています。

👇中身の処理部分：
js
コードをコピーする
nav.classList.toggle("active");
nav：HTMLの <nav> 要素（すでに①で取得済み）

.classList.toggle("active")：
→ active というクラスをON/OFFで切り替える

✅ このコードの効果：
ハンバーガーをクリックすると

.active クラスが nav に追加される

もう一度クリックすると削除される

つまり**「開く→閉じる→開く→…」をトグル（切替）で実現**

🖼️ イメージで言えば：
plaintext
コードをコピーする
[初期状態]
<nav> ← .active がない → display: none;

[クリック後]
<nav class="active"> ← .active が付く → display: flex;

[再クリック]
<nav> ← .active が外れる → display: none;
これはCSS側にあるこのコードと連動しています👇

css
コードをコピーする
nav {
  display: none;
}

nav.active {
  display: flex;
}
✅ まとめると
JavaScriptがやっていることは「クリックされたら、HTMLのクラスを切り替えて、CSSの見た目を変えている」だけ。

*/


/*
ChatGPT:
了解しました、しょうやさん！
ではラストのステップ ―― ③：メニュー外をクリックしたら閉じる 処理に進みましょう。

✅ ステップ③：メニュー外をクリックしたら閉じる仕組み
js
コードをコピーする
document.addEventListener("click", (event) => {
  const isClickInsideMenu = nav.contains(event.target);
  const isClickOnHamburger = hamburger.contains(event.target);

  if (!isClickInsideMenu && !isClickOnHamburger) {
    nav.classList.remove("active");
  }
});
🎯 目的
ハンバーガーメニューが開いている状態で
「メニュー外のどこかをクリックしたら、閉じたい」
というUIを実現するためのコードです。

🔍 一行ずつ丁寧に解説：
🔹 document.addEventListener("click", (event) => { ... })
ページ全体（document）でクリックされたときに反応します。

event は「どこがクリックされたのか？」という情報を持ったオブジェクトです。

この中の event.target に「実際にクリックされたHTMLの要素」が入ってます。

🔹 nav.contains(event.target)
nav は <nav> タグでしたね。

.contains(x) は「xがこの要素の中に含まれているか？」を判定します。

つまり：

js
コードをコピーする
const isClickInsideMenu = nav.contains(event.target);
→ クリックされた場所がメニューの中だったら true

🔹 hamburger.contains(event.target)
同じように、クリックされた場所がハンバーガーボタン自体なら true

🔹 if (!isClickInsideMenu && !isClickOnHamburger)
「メニューの中でもない、ボタンでもない」＝画面のどこか別のところ

つまり、メニュー以外の場所をクリックした

🔹 nav.classList.remove("active")
これで .active クラスが削除されて、CSSが display: none; に戻る
→ メニューが閉じる！

🧠 全体の流れ（視覚イメージ）
plaintext
コードをコピーする
ユーザーがどこかをクリック
↓
その場所（event.target）が nav や hamburger の中かどうかを判定
↓
どちらでもなければ .active を外す
↓
→ メニューが閉じる！
✅ まとめると
このコードは **「ユーザーが開いたメニューを、外をタップすることで自然に閉じる」**という、今どきのWebでよくある気配り機能です。

*/