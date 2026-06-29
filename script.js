// script.js
'use strict';

// --- Preloader Animation ---
let toRadians = (deg) => deg * Math.PI / 180;
let map = (val, a1, a2, b1, b2) => b1 + (val - a1) * (b2 - b1) / (a2 - a1);

class PizzaLoader {
  constructor(id) {
    this.canvas = document.getElementById(id);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');

    this.sliceCount = 6;
    this.sliceSize = 80;

    this.width = this.height = this.canvas.height = this.canvas.width = this.sliceSize * 2 + 50;
    this.center = this.height / 2 | 0;

    this.sliceDegree = 360 / this.sliceCount;
    this.sliceRadians = toRadians(this.sliceDegree);
    this.progress = 0;
    this.cooldown = 10;
  }

  update() {
    let ctx = this.ctx;
    ctx.clearRect(0, 0, this.width, this.height);

    if (--this.cooldown < 0) this.progress += this.sliceRadians*0.01 + this.progress * 0.07;

    ctx.save();
    ctx.translate(this.center, this.center);
    
    for (let i = this.sliceCount - 1; i > 0; i--) {

      let rad;
      if (i === this.sliceCount - 1) {
        let ii = this.sliceCount - 1;

        rad = this.sliceRadians * i + this.progress;

        ctx.strokeStyle = '#FBC02D';
        cheese(ctx, rad, .9, ii, this.sliceSize, this.sliceDegree);
        cheese(ctx, rad, .6, ii, this.sliceSize, this.sliceDegree);
        cheese(ctx, rad, .5, ii, this.sliceSize, this.sliceDegree);
        cheese(ctx, rad, .3, ii, this.sliceSize, this.sliceDegree);

      } else rad = this.sliceRadians * i;
      
      // border
      ctx.beginPath();
      ctx.lineCap = 'butt';
      ctx.lineWidth = 11;
      ctx.arc(0, 0, this.sliceSize, rad, rad + this.sliceRadians);
      ctx.strokeStyle = '#F57F17';
      ctx.stroke();

      // slice
      let startX = this.sliceSize * Math.cos(rad);
      let startY = this.sliceSize * Math.sin(rad);
      let endX = this.sliceSize * Math.cos(rad + this.sliceRadians);
      let endY = this.sliceSize * Math.sin(rad + this.sliceRadians);
      let varriation = [0.9,0.7,1.1,1.2];
      ctx.fillStyle = '#FBC02D';
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(startX, startY);
      ctx.arc(0, 0, this.sliceSize, rad, rad + this.sliceRadians);
      ctx.lineTo(0, 0);
      ctx.closePath();
      ctx.fill();
      ctx.lineWidth = .3;
      ctx.stroke();

      // meat
      let x = this.sliceSize * .65 * Math.cos(rad + this.sliceRadians / 2);
      let y = this.sliceSize * .65 * Math.sin(rad + this.sliceRadians / 2);
      ctx.beginPath();
      ctx.arc(x, y, this.sliceDegree / 6, 0, 2 * Math.PI);
      ctx.fillStyle = '#D84315';
      ctx.fill();
    }

    ctx.restore();

    if (this.progress > this.sliceRadians) {
      ctx.translate(this.center, this.center);
      ctx.rotate(-this.sliceDegree * Math.PI / 180);
      ctx.translate(-this.center, -this.center);

      this.progress = 0;
      this.cooldown = 20;
    }
  }
}

function cheese(ctx, rad, multi, ii, sliceSize, sliceDegree) {
  let x1 = sliceSize * multi * Math.cos(toRadians(ii * sliceDegree) - .2);
  let y1 = sliceSize * multi * Math.sin(toRadians(ii * sliceDegree) - .2);
  let x2 = sliceSize * multi * Math.cos(rad + .2);
  let y2 = sliceSize * multi * Math.sin(rad + .2);

  let csx = sliceSize * Math.cos(rad);
  let csy = sliceSize * Math.sin(rad);

  var d = Math.sqrt((x1 - csx) * (x1 - csx) + (y1 - csy) * (y1 - csy));
  ctx.beginPath();
  ctx.lineCap = 'round';

  let percentage = map(d, 15, 70, 1.2, 0.2);

  let tx = x1 + (x2 - x1) * percentage;
  let ty = y1 + (y2 - y1) * percentage;
  ctx.moveTo(x1, y1);
  ctx.lineTo(tx, ty);

  tx = x2 + (x1 - x2) * percentage;
  ty = y2 + (y1 - y2) * percentage;
  ctx.moveTo(x2, y2);
  ctx.lineTo(tx, ty);

  ctx.lineWidth = map(d, 0, 100, 20, 2);
  ctx.stroke();
}

