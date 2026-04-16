// Select the carousel strip
const blogStrip = document.querySelector('.blog-strip');
let blogAutoSlideId = null;
let blogScrollWidth = 0;
const blogScrollSpeed = 1.2;

// Touch support
let isTouching = false;
let touchStartX = 0;
let touchScrollLeft = 0;

// Initialize the infinite loop
const initializeInfiniteBlogLoop = () => {
	if (!blogStrip || blogStrip.dataset.initialized === 'true') return;

	const cards = Array.from(blogStrip.querySelectorAll('.blog-card'));
	// Clone all cards once to create seamless loop
	cards.forEach((card) => {
		const clone = card.cloneNode(true);
		blogStrip.appendChild(clone);
	});

	// Half the scroll width is the length of one set of cards
	blogScrollWidth = blogStrip.scrollWidth / 2;
	blogStrip.scrollLeft = 0;
	blogStrip.dataset.initialized = 'true';
};

// Step the scroll forward
const stepBlogScroll = () => {
	if (!blogStrip || !blogScrollWidth || isTouching) {
		blogAutoSlideId = requestAnimationFrame(stepBlogScroll);
		return;
	}

	blogStrip.scrollLeft += blogScrollSpeed;

	// Reset when reaching the end of the first set
	if (blogStrip.scrollLeft >= blogScrollWidth) {
		blogStrip.scrollLeft = 0;
	}

	blogAutoSlideId = requestAnimationFrame(stepBlogScroll);
};

// Start auto sliding
const startBlogAutoSlide = () => {
	initializeInfiniteBlogLoop();
	if (blogAutoSlideId === null) {
		blogAutoSlideId = requestAnimationFrame(stepBlogScroll);
	}
};

// Stop auto sliding
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

	// Wrap around if dragged beyond bounds
	if (blogStrip.scrollLeft < 0) {
		blogStrip.scrollLeft += blogScrollWidth;
	} else if (blogStrip.scrollLeft >= blogScrollWidth) {
		blogStrip.scrollLeft -= blogScrollWidth;
	}
});

blogStrip.addEventListener('touchend', () => {
	isTouching = false;
	startBlogAutoSlide();
});

// Start immediately after DOM is ready
window.addEventListener('DOMContentLoaded', startBlogAutoSlide);

// document.querySelectorAll('.blog-open').forEach(button => {
//     button.addEventListener('click', () => {
//       const content = button.nextElementSibling;
//       const isOpen = content.classList.toggle('show');
//       button.textContent = isOpen ? 'Read less' : 'Read more';
//     });
//   });