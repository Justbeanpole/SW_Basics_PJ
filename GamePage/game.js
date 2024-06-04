//DOM 가져와 변수 선언

let mon = document.getElementById('money');
let chipT = document.getElementById('chipTotal');
let chip = document.getElementsByClassName('chip');
const chipImg = document.getElementB
const bet1 = document.getElementById('one');
const bet3 = document.getElementById('three');
const bet5 = document.getElementById('five');
const betAll = document.getElementById('all');
const btnAll = document.getElementById('allIn');
const reset = document.getElementById('end');
const play = document.getElementById('start');
let bct = document.getElementsByClassName('betCount');


//칩 배팅 함수
let bet = (num) => {
    let valarr = [100, 300, 500];
    if (btnAll.style.display == "flex" || Number(chipT.innerText) + valarr[num] > Number(mon.innerText)) { }
    else {
        if (chip[num].style.display == "none" || chip[num].style.display == "") {
            chip[num].style.display = "flex";
            chipT.innerText = Number(chipT.innerText) + valarr[num];
        }
        else {
            let intBct = Number(bct[num].innerText) + 1;
            bct[num].innerText = `${intBct}`;
            chipT.innerText = Number(chipT.innerText) + valarr[num];
        }
    }
}
//가이드 수정
let guideEdit = () => {
    document.getElementById('betAct').style.display = "none";
    document.getElementById('gameAct').style.display = "flex";
    document.getElementById('chipGuide').style.opacity = "0%";
    document.getElementById('resetGuide').style.opacity = "0%";
    document.getElementById('playGuide').style.opacity = "0%";
    document.getElementById('hitGuide').style.opacity = "100%";
    document.getElementById('standGuide').style.opacity = "100%";
}


// firstpage에서 seedMoney받아오기
let seedMoney = sessionStorage.getItem('money');
mon.innerText = seedMoney;
//아래 버튼 클릭 시 실행
//100칩
bet1.addEventListener('click', () => {
    bet(0);
});
//300칩
bet3.addEventListener('click', () => {
    bet(1);
});
//500칩
bet5.addEventListener('click', () => {
    bet(2);
})
//올 배팅
betAll.addEventListener('click', () => {
    for (let i = 0; i <= 2; i++) {
        chip[i].style.display = "none";
        bct[i].innerText = "1";
    }
    chipT.innerText = mon.innerText;
    btnAll.style.display = "flex";
})
//배팅 리셋
reset.addEventListener('click', () => {
    for (let i = 0; i <= 2; i++) {
        chip[i].style.display = "none";
        bct[i].innerText = "1";
    }
    btnAll.style.display = "none";
    chipT.innerText = "0000";
})