let pizzaLoader = new PizzaLoader('pizza');
let preloaderRAF;

function updatePreloader() {
  if (pizzaLoader && pizzaLoader.canvas) {
    pizzaLoader.update();
    preloaderRAF = requestAnimationFrame(updatePreloader);
  }
}
if (pizzaLoader.canvas) {
    updatePreloader();
}

// Hide preloader when everything is loaded, but wait at least 2 seconds so the animation can be seen
window.addEventListener('load', () => {
    setTimeout(() => {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.classList.add('hidden');
            setTimeout(() => {
                cancelAnimationFrame(preloaderRAF);
                preloader.style.display = 'none';
            }, 800); // Wait for transition
        }
    }, 2000); // 2 second minimum display time
});
// --- End Preloader Animation ---

const pizzas = [
    {
        name: "Classic Pepperoni",
        heading: "THE ALL-TIME FAVORITE",
        image: "images/hero-section/pizza images/pizza-1.webp",
        bg: "#fad784", // Light yellowish-orange
        textColor: "#d99525",
        activeTextColor: "#a36304",
        ingredients: [
            "images/hero-section/pizza images/pizza-1-bg-1.webp",
            "images/hero-section/pizza images/pizza-1-bg-2.webp",
            "images/hero-section/pizza images/pizza-1-bg-3.webp",
            "images/hero-section/pizza images/pizza-1-bg-4.webp",
            "images/hero-section/pizza images/pizza-1-bg-5.webp",
            "images/hero-section/pizza images/pizza-1-bg-6.webp",
            "images/hero-section/pizza images/pizza-1-bg-7.webp",
            "images/hero-section/pizza images/pizza-1-bg-8.webp",
            "images/hero-section/pizza images/pizza-1-bg-9.webp",
            "images/hero-section/pizza images/pizza-1-bg-10.webp",
            "images/hero-section/pizza images/pizza-1-bg-11.webp",
            "images/hero-section/pizza images/pizza-1-bg-12.webp",
            "images/hero-section/pizza images/pizza-1-bg-13.webp",
            "images/hero-section/pizza images/pizza-1-bg-14.webp"
        ]
    },
    {
        name: "Margherita Magic",
        heading: "CHEESY DELIGHT",
        image: "images/hero-section/pizza images/pizza-2.webp",
        bg: "#f2a896", // Light red-orange
        textColor: "#cc5f45",
        activeTextColor: "#8a2c16",
        ingredients: [
            "images/hero-section/pizza images/pizza-2-bg-1.webp",
            "images/hero-section/pizza images/pizza-2-bg-2.webp",
            "images/hero-section/pizza images/pizza-2-bg-3.webp",
            "images/hero-section/pizza images/pizza-2-bg-4.webp",
            "images/hero-section/pizza images/pizza-2-bg-5.webp",
            "images/hero-section/pizza images/pizza-2-bg-6.webp",
            "images/hero-section/pizza images/pizza-2-bg-7.webp",
            "images/hero-section/pizza images/pizza-2-bg-8.webp",
            "images/hero-section/pizza images/pizza-2-bg-9.webp",
            "images/hero-section/pizza images/pizza-2-bg-10.webp",
            "images/hero-section/pizza images/pizza-2-bg-11.webp",
            "images/hero-section/pizza images/pizza-2-bg-12.webp",
            "images/hero-section/pizza images/pizza-2-bg-13.webp"
        ]
    },
    {
        name: "Veggie Supreme",
        heading: "GARDEN FRESH",
        image: "images/hero-section/pizza images/pizza-3.webp",
        bg: "#85d6cd", // Light teal
        textColor: "#289689",
        activeTextColor: "#0b574e",
        ingredients: [
            "images/hero-section/pizza images/pizza-3-bg-1.webp",
            "images/hero-section/pizza images/pizza-3-bg-2.webp",
            "images/hero-section/pizza images/pizza-3-bg-3.webp",
            "images/hero-section/pizza images/pizza-3-bg-4.webp",
            "images/hero-section/pizza images/pizza-3-bg-5.webp",
            "images/hero-section/pizza images/pizza-3-bg-6.webp",
            "images/hero-section/pizza images/pizza-3-bg-7.webp",
            "images/hero-section/pizza images/pizza-3-bg-8.webp",
            "images/hero-section/pizza images/pizza-3-bg-9.webp",
            "images/hero-section/pizza images/pizza-3-bg-10.webp",
            "images/hero-section/pizza images/pizza-3-bg-11.webp",
            "images/hero-section/pizza images/pizza-3-bg-12.webp",
            "images/hero-section/pizza images/pizza-3-bg-13.webp",
            "images/hero-section/pizza images/pizza-3-bg-14.webp"
        ]
    },
    {
        name: "BBQ Chicken",
        heading: "SMOKY FLAVORS",
        image: "images/hero-section/pizza images/pizza-4.webp",
        bg: "#9bb9e6", // Light blue
        textColor: "#3f6bb3",
        activeTextColor: "#163566",
        ingredients: [
            "images/hero-section/pizza images/pizza-4-bg-1.webp",
            "images/hero-section/pizza images/pizza-4-bg-2.webp",
            "images/hero-section/pizza images/pizza-4-bg-3.webp",
            "images/hero-section/pizza images/pizza-4-bg-4.webp",
            "images/hero-section/pizza images/pizza-4-bg-5.webp",
            "images/hero-section/pizza images/pizza-4-bg-6.webp",
            "images/hero-section/pizza images/pizza-4-bg-7.webp",
            "images/hero-section/pizza images/pizza-4-bg-8.webp",
            "images/hero-section/pizza images/pizza-4-bg-9.webp",
            "images/hero-section/pizza images/pizza-4-bg-11.webp",
            "images/hero-section/pizza images/pizza-4-bg-12.webp",
            "images/hero-section/pizza images/pizza-4-bg-13.webp"
        ]
    },
    {
        name: "Spicy Meatball",
        heading: "HEAT IS ON",
        image: "images/hero-section/pizza images/pizza-5.webp",
        bg: "#eda6b5", // Light pink
        textColor: "#c94b65",
        activeTextColor: "#80172c",
        ingredients: [
            "images/hero-section/pizza images/pizza-5-bg-1.webp",
            "images/hero-section/pizza images/pizza-5-bg-2.webp",
            "images/hero-section/pizza images/pizza-5-bg-3.webp",
            "images/hero-section/pizza images/pizza-5-bg-4.webp",
            "images/hero-section/pizza images/pizza-5-bg-5.webp",
            "images/hero-section/pizza images/pizza-5-bg-6.webp",
            "images/hero-section/pizza images/pizza-5-bg-7.webp",
            "images/hero-section/pizza images/pizza-5-bg-8.webp",
            "images/hero-section/pizza images/pizza-5-bg-9.webp",
            "images/hero-section/pizza images/pizza-5-bg-10.webp"
        ]
    },
    {
        name: "Quattro Formaggi",
        heading: "FOUR CHEESE BLEND",
        image: "images/hero-section/pizza images/pizza-6.webp",
        bg: "#b4e3b7", // Light green
        textColor: "#45a34a",
        activeTextColor: "#165c19",
        ingredients: [
            "images/hero-section/pizza images/pizza-6-bg-1.webp",
            "images/hero-section/pizza images/pizza-6-bg-2.webp",
            "images/hero-section/pizza images/pizza-6-bg-3.webp",
            "images/hero-section/pizza images/pizza-6-bg-4.webp",
            "images/hero-section/pizza images/pizza-6-bg-5.webp",
            "images/hero-section/pizza images/pizza-6-bg-6.webp",
            "images/hero-section/pizza images/pizza-6-bg-7.webp",
            "images/hero-section/pizza images/pizza-6-bg-8.webp",
            "images/hero-section/pizza images/pizza-6-bg-9.webp",
            "images/hero-section/pizza images/pizza-6-bg-10.webp",
            "images/hero-section/pizza images/pizza-6-bg-11.webp",
            "images/hero-section/pizza images/pizza-6-bg-12.webp",
            "images/hero-section/pizza images/pizza-6-bg-13.webp",
            "images/hero-section/pizza images/pizza-6-bg-14.webp",
            "images/hero-section/pizza images/pizza-6-bg-15.webp"
        ]
    },
    {
        name: "Hawaiian Paradise",
        heading: "SWEET & SAVORY",
        image: "images/hero-section/pizza images/pizza-7.webp",
        bg: "#fce9a4", // Light golden yellow
        textColor: "#d4b02a",
        activeTextColor: "#82690d",
        ingredients: [
            "images/hero-section/pizza images/pizza-7-bg-1.webp",
            "images/hero-section/pizza images/pizza-7-bg-2.webp",
            "images/hero-section/pizza images/pizza-7-bg-3.webp",
            "images/hero-section/pizza images/pizza-7-bg-4.webp",
            "images/hero-section/pizza images/pizza-7-bg-5.webp",
            "images/hero-section/pizza images/pizza-7-bg-6.webp",
            "images/hero-section/pizza images/pizza-7-bg-7.webp",
            "images/hero-section/pizza images/pizza-7-bg-8.webp",
            "images/hero-section/pizza images/pizza-7-bg-9.webp",
            "images/hero-section/pizza images/pizza-7-bg-10.webp",
            "images/hero-section/pizza images/pizza-7-bg-11.webp",
            "images/hero-section/pizza images/pizza-7-bg-12.webp",
            "images/hero-section/pizza images/pizza-7-bg-13.webp"
        ]
    }
];

