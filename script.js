// ====== Personalize name via URL ?to=Name ======
const params = new URLSearchParams(location.search);
const to = params.get('to');
if(to){
  document.getElementById('toName').textContent = decodeURIComponent(to);
  document.title = `Happy Birthday, ${decodeURIComponent(to)} 🎂`;
}

// ====== Confetti ======
const canvas = document.getElementById('confetti');
const ctx = canvas.getContext('2d');
let W,H, pieces=[];
function resize(){
  W = canvas.width = innerWidth;
  H = canvas.height = innerHeight;
}
addEventListener('resize', resize); resize();

function spawnConfetti(n=180){
  for(let i=0;i<n;i++){
    pieces.push({
      x: Math.random()*W,
      y: -20 - Math.random()*H,
      w: 6+Math.random()*6,
      h: 8+Math.random()*10,
      vy: 1+Math.random()*3.5,
      vx: -1+Math.random()*2,
      rot: Math.random()*Math.PI,
      vr: (-0.1+Math.random()*0.2),
      color: `hsl(${Math.random()*360}, 90%, 60%)`
    });
  }
}

function tick(){
  ctx.clearRect(0,0,W,H);
  for(const p of pieces){
    p.x += p.vx;
    p.y += p.vy;
    p.rot += p.vr;
    if(p.y > H+30) {
      p.y = -20; p.x = Math.random()*W;
    }
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot);
    ctx.fillStyle = p.color;
    ctx.fillRect(-p.w/2, -p.h/2, p.w, p.h);
    ctx.restore();
  }
  requestAnimationFrame(tick);
}
tick();

// ====== Balloons ======
const balloonWrap = document.querySelector('.balloons');
const colors = ['#ff8da1','#ffd166','#95e1d3','#a29bfe','#ff9bd2','#8fd3fe'];
function addBalloon(){
  const b = document.createElement('div');
  b.className = 'balloon';
  const c = colors[Math.floor(Math.random()*colors.length)];
  b.style.setProperty('--c', c);
  b.style.left = Math.random()*100 + 'vw';
  b.style.setProperty('--d', (12 + Math.random()*10) + 's');
  b.style.animationDelay = (-Math.random()*12)+'s';
  balloonWrap.appendChild(b);
  setTimeout(()=> b.remove(), 16000);
}
setInterval(addBalloon, 700);
for(let i=0;i<12;i++) addBalloon();

// ====== Controls ======
const song = document.getElementById('song');
const openBtn = document.getElementById('openBtn');
const confettiBtn = document.getElementById('confettiBtn');

openBtn.addEventListener('click', async () => {
  try { await song.play(); } catch(e){ }
  spawnConfetti(220);
  document.body.animate([{filter:'brightness(1.2)'},{filter:'brightness(1)'}],{duration:600, easing:'ease-out'});
});

confettiBtn.addEventListener('click', () => spawnConfetti(160));

song.addEventListener('play', () => document.body.classList.add('playing'));
song.addEventListener('pause', () => document.body.classList.remove('playing'));
