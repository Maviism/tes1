document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById('falling-stars');
  const ctx = canvas.getContext('2d');

  let comets = [];
  let twinklingStars = [];

  const cometCount = 10;     // jumlah komet
  const starCount = 150;     // jumlah bintang

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initComets();             // reset posisi komet saat resize
    initTwinklingStars();     // reset posisi bintang
  }

  window.addEventListener('resize', resizeCanvas); // 👈 TAMBAHAN INI
  resizeCanvas(); // panggil pertama kali juga

  function initComets() {
    comets = [];
    for (let i = 0; i < cometCount; i++) {
      const dx = Math.random() * 1 + 1;
      const dy = Math.random() * 1 + 1;
      comets.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height * 0.5,
        dx: dx,
        dy: dy,
        tailLength: Math.random() * 50 + 50,
        size: Math.random() * 2 + 3
      });
    }
  }

  function initTwinklingStars() {
    twinklingStars = [];
    for (let i = 0; i < starCount; i++) {
      twinklingStars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5 + 0.5,
        phase: Math.random() * 2 * Math.PI,
        twinkleSpeed: Math.random() * 0.005 + 0.002
      });
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const currentTime = Date.now();

    twinklingStars.forEach(star => {
      const brightness = 0.3 + 0.7 * (Math.sin(star.phase + currentTime * star.twinkleSpeed) + 1) / 2;
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${brightness.toFixed(2)})`;
      ctx.fill();
    });

    comets.forEach(comet => {
      comet.x += comet.dx;
      comet.y += comet.dy;

      if (comet.x > canvas.width || comet.y > canvas.height) {
        comet.x = -comet.tailLength;
        comet.y = Math.random() * canvas.height * 0.5;
      }

      const speed = Math.sqrt(comet.dx * comet.dx + comet.dy * comet.dy);
      const ux = comet.dx / speed;
      const uy = comet.dy / speed;

      const tailX = comet.x - ux * comet.tailLength;
      const tailY = comet.y - uy * comet.tailLength;

      const gradient = ctx.createLinearGradient(tailX, tailY, comet.x, comet.y);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0.8)');

      ctx.strokeStyle = gradient;
      ctx.lineWidth = comet.size;
      ctx.beginPath();
      ctx.moveTo(tailX, tailY);
      ctx.lineTo(comet.x, comet.y);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(comet.x, comet.y, comet.size, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 1)';
      ctx.fill();
    });

    requestAnimationFrame(animate);
  }

  animate();
});