let currentIndex = 0;
let isAnimating = false;

// DOM Elements
const app = document.getElementById('app');
const menuItemsContainer = document.getElementById('menu-items');
const ingredientsContainer = document.getElementById('ingredients-container');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

// Preload all pizza images to prevent flickering
pizzas.forEach(p => {
    const img = new Image();
    img.src = p.image;
    p.ingredients.forEach(ing => {
        const i = new Image();
        i.src = ing;
    });
});

// Setup Circular Menu
const textRadius = 425; // Radius for the circular text placement
const dotRadius = 400; // Radius for the dot on the path
const centerX = 500; // SVG viewBox center X
const centerY = 500; // SVG viewBox center Y (bottom)

function initMenu() {
    const menuTextsContainer = document.getElementById('menu-texts');
    const ns = "http://www.w3.org/2000/svg";
    
    pizzas.forEach((pizza, index) => {
        // Spread 7 items evenly across 145 degrees to balance spacing and prevent edges from hiding
        const totalItems = pizzas.length;
        const spreadAngle = 145;
        const angleStep = spreadAngle / (totalItems - 1);
        const angleDeg = -(spreadAngle / 2) + (index * angleStep);
        const angleRad = (angleDeg - 90) * (Math.PI / 180);

        // Text Position along path (percentage from 0% left to 100% right)
        // -90deg is 0%, 0deg is 50%, 90deg is 100%
        const percent = ((angleDeg + 90) / 180) * 100;

        // Create SVG text element for curved text
        const textElem = document.createElementNS(ns, "text");
        textElem.setAttribute("class", "menu-item");
        textElem.id = `menu-text-${index}`;
        
        const textPath = document.createElementNS(ns, "textPath");
        textPath.setAttributeNS("http://www.w3.org/1999/xlink", "href", "#text-curve");
        textPath.setAttribute("startOffset", `${percent}%`);
        textPath.setAttribute("text-anchor", "middle");
        textPath.textContent = pizza.name;
        
        textElem.appendChild(textPath);
        menuTextsContainer.appendChild(textElem);
    });
}

