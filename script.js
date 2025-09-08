// Ambil canvas
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");

// Sesuaikan ukuran canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Buat partikel konfeti
const confettiCount = 200;
const confetti = [];

for (let i = 0; i < confettiCount; i++) {
  confetti.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height - canvas.height,
    r: Math.random() * 6 + 4, // ukuran
    d: Math.random() * confettiCount, // kepadatan
    color:
      "hsl(" + Math.random() * 360 + ", 100%, 50%)", // warna random
    tilt: Math.floor(Math.random() * 10) - 10,
  });
}

// Fungsi gambar konfeti
function drawConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  confetti.forEach((c) => {
    ctx.beginPath();
    ctx.fillStyle = c.color;
    ctx.fillRect(c.x, c.y, c.r, c.r);
    ctx.fill();
  });

  updateConfetti();
}

// Update posisi konfeti
function updateConfetti() {
  confetti.forEach((c) => {
    c.y += Math.cos(c.d) + 1 + c.r / 2;
    c.x += Math.sin(c.d);

    if (c.y > canvas.height) {
      c.y = -10;
      c.x = Math.random() * canvas.width;
    }
  });
}

// Jalankan animasi
setInterval(drawConfetti, 20);

// Supaya canvas tetap full screen saat resize
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
