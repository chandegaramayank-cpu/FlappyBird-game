let gameRunning = false;

const img = document.querySelector("img");

document.addEventListener("keydown", (e) => {
  let left = img.offsetLeft;
  let top = img.offsetTop;

  // if (e.code === "ArrowRight") {
  //   img.style.left = left + 10 + "px";
  //   img.style.transform = "rotateY(0deg)";
  // } else if (e.code === "ArrowLeft") {
  //   img.style.left = left - 10 + "px";
  //   img.style.transform = "rotateY(180deg)";
  // } else if (e.code === "ArrowUp") {
  //   img.style.top = top - 10 + "px";
  // } else if (e.code === "ArrowDown") {
  //   img.style.top = top + 10 + "px";
  // } else if (e.code === "Space") {
  //   img.style.animation = "jump 0.5s ease";

  //   setTimeout(() => {
  //     img.style.animation = "";
  //   }, 500);
  // }
});

const ground = document.querySelector(".ground");
let x = 0;
function moveGround() {
  if (!gameRunning) return;
  x -= 5;
  ground.style.backgroundPosition = `${x}px`; //mathod.1
  //ground.style.backgroundPosition = x + "px 0px";  //mathod.2

  requestAnimationFrame(moveGround);
}
// moveGround();

const bird = document.querySelector(".bird");

let y = 200;
let velocity = 0;



const plysoarr = ["./sounds/dry-fart.mp3","./sounds/vine-boom.mp3"]
const gamePlaysound = new Audio(plysoarr[Math.floor(Math.random()*plysoarr.length)])
function birdFall() {
  if (!gameRunning) return; //Sabse pehle code check karta hai ki "gameRunning (variable)" true hai ya nahi. Agar game khatam ho chuka hai ya paused hai, toh "return" ho jata hai, yani aage ka code nahi chalta.
  // gravity
  velocity += 0.5;
  y += velocity;

  bird.style.top = y + "px";
  
  checkCollision();

  requestAnimationFrame(birdFall);
}

document.addEventListener("keydown", (e) => {
  if (e.code === "Space" && gameRunning) {
    gamePlaysound.currentTime = 0
    gamePlaysound.play()
    console.log("jumpSound Played")
    velocity = -8;
  }
});
// birdFall();

const btn = document.createElement("button");{


btn.innerText = "Click Me";
btn.style.position = "absolute";
btn.style.borderRadius = "20px";
btn.style.border = "none";
btn.style.height = "100px";
btn.style.width = "200px";
btn.style.top = "45%";
btn.style.left = "45%"; 
}
btn.onclick = () => {
  gameRunning = true;

  moveGround();
  birdFall();
  movePipes()
  btn.style.display = "none";
};

document.body.appendChild(btn);


const gameHeight = window.innerHeight;
const groundHeight = 100; // adjust based on your ground


const topPipe = document.querySelector(".top")
const bottomPipe = document.querySelector(".bottom");

let pipeX =window.innerWidth
let gap = 150;
let minHeight = 80;

function setPipeHeight() {
  let screenHeight = window.innerHeight;

  // subtract ground area (IMPORTANT)
  let usableHeight = screenHeight - 100; // adjust 100 to your ground height

  let maxTop = usableHeight - gap - minHeight;

  let randomTop = Math.random() * maxTop + minHeight;

  let bottomHeight = usableHeight - randomTop - gap;

  topPipe.style.height = randomTop + "px";
  bottomPipe.style.height = bottomHeight + "px";
}

function movePipes() {
  if (!gameRunning) return;

  pipeX -= 5;

  topPipe.style.left = pipeX + "px";
  bottomPipe.style.left = pipeX + "px";

  console.log({top})
  // reset pipe
  if (pipeX < -60) {
    pipeX = window.innerWidth + 80;
    setPipeHeight(); // new random gap
   }

  requestAnimationFrame(movePipes);
}

// start once
setPipeHeight();






function checkCollision() {
  let screenHeight = window.innerHeight;
  let birdHeight = bird.clientHeight;

  // TOP collision
  if (y <= 0) {
    restartGame();
  }

  //bottom collision
  if (y >= screenHeight - birdHeight) {
    restartGame();
  }

  
}
checkCollision();

//game over function && sound arr

const soarr = ["./sounds/faaa0_6.mp3","./sounds/flappychicken-screaming.mp3"]
const gameOversound = new Audio(soarr[Math.floor(Math.random()*soarr.length)])
function restartGame() {
  gameRunning = false;

  gameOversound.play()
  console.log("GameOver Sound Played")
  
  setTimeout(()=>{
    location.reload();
  },soarr.length*1000)
  
}
