const mbtn = document.getElementById('guide');
const modal = document.getElementById("beforeModal");
const off = document.getElementById('off');

//모달 열기
mbtn.addEventListener('click', ()=>{
  modal.style.display = "flex";
})

//모달 닫기
window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
}

off.addEventListener('click', ()=>{
  location.href = '../FirstPage/index.html'
})
