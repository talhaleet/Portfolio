

// GSAP Hero Animations
gsap.from(".glow-text", { opacity: 0, y: -30, duration: 1.5 });
gsap.from(".lead", { opacity: 0, y: 20, delay: 0.5, duration: 1 });
gsap.from(".btn", { opacity: 0, scale: 0.8, delay: 1, duration: 0.5 });

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// Cursor Animation
const cursor = document.getElementById("cursor");
const name = document.getElementById("name");

if (cursor && name) {
  name.addEventListener("mouseenter", () => {
    const nameRect = name.getBoundingClientRect();
    const introRect = document.querySelector(".intro-line").getBoundingClientRect();
    const offsetLeft = nameRect.left - introRect.left + 650;

    gsap.to(cursor, {
      x: offsetLeft,
      backgroundColor: "#00fff2",
      duration: 0.4,
      ease: "power2.out"
    });
  });

  name.addEventListener("mouseleave", () => {
    gsap.to(cursor, {
      x: 0,
      backgroundColor: "cyan",
      duration: 0.4,
      ease: "power2.in"
    });
  });
}

// ❄️ Snow Canvas
const snowCanvas = document.getElementById("snow");
const snowCtx = snowCanvas.getContext("2d");
let width = window.innerWidth;
let height = window.innerHeight;
snowCanvas.width = width;
snowCanvas.height = height;

const flakes = Array.from({length: 100}, () => ({
  x: Math.random() * width,
  y: Math.random() * height,
  r: Math.random() * 4 + 1,
  d: Math.random() * 100
}));

function drawFlakes() {
  snowCtx.clearRect(0, 0, width, height);
  snowCtx.fillStyle = "white";
  snowCtx.beginPath();
  flakes.forEach(f => {
    snowCtx.moveTo(f.x, f.y);
    snowCtx.arc(f.x, f.y, f.r, 0, Math.PI * 2, true);
  });
  snowCtx.fill();
  moveFlakes();
}

let angle = 0;
function moveFlakes() {
  angle += 0.01;
  flakes.forEach(f => {
    f.y += Math.cos(angle + f.d) + 1 + f.r / 2;
    f.x += Math.sin(angle) * 2;
    if (f.y > height) {
      f.y = 0;
      f.x = Math.random() * width;
    }
  });
}

function animateSnow() {
  drawFlakes();
  requestAnimationFrame(animateSnow);
}
animateSnow();

// 🧲 Interactive Particle Background
const bgCanvas = document.getElementById("interactive-bg");
const ctx2 = bgCanvas.getContext("2d");
bgCanvas.width = innerWidth;
bgCanvas.height = innerHeight;

const particles = Array.from({length:150}, () => ({
  x: Math.random()*bgCanvas.width,
  y: Math.random()*bgCanvas.height,
  vx: (Math.random()-0.5)*0.5,
  vy: (Math.random()-0.5)*0.5,
  size: Math.random()*2+1
}));

const mouse = {x: null, y: null};

bgCanvas.addEventListener("mousemove", e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});
bgCanvas.addEventListener("mouseleave", () => {
  mouse.x = mouse.y = null;
});

function drawParticles() {
  ctx2.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
  particles.forEach(p => {
    if (mouse.x) {
      const dx = mouse.x - p.x, dy = mouse.y - p.y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      const force = Math.max((50 - dist) / 50, -0.2);
      p.vx -= force * dx * 0.001;
      p.vy -= force * dy * 0.001;
    }
    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 0) p.x = bgCanvas.width;
    if (p.x > bgCanvas.width) p.x = 0;
    if (p.y < 0) p.y = bgCanvas.height;
    if (p.y > bgCanvas.height) p.y = 0;

    ctx2.beginPath();
    ctx2.arc(p.x, p.y, p.size, 0, 2*Math.PI);
    ctx2.fillStyle = "rgba(0,255,255,0.7)";
    ctx2.fill();
  });
  requestAnimationFrame(drawParticles);
}
drawParticles();



// Scroll Progress Bar
const scrollBar = document.getElementById("scrollBar");
window.addEventListener("scroll", () => {
  const scrollTop = document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (scrollTop / height) * 100;
  scrollBar.style.height = scrolled * 2 + "px";
  scrollBar.style.background = `linear-gradient(to bottom, cyan, #00fff2 ${scrolled}%)`;
});

// Hamburger Menu Toggle
function toggleMenu() {
  const menu = document.getElementById("navMenu");
  menu.style.display = menu.style.display === "block" ? "none" : "block";
}

// Scroll-triggered Animations
gsap.registerPlugin(ScrollTrigger);

gsap.from(".about-image", {
  scrollTrigger: { trigger: ".about-image", start: "top 80%" },
  opacity: 0,
  x: -100,
  duration: 1
});

gsap.from(".about-text", {
  scrollTrigger: { trigger: ".about-text", start: "top 80%" },
  opacity: 0,
  x: 100,
  duration: 1
});

gsap.from(".icon-box", {
  scrollTrigger: { trigger: ".social-icons", start: "top 90%" },
  opacity: 0,
  y: 50,
  duration: 0.8,
  stagger: 0.2
});

gsap.from(".timeline-item .content", {
  scrollTrigger: { trigger: ".timeline", start: "top 80%" },
  opacity: 0,
  y: 50,
  duration: 0.8,
  stagger: 0.2
});