function updateView(direction = 0) {
    if (isAnimating) return;
    isAnimating = true;

    const currentPizza = pizzas[currentIndex];

    // Update background
    app.style.background = currentPizza.bg;
    
    // Update Heading Text with simple fade animation and high contrast color
    const heroHeading = document.getElementById('hero-heading');
    const heroSubHeading = document.querySelector('.hero-text h3');
    
    if (heroSubHeading) {
        heroSubHeading.style.color = '#1a1a1a'; // Dark color for contrast against light pastel backgrounds
    }
    
    if (heroHeading) {
        heroHeading.style.opacity = 0;
        setTimeout(() => {
            heroHeading.textContent = currentPizza.heading;
            heroHeading.style.color = '#1a1a1a'; // Dark color for better visibility on light bg
            heroHeading.style.opacity = 1;
        }, 300);
    }

    // Update Circular Menu Active States
    document.querySelectorAll('.menu-item').forEach((item, idx) => {
        const isActive = (idx === currentIndex);
        item.classList.toggle('active', isActive);
        // All SVG text uses the current background's text color palette
        item.style.fill = isActive ? currentPizza.activeTextColor : currentPizza.textColor;
        if (isActive) {
            item.style.fontWeight = '700'; // Bolder when active
        } else {
            item.style.fontWeight = '600';
        }
    });

    // Update Ingredients
    // Clear old ingredients gracefully by fading them out
    const oldIngredients = document.querySelectorAll('.ingredient');
    oldIngredients.forEach(ing => {
        ing.classList.remove('active');
        setTimeout(() => ing.remove(), 800); // Wait for transition
    });

    // Add new ingredients
    currentPizza.ingredients.forEach((src, idx) => {
        const img = document.createElement('img');
        img.src = src;
        img.className = 'ingredient';
        
        // Distribute in a wide circle around the pizza
        const angle = (Math.PI * 2 / currentPizza.ingredients.length) * idx;
        const dist = 35 + Math.random() * 20; // 35% to 55% radius
        const x = 50 + dist * Math.cos(angle);
        const y = 45 + dist * Math.sin(angle); // slightly shifted up
        
        img.style.left = `${x}%`;
        img.style.top = `${y}%`;
        
        // Randomize scale for "little big and little small", make them smaller overall
        const scale = 0.4 + Math.random() * 0.4; // 0.4 to 0.8 instead of 0.8 to 1.8
        img.style.setProperty('--scale', scale);
        
        // Randomize slow floating animation
        const floatDuration = 15 + Math.random() * 10; // 15s to 25s
        const floatDelay = Math.random() * -20; // Start at random point in animation
        img.style.setProperty('--duration', `${floatDuration}s`);
        img.style.setProperty('--delay', `${floatDelay}s`);
        
        ingredientsContainer.appendChild(img);
        
        // Trigger reflow to ensure transition runs
        void img.offsetWidth;
        
        // Stagger animation slightly based on index
        setTimeout(() => {
            img.classList.add('active');
        }, 50);
    });

    // Animate Pizza
    if (direction !== 0) {
        const outClass = direction > 0 ? 'pizza-out-clockwise' : 'pizza-out-counterclockwise';
        const inClass = direction > 0 ? 'pizza-in-clockwise' : 'pizza-in-counterclockwise';

        // Find current and next img elements
        const currentImg = document.querySelector('.pizza-active');
        const nextImg = document.getElementById(currentImg.id === 'pizza-1' ? 'pizza-2' : 'pizza-1');

        // Prepare next image
        nextImg.src = currentPizza.image;
        nextImg.style.transition = 'none'; // Disable transition for snap
        nextImg.className = `pizza-img ${inClass}`; // Snap to start position

        // Trigger reflow
        void nextImg.offsetWidth;

        // Re-enable transitions and start animations
        nextImg.style.transition = '';
        currentImg.className = `pizza-img ${outClass}`; // Rotate old out
        nextImg.className = 'pizza-img pizza-active'; // Rotate new in

        setTimeout(() => {
            isAnimating = false;
        }, 800); // Wait for transition to complete
    } else {
        const currentImg = document.getElementById('pizza-1');
        currentImg.src = currentPizza.image;
        currentImg.className = 'pizza-img pizza-active';
        setTimeout(() => isAnimating = false, 800);
    }
}

