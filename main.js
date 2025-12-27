const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const menuBtnIcon = menuBtn.querySelector("i");

menuBtn.addEventListener("click", (e) => {
  navLinks.classList.toggle("open");

  const isOpen = navLinks.classList.contains("open");
  menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
});
navLinks.addEventListener("click", (e) => {
  navLinks.classList.remove("open");
  menuBtnIcon.setAttribute("class", "ri-menu-line");
});

const scrollRevealOption = {
  distance:"50px", 
  origin:"bottom",
  duration: 1000 ,
};
ScrollReveal().reveal(".about__container .section__header",{
  ...scrollRevealOption,
});
ScrollReveal().reveal(".about__container .section__description",{
  ...scrollRevealOption,
  delay:500,
  interval:500
});
ScrollReveal().reveal(".about__container img",{
  ...scrollRevealOption,
  delay: 1500,
});


ScrollReveal().reveal(".service__container .section__header", {
  ...scrollRevealOption,
});
ScrollReveal().reveal(".service__container .section__description", {
  ...scrollRevealOption,
  delay:500,
});
ScrollReveal().reveal(".service__card", {
   duration:1000,
  delay:1000,
  interval:500
});


const swiper = new Swiper(".swiper",{
  loop:true,
  pagination:{
    el: ".swiper-pagination",
  },
});
ScrollReveal().reveal(".blog__content .section__header",{
  ...scrollRevealOption,
});
ScrollReveal().reveal(".blog__content h4",{
  ...scrollRevealOption,
  delay:500,
});
ScrollReveal().reveal(".blog__content p",{
  ...scrollRevealOption,
  delay:1000,
});
ScrollReveal().reveal(".blog__content .blog__btn",{
  ...scrollRevealOption,
  delay:1500,
});
const instagram = document.querySelector(".instagram__flex");

Array.from(instagram.children).forEach((item) => {
  const duplicateNode = item.cloneNode(true);
  duplicateNode.setAttribute("aria-hidden", true);
  instagram.appendChild(duplicateNode);
});
// ===== FILTERABLE IMAGE GALLERY =====
const filterButtons = document.querySelectorAll(".filter-buttons .btn");
const galleryItems = document.querySelectorAll(".gallery__item");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    const filter = button.getAttribute("data-filter");

    galleryItems.forEach((item) => {
      if (filter === "all" || item.classList.contains(filter)) {
        item.classList.remove("hide");
      } else {
        item.classList.add("hide");
      }
    });
  });
});

// ===== LIGHTBOX FUNCTIONALITY =====
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.querySelector(".lightbox-img");
const lightboxClose = document.querySelector(".lightbox-close");

document.querySelectorAll(".gallery__item img").forEach((img) => {
  img.addEventListener("click", () => {
    lightbox.style.display = "flex";
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
  });
});

lightboxClose.addEventListener("click", () => {
  lightbox.style.display = "none";
});

// Close on click outside image
lightbox.addEventListener("click", (e) => {
  if(e.target === lightbox){
    lightbox.style.display = "none";
  }
});
const lightboxPrev = document.querySelector(".lightbox-prev");
const lightboxNext = document.querySelector(".lightbox-next");

let currentIndex = 0;

const updateLightbox = (index) => {
  const img = galleryItems[index].querySelector("img");
  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt;
};

document.querySelectorAll(".gallery__item img").forEach((img, index) => {
  img.addEventListener("click", () => {
    currentIndex = index;
    lightbox.style.display = "flex";
    updateLightbox(currentIndex);
  });
});

lightboxPrev.addEventListener("click", (e) => {
  e.stopPropagation();
  currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
  updateLightbox(currentIndex);
});

lightboxNext.addEventListener("click", (e) => {
  e.stopPropagation();
  currentIndex = (currentIndex + 1) % galleryItems.length;
  updateLightbox(currentIndex);
});
// ===== LIGHTBOX KEYBOARD NAVIGATION =====
document.addEventListener("keydown", (e) => {
  if (lightbox.style.display === "flex") {
    if (e.key === "ArrowRight") {
      currentIndex = (currentIndex + 1) % galleryItems.length;
      updateLightbox(currentIndex);
    } else if (e.key === "ArrowLeft") {
      currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
      updateLightbox(currentIndex);
    } else if (e.key === "Escape") {
      lightbox.style.display = "none";
    }
  }
});

