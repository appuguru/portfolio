// ✅ Smooth scroll links
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href");
    document.querySelector(targetId).scrollIntoView({ behavior: "smooth" });
  });
});

// ===============================
// ✅ SHOW MORE PROJECTS
// ===============================
const showMoreBtn = document.getElementById("showMoreBtn");
const showMoreWrap = document.querySelector(".show-more-wrap");
const allProjects = document.querySelectorAll(".project-card");

let showAll = false;
const initialCount = 6;

function updateProjectsDisplay() {
  // only apply show more logic in ALL filter
  allProjects.forEach((card, index) => {
    if (!showAll && index >= initialCount) {
      card.style.display = "none";
    } else {
      card.style.display = "flex";
    }
  });

  if (showMoreBtn) {
    showMoreBtn.textContent = showAll ? "Show Less" : "Show More";
  }
}

if (showMoreBtn) {
  updateProjectsDisplay();

  showMoreBtn.addEventListener("click", () => {
    showAll = !showAll;
    updateProjectsDisplay();
  });
}

// ===============================
// ✅ FILTER PROJECTS
// ===============================
const filterButtons = document.querySelectorAll(".filter-btn");

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.getAttribute("data-filter");

    // filter projects
    allProjects.forEach((project) => {
      const category = project.getAttribute("data-category");
      project.style.display =
        filter === "all" || filter === category ? "flex" : "none";
    });

    // ✅ Show More only in ALL
    if (showMoreWrap) {
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

// ===============================
// ✅ REVEAL ANIMATION
// ===============================
const projectCards = document.querySelectorAll(".project-card");

function scrollAnimations() {
  // sections reveal
  document.querySelectorAll(".reveal").forEach((section) => {
    const sectionTop = section.getBoundingClientRect().top;
    if (sectionTop < window.innerHeight - 100) {
      section.classList.add("active");
    }
  });

  // project cards reveal
  projectCards.forEach((card) => {
    const cardTop = card.getBoundingClientRect().top;
    if (cardTop < window.innerHeight - 80) {
      card.classList.add("show");
    }
  });
}

window.addEventListener("scroll", scrollAnimations);
window.addEventListener("load", scrollAnimations);

// ===============================
// ✅ FULLSCREEN IMAGE + VIDEO MODAL
// ===============================
const imgModal = document.getElementById("imgModal");
const modalImg = document.getElementById("modalImg");

const videoModal = document.getElementById("videoModal");
const modalVideo = document.getElementById("modalVideo");

// ✅ Open Image
window.openImage = function (src) {
  if (!imgModal || !modalImg) return;

  modalImg.src = src;
  imgModal.classList.add("show");
  document.body.classList.add("modal-open");
};

// ✅ Open Video
window.openVideo = function (src) {
  if (!videoModal || !modalVideo) return;

  modalVideo.src = src;
  videoModal.classList.add("show");
  document.body.classList.add("modal-open");
  modalVideo.play();
};

// ✅ Close both
function closeModal() {
  // close image
  if (imgModal) imgModal.classList.remove("show");
  if (modalImg) modalImg.src = "";

  // close video
  if (videoModal) videoModal.classList.remove("show");
  if (modalVideo) {
    modalVideo.pause();
    modalVideo.currentTime = 0;
    modalVideo.src = "";
  }

  document.body.classList.remove("modal-open");
}

// close buttons
document.querySelectorAll(".modal-close").forEach((btn) => {
  btn.addEventListener("click", closeModal);
});

// click outside close
document.querySelectorAll(".fullscreen-modal").forEach((modal) => {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });
});

// ESC close
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

// ===============================
// ✅ DAY / NIGHT THEME TOGGLE
// ===============================
const themeToggle = document.getElementById("themeToggle");

// Load saved theme
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "light") {
  document.body.classList.add("light");
  if (themeToggle) themeToggle.textContent = "☀️";
} else {
  if (themeToggle) themeToggle.textContent = "🌙";
}

// Toggle theme
if (themeToggle) {
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
}
