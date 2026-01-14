// ✅ Smooth scroll links
document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href");
    document.querySelector(targetId).scrollIntoView({ behavior: "smooth" });
  });
});

// ✅ Filter projects (with Show More control)
const filterButtons = document.querySelectorAll(".filter-btn");
const projects = document.querySelectorAll(".project-card");

filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.getAttribute("data-filter");

    // ✅ Show/Hide projects based on filter
    projects.forEach(project => {
      const category = project.getAttribute("data-category");
      project.style.display = (filter === "all" || filter === category) ? "flex" : "none";
    });

    // ✅ Show More button only on "All"
    if (showMoreBtn && showMoreWrap) {
      if (filter === "all") {
        showMoreWrap.style.display = "flex";
        showAll = false;
        updateProjectsDisplay();
      } else {
        showMoreWrap.style.display = "none";
      }
    }
  });
});


// ✅ Reveal animation on scroll
function revealSections() {
  const reveals = document.querySelectorAll(".reveal");
  const windowHeight = window.innerHeight;

  reveals.forEach(section => {
    const top = section.getBoundingClientRect().top;
    if (top < windowHeight - 80) {
      section.classList.add("active");
    }
  });
}
window.addEventListener("scroll", revealSections);
window.addEventListener("load", revealSections);

// ✅ Image Popup Modal
const imgModal = document.getElementById("imgModal");
const modalImg = document.getElementById("modalImg");
const closeImgBtn = document.querySelector(".close");

document.querySelectorAll(".view-btn").forEach(btn => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const imgSrc = btn.getAttribute("data-img");

    imgModal.style.display = "block";
    modalImg.src = imgSrc;
  });
});

closeImgBtn.addEventListener("click", () => {
  imgModal.style.display = "none";
});

imgModal.addEventListener("click", (e) => {
  if (e.target === imgModal) {
    imgModal.style.display = "none";
  }
});

// ✅ Video Popup Modal
const videoModal = document.getElementById("videoModal");
const modalVideo = document.getElementById("modalVideo");
const closeVideoBtn = document.querySelector(".close-video");

document.querySelectorAll(".video-btn").forEach(btn => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const videoSrc = btn.getAttribute("data-video");

    videoModal.style.display = "block";
    modalVideo.src = videoSrc;
    modalVideo.play();
  });
});

closeVideoBtn.addEventListener("click", () => {
  videoModal.style.display = "none";
  modalVideo.pause();
  modalVideo.src = "";
});

videoModal.addEventListener("click", (e) => {
  if (e.target === videoModal) {
    videoModal.style.display = "none";
    modalVideo.pause();
    modalVideo.src = "";
  }
});
// ✅ Show More Projects
const showMoreBtn = document.getElementById("showMoreBtn");
const showMoreWrap = document.querySelector(".show-more-wrap");
const allProjects = document.querySelectorAll(".project-card");

let showAll = false;
const initialCount = 6;

function updateProjectsDisplay() {
  allProjects.forEach((card, index) => {
    if (!showAll && index >= initialCount) {
      card.style.display = "none";
    } else {
      card.style.display = "flex";
    }
  });

  showMoreBtn.textContent = showAll ? "Show Less" : "Show More";
}

if (showMoreBtn) {
  updateProjectsDisplay();

  showMoreBtn.addEventListener("click", () => {
    showAll = !showAll;
    updateProjectsDisplay();
  });
}
// ✅ Scroll Reveal for Sections + Cards
const projectCards = document.querySelectorAll(".project-card");

function scrollAnimations() {
  // ✅ Sections reveal
  document.querySelectorAll(".reveal").forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;
    if (sectionTop < window.innerHeight - 100) {
      section.classList.add("active");
    }
  });

  // ✅ Project cards reveal
  projectCards.forEach(card => {
    const cardTop = card.getBoundingClientRect().top;
    if (cardTop < window.innerHeight - 80) {
      card.classList.add("show");
    }
  });
}

window.addEventListener("scroll", scrollAnimations);
window.addEventListener("load", scrollAnimations);
// ===============================
// ✅ DAY / NIGHT THEME TOGGLE
// ===============================
const themeToggle = document.getElementById("themeToggle");

// Load saved theme
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "light") {
  document.body.classList.add("light");
  themeToggle.textContent = "☀️";
} else {
  themeToggle.textContent = "🌙";
}

// Toggle theme on click
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");

  if (document.body.classList.contains("light")) {
    localStorage.setItem("theme", "light");
    themeToggle.textContent = "☀️";
  } else {
    localStorage.setItem("theme", "dark");
    themeToggle.textContent = "🌙";
  }
});
