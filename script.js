// ===============================
// PREMIUM BIRTHDAY WEBSITE JS
// ===============================


// ===============================
// SCROLL REVEAL
// ===============================

const reveals = document.querySelectorAll(".reveal");


const observer = new IntersectionObserver(
(entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

},
{
threshold:0.15
}
);



reveals.forEach(item=>{

observer.observe(item);

});





// ===============================
// SOUND TOGGLE
// ===============================

const soundToggle = document.getElementById("soundToggle");
const soundIcon = soundToggle.querySelector(".sound-icon");
const soundText = soundToggle.querySelector(".sound-text");
const music = document.getElementById("birthdayMusic");

let soundEnabled = true;
let playbackStarted = false;

function updateToggleUI(enabled) {
    soundToggle.classList.toggle("muted", !enabled);
    soundIcon.textContent = enabled ? "🔊" : "🔈";
    soundText.textContent = enabled ? "Sound On" : "Sound Off";
}

function startMusicPlayback(force = false) {
    if (!soundEnabled) return;
    if (playbackStarted && !force) return;

    playbackStarted = true;
    music.muted = false;
    music.volume = 1;
    music.currentTime = 0;

    const playPromise = music.play();

    if (playPromise && typeof playPromise.then === "function") {
        playPromise.then(() => {
            updateToggleUI(true);
        }).catch(() => {
            playbackStarted = false;
        });
    }
}

function setSoundState(enabled) {
    soundEnabled = enabled;
    updateToggleUI(enabled);

    if (!enabled) {
        playbackStarted = false;
        music.pause();
        music.currentTime = 0;
        music.muted = true;
    } else {
        if (music.readyState >= 2) {
            startMusicPlayback();
        } else {
            music.load();
            music.addEventListener("canplaythrough", startMusicPlayback, { once: true });
            music.addEventListener("loadeddata", startMusicPlayback, { once: true });
        }
    }
}

function startMusicAutomatically() {
    if (!soundEnabled) return;

    if (music.readyState >= 2) {
        startMusicPlayback();
    } else {
        music.load();
        music.addEventListener("canplaythrough", startMusicPlayback, { once: true });
        music.addEventListener("loadeddata", startMusicPlayback, { once: true });
    }
}

window.addEventListener("load", startMusicAutomatically);
document.addEventListener("DOMContentLoaded", startMusicAutomatically);
window.addEventListener("pointerdown", () => startMusicPlayback(true), { once: true });
window.addEventListener("keydown", () => startMusicPlayback(true), { once: true });
window.addEventListener("touchstart", () => startMusicPlayback(true), { once: true });
soundToggle.addEventListener("click", () => {
    setSoundState(!soundEnabled);
});


// ===============================
// SMOOTH HERO BUTTON
// ===============================


const openBtn =
document.getElementById("openBtn");


openBtn.addEventListener("click",()=>{


window.scrollTo({

top:
window.innerHeight,

behavior:"smooth"

});


});






// ===============================
// CUSTOM CURSOR
// DESKTOP ONLY
// ===============================


const cursor =
document.querySelector(".cursor");

const glow =
document.querySelector(".cursor-glow");



if(
window.matchMedia("(pointer:fine)").matches
){


document.addEventListener(
"mousemove",
(e)=>{


cursor.style.left =
e.clientX+"px";


cursor.style.top =
e.clientY+"px";


glow.style.left =
e.clientX+"px";


glow.style.top =
e.clientY+"px";


});


}




// ===============================
// MOUSE GLOW EFFECT
// ===============================


document.querySelectorAll(
"button,.photo-card"
)
.forEach(element=>{


element.addEventListener(
"mouseenter",
()=>{

element.style.transform =
"translateY(-4px)";

});


element.addEventListener(
"mouseleave",
()=>{

element.style.transform =
"";

});


});






// ===============================
// FLOATING PARTICLES
// ===============================


const particleContainer =
document.querySelector(".particles");



function createParticle(){


const particle =
document.createElement("span");


particle.className =
"particle";


particle.style.left =
Math.random()*100+"vw";


particle.style.animationDuration =
(5+Math.random()*8)+"s";


particle.style.opacity =
Math.random();


particleContainer.appendChild(
particle
);



setTimeout(()=>{

particle.remove();

},12000);


}



setInterval(
createParticle,
500
);






// ===============================
// FINAL SURPRISE
// ===============================


const surpriseBtn =
document.getElementById(
"surpriseBtn"
);


const popup =
document.querySelector(
".popup"
);


const closeBtn =
document.querySelector(
".close"
);




surpriseBtn.addEventListener(
"click",
()=>{


popup.classList.add(
"active"
);



if (soundEnabled) {
    music.currentTime = 0;
    music.play().catch(() => {});
}



createConfetti();



});




closeBtn.addEventListener(
"click",
()=>{


popup.classList.remove(
"active"
);


});






// ===============================
// CONFETTI EFFECT
// ===============================


function createConfetti(){


for(
let i=0;
i<80;
i++
){


const confetti =
document.createElement(
"div"
);



confetti.className =
"confetti";



confetti.style.left =
Math.random()*100+"vw";


confetti.style.animationDelay =
Math.random()*2+"s";


confetti.style.transform =
`
rotate(
${Math.random()*360}deg
)
`;



document.body.appendChild(
confetti
);



setTimeout(()=>{

confetti.remove();

},4000);



}



}





// ===============================
// PARALLAX LIGHT EFFECT
// ===============================


const heroBg =
document.querySelector(
".hero-bg"
);



window.addEventListener(
"scroll",
()=>{


const offset =
window.scrollY;


heroBg.style.transform =
`
translateY(
${offset*0.15}px
)
scale(1.1)
`;


});





// ===============================
// ADDITIONAL CSS ELEMENTS
// ===============================


const extraStyle =
document.createElement(
"style"
);



extraStyle.innerHTML = `


.particle{

position:fixed;

bottom:-20px;

width:6px;

height:6px;

border-radius:50%;

background:
rgba(255,255,255,.8);

animation:
rise linear forwards;

pointer-events:none;

z-index:1;

}


@keyframes rise{


from{

transform:
translateY(0)
scale(1);

}


to{

transform:
translateY(-120vh)
scale(0);

}


}



.confetti{


position:fixed;

top:-20px;

width:10px;

height:18px;

background:
linear-gradient(
135deg,
#f5b7c8,
#d8c8ff
);


z-index:9999;

animation:
fall 4s linear forwards;


}



@keyframes fall{


to{

transform:
translateY(110vh)
rotate(720deg);


}


}


`;


document.head.appendChild(
extraStyle
);






// ===============================
// ACCESSIBILITY
// ===============================


document.addEventListener(
"keydown",
(e)=>{


if(e.key==="Escape"){

popup.classList.remove(
"active"
);

}


});