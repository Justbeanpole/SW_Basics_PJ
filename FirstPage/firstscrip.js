const btl = document.getElementById('leftbutton');
const btr = document.getElementById('rightbutton');
const gm = document.getElementById('playbutton');
const cash = document.getElementById('num');
const btnShare = document.getElementById('share');
const btnFavorite = document.getElementById('favorite');
let seed = Number(cash.innerText);
const btnleft = ()=>{
    if (seed >= 2000 && seed < 10000) {
        seed += 500;
        cash.innerText = `${seed}`;
    }
    else {
        //message출력 최대 10000임
    }
}
const btnright = () => {
    if (seed > 2000 && seed <= 10000) {
        seed -= 500;
        cash.innerText = `${seed}`;
    }
    else {
        //message출력 최대 10000임
    }
}
function clip(){
    var url = '';
    var textarea = document.createElement("textarea");
    document.body.appendChild(textarea);
    url = 'https://github.com/Justbeanpole/SW_Basics_PJ.git';
    textarea.value = url;
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    alert("GIT링크가 복사되었습니다.")
 };

btr.addEventListener('click', btnleft);
btl.addEventListener('click', btnright);
gm.addEventListener('click', ()=>{
    sessionStorage.setItem('money', cash.innerText);
    location.href = '../GamePage/game.html';
})
btnShare.addEventListener('click', clip)
btnFavorite.addEventListener('click', () =>{
    alert('감사합니다!');
})