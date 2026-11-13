const btn = document.querySelector("#copy-btn");
const email = document.querySelector("#email");

btn.addEventListener("click", () => {
  navigator.clipboard
    .writeText(email.textContent)
    .then(() => {
      btn.textContent = "کپی شد";
      setTimeout(() => {
        btn.textContent = "کپی ایمیل";
      }, 1500);
    })
    .catch(() => {
      btn.textContent = "کپی نشد";
    });
});

function smoothScrollTo(target, duration = 1000) {
  const start = window.scrollY;
  const distanse = target.getBoundingClientRect().top;
  let startTime = null;

  function ease(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  function step(now) {
    if (startTime === null) startTime = now;
    const progress = Math.min((now - startTime) / duration, 1);
    window.scrollTo(0, start + distanse * ease(progress));
    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const target = document.querySelector(link.getAttribute("href"));
    if (!target || reduce) return;
    e.preventDefault();
    smoothScrollTo(target);
  });
});
