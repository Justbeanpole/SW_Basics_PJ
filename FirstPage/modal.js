// 요소 가져오기
var modal = document.getElementById("myModal");
var btn = document.getElementById("openModalBtn");
var span = document.getElementById("close");
var prevBtn = document.getElementsByClassName("prevBtn")[0];
var nextBtn = document.getElementsByClassName("nextBtn")[0];
var pages = document.getElementsByClassName("modal-page");
var currentPage = 0;

// 버튼 클릭 시 모달 열기
btn.onclick = function() {
  modal.style.display = "flex";
  modal.style.justifyContent = 'center';
  modal.style.alignItems = 'center';
  showPage(currentPage);
}

// 닫기 버튼 클릭 시 모달 닫기
span.onclick = function() {
  modal.style.display = "none";
}

// 모달 외부 클릭 시 모달 닫기
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// 이전 버튼 클릭 시 이전 페이지로 이동
prevBtn.onclick = function() {
  if (currentPage > 0) {
    currentPage--;
    showPage(currentPage);
  }
}

// 다음 버튼 클릭 시 다음 페이지로 이동
nextBtn.onclick = function() {
  if (currentPage < pages.length - 1) {
    currentPage++;
    showPage(currentPage);
  }
}

// 현재 페이지 표시 함수
function showPage(page) {
  for (var i = 0; i < pages.length; i++) {
    pages[i].classList.remove("active");
  }
  pages[page].classList.add("active");
}