let autoRotateTimer;

function startAutoRotate() {
    if (autoRotateTimer) clearInterval(autoRotateTimer);
    autoRotateTimer = setInterval(() => {
        // Only auto-rotate if the user is looking at the hero section
        if (window.scrollY <= 100 && !isAnimating) {
            currentIndex = (currentIndex + 1) % pizzas.length;
            updateView(1);
        }
    }, 5000);
}

function resetAutoRotate() {
    startAutoRotate();
}

function nextPizza() {
    if (isAnimating) return;
    resetAutoRotate();
    currentIndex = (currentIndex + 1) % pizzas.length;
    updateView(1);
}

function prevPizza() {
    if (isAnimating) return;
    resetAutoRotate();
    currentIndex = (currentIndex - 1 + pizzas.length) % pizzas.length;
    updateView(-1);
}

// Event Listeners
nextBtn.addEventListener('click', nextPizza);
prevBtn.addEventListener('click', prevPizza);

// Scroll / Wheel
let wheelTimeout;
window.addEventListener('wheel', (e) => {
    // Only intercept scroll if we are at the very top of the page (Hero section)
    if (window.scrollY <= 10) {
        
        if (e.deltaY > 0) {
            // Scrolling DOWN
            if (currentIndex === pizzas.length - 1) {
                // If we are on the very last pizza, unlock the scroll and let them go down natively!
                return;
            }
            
            // Otherwise, trap the scroll to change the pizza
            e.preventDefault();
            
            if (isAnimating) return;
            if (wheelTimeout) clearTimeout(wheelTimeout);
            
            wheelTimeout = setTimeout(() => {
                currentIndex++;
                updateView(1);
            }, 50);
            
        } else if (e.deltaY < 0) {
            // Scrolling UP
            // Prevent scrolling up past the top
            e.preventDefault();
            
            if (isAnimating) return;
            if (wheelTimeout) clearTimeout(wheelTimeout);
            
            wheelTimeout = setTimeout(() => {
                if (currentIndex > 0) {
                    currentIndex--;
                    updateView(-1);
                }
            }, 50);
        }
    }
}, { passive: false });

