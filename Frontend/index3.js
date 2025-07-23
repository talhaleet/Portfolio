 window.addEventListener("load", () => {
      setTimeout(() => {
        document.getElementById("loader").style.display = "none";
        gsap.to("#hero", { opacity: 1, duration: 1 });
      }, 1500);
    });

    const cursor = document.getElementById("cursor");
    const name = document.getElementById("name");

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
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const flakes = Array.from({length: 100}, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 4 + 1,
      d: Math.random() * 100
    }));

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

    window.addEventListener("resize", () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    });

    const scrollBar = document.getElementById("scrollBar");
    window.addEventListener("scroll", () => {
      const scrollTop = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (scrollTop / height) * 100;
      scrollBar.style.height = scrolled * 2 + "px";
      scrollBar.style.background = `linear-gradient(to bottom, cyan, #00fff2 ${scrolled}%)`;
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