const btl = document.getElementById('leftbutton');
const btr = document.getElementById('rightbutton');
const gm = document.getElementById('playbutton');
const cash = document.getElementById('num');
const btnShare = document.getElementById('share');
const btnFavorite = document.getElementById('favorite');
const heart = document.querySelector('.heart');
const altMsg = document.querySelector('.alertMsg');
let seed = Number(cash.innerText);
const btnleft = () => {
    if (seed >= 2000 && seed < 10000) {
        seed += 500;
        cash.innerText = `${seed}`;
    }
    else {
        prtMsg();
    }
}
const btnright = () => {
    if (seed > 2000 && seed <= 10000) {
        seed -= 500;
        cash.innerText = `${seed}`;
    }
    else {
        prtMsg();
    }
}
const prtMsg = () => {
    altMsg.style.display = "block"
    altMsg.classList.add('alertMsgAct');
    setTimeout(()=>{
        altMsg.classList.remove('alertMsgAct');
        altMsg.style.display = "none"
    },1050);
}

const clip = () => {
    let url = 'https://github.com/Justbeanpole/SW_Basics_PJ.git';
    let textarea = document.createElement("textarea");
    document.body.appendChild(textarea);
    textarea.value = url;
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    alert("GIT주소가 복사되었습니다.")
};

btr.addEventListener('click', btnleft);
btl.addEventListener('click', btnright);
gm.addEventListener('click', () => {
    sessionStorage.setItem('money', cash.innerText);
    location.href = '../GamePage/game.html';
})
btnShare.addEventListener('click', clip)
btnFavorite.addEventListener('click', () => {
    heart.classList.add('purse');
    setTimeout(() => {
        heart.classList.remove('purse');
    }, 1000);
})