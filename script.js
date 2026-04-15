const blogStrip = document.querySelector('.blog-strip');
let blogAutoSlideId = null;
let blogScrollWidth = 0;
const blogScrollSpeed = 1.2;

// Touch support
let isTouching = false;
let touchStartX = 0;
let touchScrollLeft = 0;

const initializeInfiniteBlogLoop = () => {
  if (!blogStrip || blogStrip.dataset.initialized === 'true') return;

  const cards = Array.from(blogStrip.querySelectorAll('.blog-card'));
  cards.forEach((card) => {
    const clone = card.cloneNode(true);
    blogStrip.appendChild(clone);
  });

  blogScrollWidth = blogStrip.scrollWidth / 2;
  blogStrip.scrollLeft = 0;
  blogStrip.dataset.initialized = 'true';
};

const stepBlogScroll = () => {
  if (!blogStrip || !blogScrollWidth || isTouching) {
    blogAutoSlideId = requestAnimationFrame(stepBlogScroll);
    return;
  }

  blogStrip.scrollLeft += blogScrollSpeed;
  if (blogStrip.scrollLeft >= blogScrollWidth) {
    blogStrip.scrollLeft -= blogScrollWidth;
  }

  blogAutoSlideId = requestAnimationFrame(stepBlogScroll);
};

const startBlogAutoSlide = () => {
  initializeInfiniteBlogLoop();
  if (blogAutoSlideId === null) {
    blogAutoSlideId = requestAnimationFrame(stepBlogScroll);
  }
};

const stopBlogAutoSlide = () => {
  if (blogAutoSlideId !== null) {
    cancelAnimationFrame(blogAutoSlideId);
    blogAutoSlideId = null;
  }
};

// Hover pause (desktop)
blogStrip.addEventListener('mouseenter', stopBlogAutoSlide);
blogStrip.addEventListener('mouseleave', startBlogAutoSlide);

// Touch drag (mobile)
blogStrip.addEventListener('touchstart', (e) => {
  isTouching = true;
  stopBlogAutoSlide();
  touchStartX = e.touches[0].pageX;
  touchScrollLeft = blogStrip.scrollLeft;
});

blogStrip.addEventListener('touchmove', (e) => {
  if (!isTouching) return;
  const dx = e.touches[0].pageX - touchStartX;
  blogStrip.scrollLeft = touchScrollLeft - dx;
});

blogStrip.addEventListener('touchend', () => {
  isTouching = false;
  startBlogAutoSlide();
});

// Start immediately
startBlogAutoSlide();
