// 精简版权提示（减少信息暴露，可选保留）
// console.log('%cbuild from PakePlus', 'color:orangered;font-weight:bolder');

// 拦截 click 事件，防止 _blank 跳转
document.addEventListener(
  'click',
  (e) => {
    const a = e.target.closest('a');
    if (!a || !a.href) return;

    // 判断是否应拦截：target="_blank" 或 <base target="_blank">
    const shouldBlock = a.target === '_blank' || !!document.querySelector('head base[target="_blank"]');
    if (shouldBlock) {
      e.preventDefault();
      location.href = a.href;
    }
  },
  { capture: true }
);

// 拦截 window.open
const _open = window.open;
window.open = function (url, target, features) {
  if (url) location.href = url;
};
// 防止被覆盖（可选加固）
Object.defineProperty(window, 'open', {
  value: window.open,
  writable: false,
  configurable: false
});
