/* ===== 수정요청 ↔ 구글폼 연결 설정 =====
 * 사이트의 수정요청 페이지(request.html)가 이 설정으로 구글폼에 응답을 보냅니다.
 * 구글폼에 들어간 응답은 폼에 연결된 구글 시트로 자동으로 쌓입니다.
 *
 *  - action  : 폼 주소의 …/viewform 을 …/formResponse 로 바꾼 주소
 *  - entry.* : 각 질문의 entry 번호 (예: "entry.123456789")
 *              → 폼의 '사전 입력된 링크'에서 확인할 수 있습니다.
 * action 이 비어 있으면 수정요청 페이지에 "연결 준비 중" 안내가 표시됩니다.
 */
window.EDIT_FORM = {
  action: "",
  entry: {
    type: "",     // 1. 대회 구분 (대학생대회 / 중고생대회)
    event: "",    // 2. 대회명
    items: "",    // 3. 수정할 항목 (체크박스)
    content: "",  // 4. 수정 내용
    status: "",   // 5. 확정 여부
    name: "",     // 6. 요청자 이름
    org: "",      // 7. 소속·직분
    contact: ""   // 8. 연락처
  }
};

/* 카드·상단의 '✎ 수정요청' 버튼 → 수정요청 페이지로 이동 (대회 정보 자동 입력) */
(function () {
  var css = document.createElement("style");
  css.textContent =
    ".edit-req{display:inline-flex;align-items:center;justify-content:center;gap:5px;flex:0 0 auto;padding:9px 13px;border:1px solid #f0c9d2;border-radius:11px;background:#fff6f8;color:#a62e48;font:inherit;font-size:13px;font-weight:700;cursor:pointer;white-space:nowrap;text-decoration:none;transition:.18s}" +
    ".edit-req:hover{background:#ffeef2;border-color:#e95d78;transform:translateY(-1px)}" +
    ".card-actions{display:flex;gap:8px;align-items:stretch;margin-top:14px}.card-actions .back-map{margin-top:0;flex:1}" +
    ".edit-req.head{border-radius:999px;padding:9px 15px;background:#fff;border-color:#e1c7df}";
  document.head.appendChild(css);

  // 캡처 단계에서 처리해 카드 클릭(선택) 동작과 겹치지 않게 함
  document.addEventListener("click", function (ev) {
    var b = ev.target.closest && ev.target.closest("[data-edit-req]");
    if (!b) return;
    ev.preventDefault();
    ev.stopPropagation();
    var q = new URLSearchParams();
    if (b.dataset.type) q.set("type", b.dataset.type);
    if (b.dataset.event) q.set("event", b.dataset.event);
    q.set("from", location.pathname.split("/").pop() || "index.html");
    location.href = "request.html?" + q.toString();
  }, true);
})();
