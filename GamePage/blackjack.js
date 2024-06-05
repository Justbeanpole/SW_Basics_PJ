let dId;
const plyr = document.getElementsByClassName('player');
const delr = document.getElementsByClassName('dealer');
const card = document.getElementsByClassName('Card');
const pCard = document.getElementsByClassName('playerCard');
const dCard = document.getElementsByClassName('dealerCard');
const pbCard = document.getElementsByClassName('playerback');
const dbCard = document.getElementsByClassName('dealerback');
const hitBtn = document.getElementById('hit');
const stdBtn = document.getElementById('stand');
const cardSec = document.getElementsByClassName('cardSection');
const sc = document.getElementsByClassName('score');
const vts = document.getElementById('victory');
const dts = document.getElementById('defeat');
const bsts = document.getElementById('bustMsg');
const tts = document.getElementById('tie');
let dealerVal = [];
let playerVal = [];
//DECK 생성 함수
const createDeck = async () => {
    let response = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6');
    let data = await response.json();
    dId = data.deck_id;
    console.log(dId);
}
//플레이어인지 딜러인지
let convertWho = (who) => {
    if (who == "dealer") {
        return 0;
    }
    else {
        return 1;
    }
}
const madeDiv = (who) => {
    if (who == "dealer") {
        // 새로운 div 요소를 생성합니다.
        let newDiv = document.createElement("div");
        newDiv.className = "Card dealerCard";

        // front div를 생성하고 내용물을 추가합니다.
        let frontDiv = document.createElement("div");
        frontDiv.className = "front";


        // back div를 생성하고 내용물을 추가합니다.
        let backDiv = document.createElement("div");
        backDiv.className = "dealerback";


        // front와 back div를 newDiv에 추가합니다.
        newDiv.appendChild(frontDiv);
        newDiv.appendChild(backDiv);
        sc[0].before(newDiv);
        return backDiv;
    }
    else {
        // 새로운 div 요소를 생성합니다.
        let newDiv = document.createElement("div");
        newDiv.className = "Card playerCard";

        // front div를 생성하고 내용물을 추가합니다.
        let frontDiv = document.createElement("div");
        frontDiv.className = "front";


        // back div를 생성하고 내용물을 추가합니다.
        let backDiv = document.createElement("div");
        backDiv.className = "playerback";


        // front와 back div를 newDiv에 추가합니다.
        newDiv.appendChild(frontDiv);
        newDiv.appendChild(backDiv);
        sc[1].before(newDiv);
        return backDiv;
    }
}
//처음 두장 드로우
const draw = async (num, who) => {
    let k = 0;
    let newDiv;
    let url = `https://deckofcardsapi.com/api/deck/${dId}/draw/?count=${num}`;
    while (k < num) {
        newDiv = await madeDiv(who);
        k++;
    }

    let response = await fetch(url);
    let data = await response.json();
    if (num > 1) {
        if (who == "player") {
            for (let i = 0; i < pbCard.length; i++) {
                pbCard[i].style.backgroundImage = `url(${data.cards[i].image})`;
                playerVal.push(data.cards[i].value);
            }
            sc[1].innerText = `${sum(playerVal)}`
        }
        else {
            for (let i = 0; i < dbCard.length; i++) {
                dbCard[i].style.backgroundImage = `url(${data.cards[i].image})`;
                dealerVal.push(data.cards[i].value);
            }
        }
    }
    else {
        if (who == "player") {
            newDiv.style.backgroundImage = `url(${data.cards[0].image})`;
            playerVal.push(data.cards[0].value);
            sc[1].innerText = `${sum(playerVal)}`;
            let score = sum(playerVal);
            newDiv.parentNode.classList.toggle('rotateCard');
            return score;
        }
        else {
            newDiv.style.backgroundImage = `url(${data.cards[0].image})`;
            dealerVal.push(data.cards[0].value);
            let score = sum(dealerVal);
            newDiv.parentNode.classList.toggle('rotateCard');
            return score;
        }
    }
}
//BUST 함수
const busted = (score, who) => {
    if (score > 21) {
        if (who == "player") {
            //BUSTED
            console.log('P bust');
            card[0].className += ' rotateCard';
            sc[0].innerText = `${sum(dealerVal)}`;
            hitBtn.disabled = "true";
            stdBtn.disabled = "true";
            setTimeout(() => { bustText(who); }, 1000)
            return -1;
        }
        else {
            //BUSTED
            console.log('D bust');
            hitBtn.disabled = "true";
            stdBtn.disabled = "true";
            setTimeout(() => { bustText(who); }, 1000)
            return 1;
        }
    }
    else {
        console.log('NOT BUSTED NOTHING HAPPEND');
    }
}
//결과 출력함수
const matchResult = (winner) => {
    if (winner == 1) {
        setTimeout(() => { vts.style.display = "block"; }, 2500);
        return 1;
    }
    else if (winner == 0) {
        setTimeout(() => { tts.style.display = "block"; }, 2500);
        return 0;
    }
    else if (winner == -1) {
        setTimeout(() => { dts.style.display = "block"; }, 2500);
        return -1;
    }
    else {
        console.log("NOTHING SHOW");
        return 2;
    }
}
//배팅금 계산 함수
const calBet = (num) => {
    const charge = document.getElementById('charge');
    let betTotal = parseInt(chipT.innerText);

    if (num == 1) {
        let calWin = parseInt(mon.innerText) + (betTotal);
        setTimeout(() => {
            charge.innerText = `+${betTotal}`;
            charge.style.color = "#ffcf40";
            charge.style.display = "inline";
            mon.innerText = `${calWin}`;
        }, 2500);
        reGameScreen();
    }
    else if (num == -1) {
        let calLose = parseInt(mon.innerText) - (betTotal);
        setTimeout(() => {
            charge.innerText = `-${betTotal}`;
            charge.style.color = "#f44336";
            charge.style.display = "inline";
            mon.innerText = `${calLose}`
        }, 2500)
        reGameScreen(calLose);
    }
    else if (num == 0) {
        reGameScreen();
    }
    else {
        console.log('NOTHING BET');
    }
}
//HIT 함수
const hit = async (who) => {
    let crtCard = await draw(1, who);
    let bust = await busted(crtCard, who); //pbust -1, dbust 1
    let mat = await matchResult(bust); // win 1, lose -1, draw 0 else 2
    await calBet(mat);
    return crtCard;
}
//승자결정함수
let winD = () => {
    let player = sum(playerVal);
    let dealer = sum(dealerVal);
    if (player <= 21 && dealer <= 21) {
        if (player > dealer) {
            console.log('승리');
            return 1;
        }
        else if (player == dealer) {
            console.log('무승부');
            return 0;
        }
        else {
            console.log('패배');
            return -1;
        }
    }

}
//STAND 함수
const stand = async () => {
    card[0].className += ' rotateCard';
    hitBtn.disabled = "true";
    stdBtn.disabled = "true";
    sc[0].innerText = sum(dealerVal);
    while (sum(dealerVal) <= 16) {
        await new Promise(resolve => setTimeout(resolve, 2000));
        await hit("dealer");
        sc[0].innerText = sum(dealerVal);
    }
    let varWin;
    sc[0].innerText = sum(dealerVal);
    if (sum(dealerVal) <= 21) {
        varWin = winD();
        matchResult(varWin);
        calBet(varWin);
    }
}
//카드 합 계산 함수
let sum = (val) => {
    let total = 0;
    let aceCount = 0;
    val.forEach(el => {
        if (!(['KING', 'QUEEN', 'JACK', 'ACE'].includes(el))) {
            total += parseInt(el);
        }
        else if (['KING', 'QUEEN', 'JACK'].includes(el)) {
            total += 10;
        }
        else {
            total += 11;
            aceCount += 1;
        }
        while (total > 21 && aceCount > 0) {
            aceCount -= 1;
            total -= 10;
        }
    });
    return total;
}
//첫 두장 블랙잭 확인 함수
let CheckBlackjack = () => {
    let pscore = sum(playerVal);
    let dscore = sum(dealerVal);
    if (pscore == 21 && dscore != 21) {
        console.log('승리');
        card[0].className += ' rotateCard';
        sc[0].innerText = `${sum(dealerVal)}`;
        return 1;
    }
    else if (pscore == dscore && pscore == 21) {
        card[0].className += ' rotateCard';
        console.log('무승부');
        return 0;
    }
    else if (dscore == 21 && pscore != 21) {
        card[0].className += ' rotateCard';
        sc[0].innerText = `${sum(dealerVal)}`;
        console.log('패배');
        return -1;
    }
    else {
    }
}
const rotCard = (num) => {
    if (num < 2) {
        for (let i = 0; i < card.length; i++) {
            card[i].className += ' rotateCard';
        }
    }
    else {
        for (let i = 1; i < card.length; i++) {
            card[i].classList.toggle('rotateCard');
        }
    }
}

