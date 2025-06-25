/* ========== home.js : 1 回目だけタイトルを出現 → フェードアウト ========= */

/* ========== home.js 完成版 ========== */
// window.addEventListener('DOMContentLoaded', () => {
//   const header   = document.querySelector('header');
//   const titleH1  = document.querySelector('.title');      // <h1 class="title">
//   const titleImg = document.querySelector('.title-img');
//   const main     = document.querySelector('main');

//   /* ── 再訪問ならタイトルを最初から非表示 ─────────────────── */
//   if (sessionStorage.getItem('animationPlayed')) {
//     titleH1.style.display = 'none';
//     header.classList.add('show');
//     titleImg.classList.add('show');
//     main.classList.add('show');
//     return;
//   }

//   /* ── ① タイトル文字を <span> に分割して出現アニメ ───────── */
//   const text = titleH1.textContent.trim();
//   titleH1.textContent = '';

//   [...text].forEach((ch, i) => {
//     const span = document.createElement('span');
//     span.textContent          = ch;
//     span.style.animationDelay = `${i * 0.08}s`;   // 0.08s 刻み
//     titleH1.appendChild(span);
//   });

//   /* ── ② 全文字が出終わったあと 1.5s でフェードアウト ─────── */
//   const lastDelay = (text.length - 1) * 0.08 + 0.6 + 0.2; // 秒
//   setTimeout(() => {
//     const spans = document.querySelectorAll('.title span');

//     /* forwards レイヤーを解除 */
//     spans.forEach(s => {
//       s.style.animation = 'none';  // アニメ‐レイヤーを外す
//       s.offsetWidth;               // ★強制 reflow（1フレーム確保）
//       s.style.opacity = '0';       // transition が必ず発火
//     });
//   }, lastDelay * 1000);

//   /* ── ③ 画像・ヘッダー・main を順次表示 ───────────────── */
//   setTimeout(() => titleImg.classList.add('show'), 4000);
//   setTimeout(() => header.classList.add('show'),   7000);
//   setTimeout(() => main.classList.add('show'),     7000);

//   /* ── ④ フラグ保存：次回はタイトル生成しない ─────────────── */
//   sessionStorage.setItem('animationPlayed', 'true');
// });




window.addEventListener('DOMContentLoaded', () => {
  const header   = document.querySelector('header');
  const titleBox = document.querySelector('.title');           // <h1 class="title">
  const titleImg = document.querySelector('.title-img');
  const main     = document.querySelector('main');

  /* ──────────── ① 2 回目以降は最初から非表示 ──────────── */
  if (sessionStorage.getItem('animationPlayed')) {
    titleBox.style.display = 'none';        // タイトルごと消す
    header.classList.add('show');
    titleImg.classList.add('show');
    main.classList.add('show');
    return;                                 // ここで処理終了
  }

  /* ──────────── ② 初回だけタイトルを <span> 分割して表示 ──────────── */
  const originalText = titleBox.textContent;
  titleBox.textContent = '';                // いったん空に

  [...originalText].forEach((char, i) => {
    const span = document.createElement('span');
    span.textContent = char;
    span.style.animationDelay = `${i * 0.08}s`;
    titleBox.appendChild(span);
  });

  /* ──────────── ③ 文字をフェードアウト → 他要素を順次表示 ──────────── */
  setTimeout(() => {
    const spans = document.querySelectorAll('.title span');

    // アニメーションレイヤー解除 & 今の opacity=1 を保持
    spans.forEach(s => {
      s.style.animation = 'none';
      s.style.opacity   = '1';
    });

    // 次フレームで opacity 0 → transition が発火してふわっと消える
    requestAnimationFrame(() => {
      spans.forEach(s => (s.style.opacity = '0'));
    });
  }, 4000);

  setTimeout(() => titleImg.classList.add('show'), 4000);
  setTimeout(() => header.classList.add('show'),   7000);
  setTimeout(() => main.classList.add('show'),     7000);

  /* ──────────── ④ フラグを保存 ──────────── */
  sessionStorage.setItem('animationPlayed', 'true');
});
