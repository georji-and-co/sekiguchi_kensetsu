/* ===========================
   さいとう内科クリニック | common.js
   =========================== */

// ===== 診療ステータス判定 =====
// 月火木金：9:00〜12:30 / 昼休み 12:30〜15:00 / 15:00〜17:30
// 土：9:00〜12:30 のみ
// 水・日・祝：休診
function getClinicStatus() {
  const now = new Date();
  const day = now.getDay(); // 0=日,1=月,2=火,3=水,4=木,5=金,6=土
  const t   = now.getHours() * 60 + now.getMinutes();

  const AM_S = 9  * 60;        //  9:00
  const AM_E = 12 * 60 + 30;  // 12:30
  const PM_S = 15 * 60;        // 15:00
  const PM_E = 17 * 60 + 30;  // 17:30

  // 水・日 → 終日休診
  if (day === 0 || day === 3) {
    return { state: 'closed', text: '本日は<strong>休診日</strong>です' };
  }

  // 土 → 午前のみ
  if (day === 6) {
    if (t < AM_S)              return { state: 'closed', text: '本日の受付は <strong>8:50〜</strong>' };
    if (t >= AM_S && t < AM_E) return { state: 'open',   text: '現在 <strong>診療中</strong>（午前）&nbsp;／&nbsp; 受付は 12:00 まで' };
    return { state: 'closed', text: '本日の診療は<strong>終了</strong>しました（土は午前のみ）' };
  }

  // 月火木金
  if (t < AM_S)              return { state: 'closed', text: '本日の受付は <strong>8:50〜</strong>' };
  if (t >= AM_S && t < AM_E) return { state: 'open',   text: '現在 <strong>診療中</strong>（午前）&nbsp;／&nbsp; 受付は 12:00 まで' };
  if (t >= AM_E && t < PM_S) return { state: 'lunch',  text: '<strong>休診中</strong> です &nbsp;／&nbsp; 午後の診療は <strong>15:00〜</strong> 再開します' };
  if (t >= PM_S && t < PM_E) return { state: 'open',   text: '現在 <strong>診療中</strong>（午後）&nbsp;／&nbsp; 受付は 17:00 まで' };
  return { state: 'closed', text: '本日の診療は<strong>終了</strong>しました' };
}

// ===== 常時ステータスバーを生成 =====
(function initStatusBar() {
  var s = getClinicStatus();
  var stateClass = s.state === 'open' ? 'is-open' : (s.state === 'lunch' ? 'is-lunch' : 'is-closed');

  var bar = document.createElement('div');
  bar.className = 'status-bar ' + stateClass;
  bar.innerHTML =
    '<span class="status-bar-dot"></span>' +
    '<span class="status-bar-text">' + s.text + '</span>';

  // demo-banner の次（body先頭）に挿入
  document.body.insertAdjacentElement('afterbegin', bar);
})();

// ===== SMOOTH ANCHOR SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(function(a) {
  a.addEventListener('click', function(e) {
    var id = a.getAttribute('href').slice(1);
    var el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    var root    = document.documentElement;
    var demoH   = parseFloat(getComputedStyle(root).getPropertyValue('--demo-h'))   || 0;
    var headerH = parseFloat(getComputedStyle(root).getPropertyValue('--header-h')) || 64;
    var statusH = parseFloat(getComputedStyle(root).getPropertyValue('--status-h')) || 40;
    var top = el.getBoundingClientRect().top + window.scrollY - demoH - headerH - statusH - 8;
    window.scrollTo({ top: top, behavior: 'smooth' });
  });
});

// ===== STICKY CTA TEL =====
var telBtn = document.querySelector('.sticky-cta-tel');
if (telBtn) {
  telBtn.addEventListener('click', function() {
    window.location.href = 'tel:049-289-8787';
  });
}

// ===== STICKY CTA SCROLL TO SCHEDULE =====
var schedBtn = document.querySelector('.sticky-cta-sched');
if (schedBtn) {
  schedBtn.addEventListener('click', function() {
    var el = document.getElementById('schedule');
    if (!el) return;
    var root    = document.documentElement;
    var demoH   = parseFloat(getComputedStyle(root).getPropertyValue('--demo-h'))   || 0;
    var headerH = parseFloat(getComputedStyle(root).getPropertyValue('--header-h')) || 64;
    var statusH = parseFloat(getComputedStyle(root).getPropertyValue('--status-h')) || 40;
    var top = el.getBoundingClientRect().top + window.scrollY - demoH - headerH - statusH - 8;
    window.scrollTo({ top: top, behavior: 'smooth' });
  });
}