gsap.from(".exp-item", {
  scrollTrigger: { trigger: ".expertise", start: "top 80%" },
  opacity: 0,
  scale: 0.5,
  duration: 1,
  stagger: 0.1
});


gsap.registerPlugin(ScrollTrigger);

// Animate Hero
gsap.from("#hero", {
  opacity: 0,
  y: 100,
  duration: 1.5,
  ease: "power3.out",
  scrollTrigger: {
    trigger: "#hero",
    start: "top 80%",
  }
});

// Animate Skills
gsap.from("#skills h2, #skills .skill-card", {
  opacity: 0,
  x: -100,
  duration: 1,
  stagger: 0.2,
  ease: "back.out(1.7)",
  scrollTrigger: {
    trigger: "#skills",
    start: "top 80%",
  }
});

// Animate Testimonials
gsap.from("#testimonials h2, #testimonials .testimonial-box", {
  opacity: 0,
  y: 100,
  duration: 1,
  stagger: 0.3,
  ease: "power2.out",
  scrollTrigger: {
    trigger: "#testimonials",
    start: "top 80%",
  }
});

// Animate Contact Section
gsap.from("#contact h2, #contact form", {
  opacity: 0,
  scale: 0.8,
  duration: 1.2,
  ease: "elastic.out(1, 0.5)",
  scrollTrigger: {
    trigger: "#contact",
    start: "top 80%",
  }
});

gsap.utils.toArray(".fade-in").forEach(elem => {
  gsap.from(elem, {
    opacity: 0,
    y: 50,
    duration: 1,
    scrollTrigger: {
      trigger: elem,
      start: "top 85%",
    }
  });
});
 window.addEventListener("load", () => {
      setTimeout(() => {
        document.getElementById("loader").style.display = "none";
        gsap.to("#hero", { opacity: 1, duration: 1 });
      }, 1500);
    });

  

    name.addEventListener("mouseenter", () => {
      const nameRect = name.getBoundingClientRect();
      const introRect = document.querySelector(".intro-line").getBoundingClientRect();
      const offsetLeft = nameRect.left - introRect.left + 650;

      gsap.to(cursor, {
        x: offsetLeft,
        backgroundColor: "#00fff2",
        duration: 0.4,
        ease: "power2.out"
      });
    });

    name.addEventListener("mouseleave", () => {
      gsap.to(cursor, {
        x: 0,
        backgroundColor: "cyan",
        duration: 0.4,
        ease: "power2.in"
      });
    });

    const canvas = document.getElementById("snow");
    const ctx = canvas.getContext("2d");
   
    canvas.width = width;
    canvas.height = height;



    function drawFlakes() {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "white";
      ctx.beginPath();
      flakes.forEach(f => {
        ctx.moveTo(f.x, f.y);
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2, true);
      });
      ctx.fill();
      moveFlakes();
    }



    function animateSnow() {
      drawFlakes();
      requestAnimationFrame(animateSnow);
    }

    animateSnow();

    window.addEventListener("resize", () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    });



    function toggleMenu() {
      const menu = document.getElementById("navMenu");
      menu.style.display = menu.style.display === "block" ? "none" : "block";
    }

    gsap.registerPlugin(ScrollTrigger);
gsap.from(".about-image", {
  scrollTrigger: {
    trigger: ".about-image",
    start: "top 80%",
  },
  opacity: 0,
  x: -100,
  duration: 1
});

gsap.from(".about-text", {
  scrollTrigger: {
    trigger: ".about-text",
    start: "top 80%",
  },
  opacity: 0,
  x: 100,
  duration: 1
});

gsap.from(".icon-box", {
  scrollTrigger: {
    trigger: ".social-icons",
    start: "top 90%",
  },
  opacity: 0,
  y: 50,
  duration: 0.8,
  stagger: 0.2
});
     const fullPageCanvas = document.getElementById('bg-canvas-stars');
const fullPageContext = fullPageCanvas.getContext('2d');

function resizeStarCanvas() {
  fullPageCanvas.width = window.innerWidth;
  fullPageCanvas.height = document.documentElement.scrollHeight;
}
resizeStarCanvas();

const floatingStars = [];

for (let starIndex = 0; starIndex < 100; starIndex++) {
  floatingStars.push({
    posX: Math.random() * fullPageCanvas.width,
    posY: Math.random() * fullPageCanvas.height,
    starRadius: Math.random() * 1.5,
    fallSpeed: Math.random() * 0.5 + 0.2
  });
}

function drawFloatingStars() {
  fullPageContext.clearRect(0, 0, fullPageCanvas.width, fullPageCanvas.height);
  fullPageContext.fillStyle = 'blue';

  floatingStars.forEach(starItem => {
    starItem.posY += starItem.fallSpeed;
    if (starItem.posY > fullPageCanvas.height) {
      starItem.posY = 0;
      starItem.posX = Math.random() * fullPageCanvas.width;
    }
    fullPageContext.beginPath();
    fullPageContext.arc(starItem.posX, starItem.posY, starItem.starRadius, 0, Math.PI * 2);
    fullPageContext.fill();
  });

  requestAnimationFrame(drawFloatingStars);
}

drawFloatingStars();

window.addEventListener('resize', resizeStarCanvas);