// Responsive Navigation Toggle
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.querySelector("nav ul");
if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
}

// Animate on Scroll with sophisticated triggers and staggered project cards
function animateOnScroll() {
  const animatedEls = document.querySelectorAll(
    ".animate-fade-in, .animate-slide-in-left, .animate-slide-in-right, .animate-slide-in-up, .animate-pop-in, .animate-zoom-in"
  );
  const triggerBottom = window.innerHeight * 0.88;
  animatedEls.forEach((el, idx) => {
    const boxTop = el.getBoundingClientRect().top;
    if (boxTop < triggerBottom) {
      el.style.animationPlayState = "running";
      el.style.opacity = 1;
      if (el.classList.contains("animate-pop-in")) {
        el.style.animationDelay = idx * 0.1 + "s";
      }
    }
  });
  // Staggered project cards
  const projectCards = document.querySelectorAll(
    ".projects-list .project-card"
  );
  projectCards.forEach((card, i) => {
    const cardTop = card.getBoundingClientRect().top;
    if (cardTop < window.innerHeight * 0.92) {
      card.style.animationPlayState = "running";
      card.style.opacity = 1;
    }
  });
}
window.addEventListener("scroll", animateOnScroll);
window.addEventListener("load", animateOnScroll);

// Accessibility: allow keyboard focus for project overlays
document.querySelectorAll(".project-card").forEach((card) => {
  card.tabIndex = 0;
  card.addEventListener("focus", function () {
    const overlay = card.querySelector(".project-overlay");
    if (overlay) overlay.style.opacity = 1;
  });
  card.addEventListener("blur", function () {
    const overlay = card.querySelector(".project-overlay");
    if (overlay) overlay.style.opacity = 0;
  });
});

// Contact Form Submission
const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");
if (contactForm) {
  contactForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    formStatus.textContent = "Sending...";
    const formData = {
      name: contactForm.name.value,
      email: contactForm.email.value,
      message: contactForm.message.value,
    };
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        formStatus.textContent = "Thank you for contacting me!";
        contactForm.reset();
      } else {
        formStatus.textContent =
          "Something went wrong. Please try again later.";
      }
    } catch (err) {
      formStatus.textContent = "Network error. Please try again later.";
    }
  });
}
