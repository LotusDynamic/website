// const { startTransition } = require("react");

const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");


function drawPixels(stars_no) {
	const imageData = ctx.createImageData(canvas.width, canvas.height);
	const stars = [];

	for (let i = 0; i < stars_no; i++) {
		const x = Math.floor(Math.random() * canvas.width);
		const y = Math.floor(Math.random() * canvas.height);
		const color = {
			r: 153 + Math.floor(Math.random() * 102),
			g: 64 + Math.floor(Math.random() * 96),
			b: 39 + Math.floor(Math.random() * 72),
		};
		stars.push({ x, y, color });
	}

	for (const star of stars) {
		addGlow(imageData, star.x, star.y, star.color, 10);
	}

	ctx.putImageData(imageData, 0, 0);
}

// function drawPixels(stars_no) {
// 	const imageData = ctx.createImageData(canvas.width, canvas.height);

// 	// Fill background black
// 	for (let y = 0; y < canvas.height; y++) {
// 		for (let x = 0; x < canvas.width; x++) {
// 			const index = (y * canvas.width + x) * 4;
// 			imageData.data[index] = 0;
// 			imageData.data[index + 1] = 0;
// 			imageData.data[index + 2] = 0;
// 			imageData.data[index + 3] = 255;
// 		}
// 	}

// 	// Draw stars with glow
// 	// for (let i = 0; i < stars_no; i++) {
// 	// 	const x = Math.floor(Math.random() * canvas.width);
// 	// 	const y = Math.floor(Math.random() * canvas.height);

// 	// 	addGlow(imageData, x, y, [255, 255, 255], 5); // white star glow
// 	// }

// 	ctx.putImageData(imageData, 0, 0);
// }

// Glow helper
function addGlow(imageData, px, py, color, radius) {
	const { r, g, b } = color;
	const minX = Math.max(px - radius, 0);
	const maxX = Math.min(px + radius, canvas.width - 1);
	const minY = Math.max(py - radius, 0);
	const maxY = Math.min(py + radius, canvas.height - 1);

	for (let y = minY; y <= maxY; y++) {
		for (let x = minX; x <= maxX; x++) {
			const dx = x - px;
			const dy = y - py;
			const distance = Math.sqrt(dx * dx + dy * dy);
			const fade = Math.max(0, 1 - distance / radius);
			const index = (y * canvas.width + x) * 4;
			imageData.data[index] = Math.min(imageData.data[index] + Math.floor(r * fade), 255);
			imageData.data[index + 1] = Math.min(imageData.data[index + 1] + Math.floor(g * fade), 255);
			imageData.data[index + 2] = Math.min(imageData.data[index + 2] + Math.floor(b * fade), 255);
			imageData.data[index + 3] = 255;
		}
	}
}


// Resize canvas dynamically
function resizeCanvas() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	drawPixels(500);
}

// Initial setup
resizeCanvas();

// Redraw whenever window is resized
window.addEventListener("resize", resizeCanvas);
