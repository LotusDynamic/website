// Starfield background
const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');
let stars = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  stars = Array.from({ length: 180 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 1.5,
    alpha: Math.random(),
    speed: 0.2 + Math.random() * 0.3
  }));
}

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  stars.forEach(star => {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${star.alpha})`;
    ctx.fill();

    // Twinkle
    star.alpha += (Math.random() - 0.5) * 0.05;
    star.alpha = Math.max(0.1, Math.min(1, star.alpha));

    // Drift
    star.y += star.speed;
    if (star.y > canvas.height) {
      star.y = 0;
      star.x = Math.random() * canvas.width;
    }
  });
  requestAnimationFrame(drawStars);
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();
drawStars();

// Blog modal logic
const modal = document.getElementById('blogModal');
const modalTitle = document.getElementById('blogModalTitle');
const modalBody = modal.querySelector('.blog-modal-body');
const closeBtn = modal.querySelector('.blog-modal-close');
const backdrop = modal.querySelector('.blog-modal-backdrop');

// Open modal when "Read more" is clicked
document.querySelectorAll('.blog-open').forEach(button => {
  button.addEventListener('click', () => {
    const card = button.closest('.blog-card');
    const title = card.dataset.title || card.querySelector('h3').textContent;
    const content = card.querySelector('.blog-full-content').innerHTML;

    modalTitle.textContent = title;
    modalBody.innerHTML = content;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
  });
});

// Close modal
function closeModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  modalTitle.textContent = '';
  modalBody.innerHTML = '';
}

closeBtn.addEventListener('click', closeModal);
backdrop.addEventListener('click', closeModal);

// Close with Escape key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && modal.classList.contains('open')) {
    closeModal();
  }
});