//GAMEPLAY 함수
let gamePlay = async () => {
    await Promise.all([draw(2, "dealer"), draw(2, "player")]);
    let cbj = await CheckBlackjack();
    console.log(cbj);
    await rotCard(cbj);
    setTimeout(() => {
        console.log("playerTurn")
        document.getElementById('hit').disabled = "";
        document.getElementById('stand').disabled = "";
    }, 2000);
    sc[0].style.display = "inline";
    sc[1].style.display = "inline";
    let mat = matchResult(cbj);
    calBet(mat);
}
//BUST TEXT 출력 함수
const bustText = (who) => {
    if (who == "dealer") {
        bsts.style.top = '190px'
        bsts.style.display = "block";
    }
    else {
        bsts.style.top = '510px';
        bsts.style.display = "block";
    }

}
const reGameScreen = (cal) => {
    const contNum = document.getElementById('countNum');
    const scText = document.getElementById('screenText');
    const rgscreen = document.getElementById('reGameScreen');
    if (cal <= 0) {
        scText.innerHTML = "<div id ='screenText'>소지금을 다 잃으셨습니다. <br> 더 이상 배팅금이 없으므로 첫 화면으로 돌아갑니다. </div>"
        setTimeout(() => { rgscreen.style.display = 'flex'; }, 5000)
        setTimeout(() => { contNum.innerText = '4'; }, 6000);
        setTimeout(() => { contNum.innerText = '3'; }, 7000);
        setTimeout(() => { contNum.innerText = '2'; }, 8000);
        setTimeout(() => { contNum.innerText = '1'; }, 9000);
        setTimeout(() => {
            contNum.innerText = '0';
            document.getElementById('reGameScreen').style.display = 'none';
            location.href = "../FirstPage/firstPage.html";
            contNum.innerText = '5';
        }, 9500);
    }
    else {
        scText.innerText = "게임을 재시작합니다."
        setTimeout(() => { rgscreen.style.display = 'flex'; }, 5000)
        setTimeout(() => { contNum.innerText = '4'; }, 6000);
        setTimeout(() => { contNum.innerText = '3'; }, 7000);
        setTimeout(() => { contNum.innerText = '2'; }, 8000);
        setTimeout(() => { contNum.innerText = '1'; }, 9000);
        setTimeout(() => { restartGame(); }, 9500);
        setTimeout(() => {
            document.getElementById('reGameScreen').style.display = 'none';
            contNum.innerText = '5';
        }, 9500)
    }
}
//재시작 함수
const restartGame = async () => {
    // 카드 이미지 초기화
    for (let i = card.length - 1; i >= 0; i--) {
        card[i].remove();
    }
    sc[0].style.display = "none";
    sc[1].style.display = "none";
    charge.style.display = "none";

    // 딜러와 플레이어의 카드 값 초기화
    dealerVal = [];
    playerVal = [];
    // 딜러와 플레이어 점수 초기화
    sc[0].innerText = '00';
    sc[1].innerText = '00';
    // 배팅 칩 초기화
    for (let i = 0; i <= 2; i++) {
        chip[i].style.display = 'none';
        bct[i].innerText = '1';
    }
    btnAll.style.display = 'none';
    chipT.innerText = '0000';
    // 게임 상태 초기화
    vts.style.display = 'none';
    dts.style.display = 'none';
    tts.style.display = 'none';
    bsts.style.display = 'none';
    // "게임 시작" 화면으로 변경
    document.getElementById('betAct').style.display = 'flex';
    document.getElementById('gameAct').style.display = 'none';
    document.getElementById('chipGuide').style.opacity = '100%';
    document.getElementById('resetGuide').style.opacity = '100%';
    document.getElementById('playGuide').style.opacity = '100%';
    document.getElementById('hitGuide').style.opacity = '0%';
    document.getElementById('standGuide').style.opacity = '0%';
}

//DECK 생성
createDeck();
//PLAY버튼 이벤트
play.addEventListener('click', () => {
    if (chipT.innerText != "0000") { guideEdit(); gamePlay(); }
});
//HIT, STAND 이벤트
hitBtn.addEventListener('click', () => { hit("player"); });
stdBtn.addEventListener('click', () => { stand(); });



