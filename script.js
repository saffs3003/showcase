const navIcon = document.querySelector(".nav__icon");
const navMenu = document.querySelector(".nav__link");
const navLinks = document.querySelectorAll(".nav-links");
const navbar = document.querySelector(".navbar");

function toggleMenu() {
  navIcon.classList.toggle("active");
  navMenu.classList.toggle("active");
  navbar.classList.toggle("active");
}

navIcon.addEventListener("click", toggleMenu);

let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides((slideIndex = slideIndex + n));
}

function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  const slides = document.getElementsByClassName("sliders__content");
  const total = slides.length;

  if (n > total) slideIndex = 1;
  else if (n < 1) slideIndex = total;
  else slideIndex = n;

  const center = slideIndex - 1;
  const left = (center - 1 + total) % total;
  const right = (center + 1) % total;

  for (let i = 0; i < total; i++) {
    slides[i].classList.remove("center", "left", "right");
    slides[i].style.display = "none";
  }

  slides[left].classList.add("left");
  slides[center].classList.add("center");
  slides[center].style.display = "block";
  slides[right].classList.add("right");
}

document.addEventListener("DOMContentLoaded", () => {
  showSlides(slideIndex);
  setInterval(() => {
    plusSlides(1);
  }, 3000);
});

document.addEventListener("DOMContentLoaded", () => {
  function animateOnScroll() {
    const timelineHeading = document.querySelector(".timeline__heading");
    const timelineItems = document.querySelectorAll(".timeline__item");
    const timelineLine = document.querySelector(".timeline::before, .timeline");

    if (timelineHeading) {
      const headingRect = timelineHeading.getBoundingClientRect();
      const isHeadingVisible =
        headingRect.top < window.innerHeight * 0.8 && headingRect.bottom > 0;

      if (isHeadingVisible && !timelineHeading.classList.contains("animate")) {
        timelineHeading.classList.add("animate");
        timelineHeading.style.animation = "fade-in 0.8s ease forwards";
      }
    }

    if (timelineItems.length > 0) {
      const firstItemRect = timelineItems[0].getBoundingClientRect();
      const isFirstItemVisible = firstItemRect.top < window.innerHeight * 0.8;

      if (isFirstItemVisible) {
        const timeline = document.querySelector(".timeline");
        if (timeline && !timeline.classList.contains("line-animated")) {
          timeline.classList.add("line-animated");
          timeline.style.setProperty(
            "--timeline-animation",
            "timeline-grow 1.5s ease-out forwards"
          );
        }
      }
    }

    timelineItems.forEach((item, index) => {
      const rect = item.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight * 0.8 && rect.bottom > 0;

      if (isVisible && !item.classList.contains("animate")) {
        item.classList.add("animate");

        const delay = index * 0.3;

        if (item.offsetLeft > window.innerWidth / 2 || index % 2 === 1) {
          item.style.animation = `slide-in-right 0.6s ease-out ${delay}s forwards`;
        } else {
          item.style.animation = `slide-in 0.6s ease-out ${delay}s forwards`;
        }
      }
    });

    const cards = document.querySelectorAll(".fade-in-card");
    cards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight * 0.8;

      if (isVisible && !card.classList.contains("visible")) {
        card.classList.add("visible");
      }
    });
  }

  function resetTimelineAnimations() {
    const timelineSection = document.querySelector(".about__section");
    if (!timelineSection) return;

    const sectionRect = timelineSection.getBoundingClientRect();
    const isSectionVisible =
      sectionRect.top < window.innerHeight && sectionRect.bottom > 0;

    // If timeline section is not visible, reset animations
    if (!isSectionVisible) {
      const timelineHeading = document.querySelector(".timeline__heading");
      const timelineItems = document.querySelectorAll(".timeline__item");
      const timeline = document.querySelector(".timeline");

      if (timelineHeading && timelineHeading.classList.contains("animate")) {
        timelineHeading.classList.remove("animate");
        timelineHeading.style.animation = "";
      }

      if (timeline && timeline.classList.contains("line-animated")) {
        timeline.classList.remove("line-animated");
        timeline.style.removeProperty("--timeline-animation");
      }

      timelineItems.forEach((item) => {
        if (item.classList.contains("animate")) {
          item.classList.remove("animate");
          item.style.animation = "";
        }
      });
    }
  }

  function handleScroll() {
    animateOnScroll();
    resetTimelineAnimations();
  }

  window.addEventListener("scroll", handleScroll);
  handleScroll();

  const navLinks = document.querySelectorAll(".nav-links");
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.querySelector("a").getAttribute("href");
      if (href && href.startsWith("#")) {
        e.preventDefault();

        if (navMenu.classList.contains("active")) {
          toggleMenu();
        }

        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
  });

  const slider = document.getElementById("slider");
  if (slider) {
    let touchStartX = 0;
    let touchEndX = 0;

    slider.addEventListener("touchstart", (e) => {
      touchStartX = e.changedTouches[0].screenX;
    });

    slider.addEventListener("touchend", (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    });

    function handleSwipe() {
      if (touchEndX < touchStartX - 50) {
        plusSlides(1);
      } else if (touchEndX > touchStartX + 50) {
        plusSlides(-1);
      }
    }
  }
});