// Touch swipe support
let touchStartY = 0;
let touchEndY = 0;

window.addEventListener('touchstart', (e) => {
    touchStartY = e.changedTouches[0].screenY;
}, { passive: true });

window.addEventListener('touchend', (e) => {
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
}, { passive: true });

function handleSwipe() {
    if (isAnimating) return;
    const swipeThreshold = 50;
    if (touchStartY - touchEndY > swipeThreshold) {
        nextPizza(); // Swipe up -> next
    } else if (touchEndY - touchStartY > swipeThreshold) {
        prevPizza(); // Swipe down -> prev
    }
}

function initMenuGrid() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        console.warn('GSAP or ScrollTrigger not loaded.');
        return;
    }

    gsap.registerPlugin(ScrollTrigger);

    // Animate the section header
    gsap.from(".menu-header", {
        scrollTrigger: {
            trigger: ".menu-grid-section",
            start: "top 80%",
            toggleActions: "play reverse play reverse"
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    });

    // Staggered intro animation for grid items with reverse on scroll out
    gsap.utils.toArray('.menu-grid-item').forEach((item, i) => {
        gsap.to(item, {
            scrollTrigger: {
                trigger: item,
                start: "top 90%",
                // toggleActions: "play reverse play reverse" - allows it to play, reverse on leave, play on enter back, reverse on leave back
                toggleActions: "play reverse play reverse",
            },
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            delay: (i % 4) * 0.1 // small stagger based on column
        });
    });
}

// Initialize
initMenu();
initMenuGrid();
updateView(0);
startAutoRotate();

// --- AR Experience Section GSAP Animation ---
function initARSection() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        console.warn('GSAP or ScrollTrigger not loaded.');
        return;
    }

    gsap.registerPlugin(ScrollTrigger);

    // Precisely center the platter exactly over the CSS 'right: 35%' coordinate
    gsap.set(".ar-platter", { xPercent: 50, yPercent: -50 });
    gsap.set(".ar-doodle", { xPercent: 50, yPercent: -50 });

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: "#ar-experience",
            start: "top top",
            end: "+=200%", // 2 steps
            pin: true,
            scrub: 1,
            anticipatePin: 1
        }
    });

    // Scene 1 -> Scene 2: Text fades out, Orange BG expands, Platter rotates and moves LEFT
    tl.to(".step-1", { yPercent: -100, opacity: 0, duration: 1 })
      .to(".ar-bg-orange", { width: "100%", duration: 2 }, "<")
      .to(".ar-platter", { x: "-55vw", rotation: -180, duration: 2 }, "<") // Move far left
      .to(".ar-doodle", { x: "-55vw", opacity: 1, duration: 2 }, "<")
      .to(".step-2", { yPercent: -50, autoAlpha: 1, duration: 1 }, "-=0.5");
}

