/* ===== 수정요청 구글폼 연결 설정 =====
 * 구글폼을 만든 뒤 아래 세 값만 채우면 두 페이지(대학생·중고생) 모두에 적용됩니다.
 *  - url   : 폼 주소 (…/viewform 로 끝나는 주소)
 *  - type  : '대회 구분' 질문의 entry 번호 (예: "entry.123456789")
 *  - event : '대회명' 질문의 entry 번호
 * entry 번호를 비워 두면 폼만 열리고, 채우면 누른 카드의 대회 정보가 미리 입력됩니다.
 * url이 비어 있으면 버튼을 눌렀을 때 "준비 중" 안내만 뜹니다.
 */
window.EDIT_FORM = {
  url: "",
  entry: { type: "", event: "" }
};

(function () {
  function buildUrl(type, event) {
    var f = window.EDIT_FORM;
    if (!f || !f.url) return null;
    var u;
    try { u = new URL(f.url); } catch (e) { return null; }
    var filled = false;
    if (f.entry.type && type) { u.searchParams.set(f.entry.type, type); filled = true; }
    if (f.entry.event && event) { u.searchParams.set(f.entry.event, event); filled = true; }
    if (filled) u.searchParams.set("usp", "pp_url");
    return u.toString();
  }

  var toastEl, toastTimer;
  function toast(msg) {
    if (!toastEl) {
      toastEl = document.createElement("div");
      toastEl.className = "edit-toast";
      toastEl.setAttribute("role", "status");
      document.body.appendChild(toastEl);
    }
    toastEl.textContent = msg;
    toastEl.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove("show"); }, 2600);
  }

  var css = document.createElement("style");
  css.textContent =
    ".edit-req{display:inline-flex;align-items:center;justify-content:center;gap:5px;flex:0 0 auto;padding:9px 13px;border:1px solid #f0c9d2;border-radius:11px;background:#fff6f8;color:#a62e48;font:inherit;font-size:13px;font-weight:700;cursor:pointer;white-space:nowrap;transition:.18s}" +
    ".edit-req:hover{background:#ffeef2;border-color:#e95d78;transform:translateY(-1px)}" +
    ".card-actions{display:flex;gap:8px;align-items:stretch;margin-top:14px}.card-actions .back-map{margin-top:0;flex:1}" +
    ".edit-req.head{border-radius:999px;padding:9px 15px;background:#fff;border-color:#e1c7df}" +
    ".edit-toast{position:fixed;left:50%;bottom:24px;transform:translate(-50%,20px);background:#172033;color:#fff;padding:11px 16px;border-radius:12px;font-size:13px;font-weight:600;opacity:0;pointer-events:none;transition:.2s;z-index:99;max-width:calc(100% - 32px);text-align:center}" +
    ".edit-toast.show{opacity:1;transform:translate(-50%,0)}";
  document.head.appendChild(css);

  // 캡처 단계에서 처리해 카드 클릭(선택) 동작과 겹치지 않게 함
  document.addEventListener("click", function (ev) {
    var b = ev.target.closest && ev.target.closest("[data-edit-req]");
    if (!b) return;
    ev.preventDefault();
    ev.stopPropagation();
    var url = buildUrl(b.dataset.type || "", b.dataset.event || "");
    if (url) window.open(url, "_blank", "noopener");
    else toast("수정요청 양식을 준비 중입니다. 조금만 기다려 주세요!");
  }, true);
})();
