
let playing=false;
let currentSong=0;
let random=false;
let repeat=false;
let seg=0;
let timeoutId=0;
const list = [
    {
        id: 0,
        author: "C.Tangana",
        title: "Me Maten",
        cover: "tangana_cover.png",
        duration: 10
    },
    {
        id: 1,
        author: "Rosalía",
        title: "Despechá",
        cover: "rosalia_cover.png",
        duration: 5
    },
    {
        id: 2,
        author: "Shakira",
        title: "Te felicito",
        cover: "shakira_cover.png",
        duration: 8
    },
    {
        id: 3,
        author: "Quevedo",
        title: "Quédate",
        cover: "quevedo_cover.png",
        duration: 12
    },
    {
        id: 4,
        author: "Bad Bunny",
        title: "Tití me preguntó",
        cover: "bad_cover.png",
        duration: 20
    }
];

const getMinutes = (s) => {
    const minutes = (Math.floor(s / 60) < 10) ? '0' + Math.floor(s / 60) : Math.floor(s / 60);
    const seconds = (Math.floor(s % 60) < 10) ? '0' + Math.floor(s % 60) : Math.floor(s % 60);
    return minutes + ':' + seconds;
}

window.onload = function(){
    loadData(0);
}

function activeRandom(){
    random=!random;
    if(random){
        changeClass('.fa-shuffle','gray','black');
    }else{
        changeClass('.fa-shuffle','black','gray');
    }
}

function activeRepeat(){
    repeat=!repeat;
    if(repeat){
        changeClass('.fa-rotate-right','gray','black');
    }else{
        changeClass('.fa-rotate-right','black','gray');
    }
}

function iniciarContador(){
   timeoutId = setInterval(actualizarSeg, 1000);
}
function pausarContador(){
    clearTimeout(timeoutId);
}

function actualizarSeg(){
    let actualSeconds=document.querySelector('.actualSeconds');
    if(actualSeconds.textContent==='00:00'){
        seg=1;
        actualSeconds.textContent=getMinutes(seg);
    }else{
        if(seg!==list[currentSong].duration){
            seg++;
            actualSeconds.textContent=getMinutes(seg);
        }else{
            changeSong(1);
            seg=0;
        }
    }
    let blackBar=document.querySelector('.progressBar--black');
    let percentage=((seg/list[currentSong].duration)*100);
    blackBar.style.width=percentage+'%';
}

function changeClass(classSearch, actualClass, newClass){
    let element=document.querySelector(classSearch);
    element.classList.replace(actualClass,newClass);
}

function changeSong(value){
    if (repeat) {
        loadData(currentSong);
    } else {
        if (random) {
            getRandomSong();
        } else {
            if(value===1){
                currentSong=currentSong===list.length-1 ? 0 : currentSong+value;
            }else{
                currentSong=currentSong===0 ? list.length-1 : currentSong+value;
            }
        }
    }

    loadData();
}

function play(){
    playing=!playing;
    if(playing){
        changeClass('.fa-play','fa-play','fa-pause');
        iniciarContador();
    }else{
        changeClass('.fa-pause','fa-pause','fa-play');
        pausarContador();
    }
}

function getRandomSong(){
    let valor=0;
    do {
        valor=Math.floor(Math.random() * list.length);
    } while (valor===currentSong);
    currentSong=valor;
}


function loadData(){
    let cover=document.querySelector('.card__cover');
    cover.src='assets/'+list[currentSong].cover;
    let title=document.querySelector('.title');
    title.textContent=list[currentSong].title;
    let author=document.querySelector('.author');
    author.textContent=list[currentSong].author;
    let actualSeconds=document.querySelector('.actualSeconds');
    actualSeconds.textContent=getMinutes(0);
    let maxDuration=document.querySelector('.maxDuration');
    maxDuration.textContent=getMinutes(list[currentSong].duration);
}