// Call init after DOM and scripts are fully loaded
window.addEventListener('load', initARSection);

// Header Scroll Effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// --- Codepen Sections Animation ---
function initCodepenAnimations() {
    if (typeof ScrollMagic === 'undefined' || typeof gsap === 'undefined') {
        console.warn('ScrollMagic or GSAP not loaded.');
        return;
    }
    
    let controller = new ScrollMagic.Controller();
    
    let t1 = gsap.timeline();
    t1.from(".section_1_01", { duration: 4, y: -100, x: -150, ease: "power3.inOut" })
      .from(".section_1_02", { duration: 4, y: -150, x: -250, ease: "power3.inOut" }, '-=4')
      .from(".section_1_03", { duration: 4, y: -80, x: -100, ease: "power3.inOut" }, '-=4')
      .from(".section_1_04", { duration: 4, y: -100, x: -150, ease: "power3.inOut" }, '-=4')
      .from(".section_1_05", { duration: 4, y: -80, x: -200, ease: "power3.inOut" }, '-=4')
      .from(".section_1_06", { duration: 4, y: -100, x: -350, ease: "power3.inOut" }, '-=4')
      .from(".section_1_07", { duration: 4, y: -50, x: -150, ease: "power3.inOut" }, '-=4')
      .from(".section_1_08", { duration: 4, y: 50, x: -350, ease: "power3.inOut" }, '-=4')
      .from(".section_1_09", { duration: 4, y: 100, x: -200, ease: "power3.inOut" }, '-=4');

    new ScrollMagic.Scene({
        triggerElement: '.first-section',
        duration: '100%',
        triggerHook: 0,
        offset: '300'
    })
    .setTween(t1)
    .setPin('.first-section')
    .addTo(controller);

    let t2 = gsap.timeline();
    t2.to('.top .image-container', { duration: 4, height: 0 });

    new ScrollMagic.Scene({
        triggerElement: '.second-section',
        duration: '100%',
        triggerHook: 0,
        offset: '100'
    })
    .setTween(t2)
    .setPin('.second-section')
    .addTo(controller);

    let t3 = gsap.timeline();
    t3.to('.section_3_01', { duration: 4, y: -250, ease: "power3.inOut" })
      .to('.section_3_02', { duration: 4, y: -200, ease: "power3.inOut" }, '-=4')
      .to('.section_3_03', { duration: 4, y: -100, ease: "power3.inOut" }, '-=4')
      .to('.section_3_04', { duration: 4, y: 0, ease: "power3.inOut" }, '-=4')
      .to('.section_3_05', { duration: 4, y: 150, ease: "power3.inOut" }, '-=4')
      .to('.section_3_06', { duration: 4, y: 250, ease: "power3.inOut" }, '-=4');

    new ScrollMagic.Scene({
        triggerElement: '.third-section',
        duration: '100%',
        triggerHook: 0,
        offset: '200'
    })
    .setTween(t3)
    .setPin('.third-section')
    .addTo(controller);
}

window.addEventListener('load', () => {
    initCodepenAnimations();
    initScrollReveal();
    initAboutPizzaAnimation();
});

// --- Scroll Reveal Animation ---
function initScrollReveal() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
    
    gsap.utils.toArray('.reveal-text').forEach(text => {
        gsap.to(text, {
            scrollTrigger: {
                trigger: text,
                start: "top 85%",
                toggleActions: "play none none reverse"
            },
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out"
        });
    });
}

// --- About Us Pizza Auto Animation ---
function initAboutPizzaAnimation() {
    const slices = document.querySelectorAll('.slice-about');
    if (!slices.length) return;
    
    let currentSliceIndex = 0;
    
    setInterval(() => {
        // Remove class from previous slice
        slices.forEach(slice => slice.classList.remove('auto-anim'));
        
        // Add class to current slice
        if (slices[currentSliceIndex]) {
            slices[currentSliceIndex].classList.add('auto-anim');
        }
        
        currentSliceIndex = (currentSliceIndex + 1) % slices.length;
    }, 3000);
}

// --- Mobile Navigation Toggle ---
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when a link is clicked
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
});
