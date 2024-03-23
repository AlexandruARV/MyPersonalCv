import { generateSkills } from "./usefulScripts/generateSkills.js";

const navSkills = document.querySelector(".skills__flex");
const showSkills = document.querySelectorAll(".show__skills");
const arrows = document.querySelectorAll(".btn__arrow");

const scrollingAnimation = function () {
  document.querySelector(".nav_list").addEventListener("click", (e) => {
    if (e.target.getAttribute("class") === "nav__link") {
      e.preventDefault();
      const id = e.target.getAttribute("href");
      const section = document.querySelector(`${id}`);
      section.scrollIntoView({ behavior: "smooth" });
    }
  });
};

scrollingAnimation();

let clickedID;

navSkills.addEventListener("click", (e) => {
  const clicked = e.target.closest(".skills__category");

  if (!clicked) return;

  const showItems = clicked.closest(".container__skills").children[1];
  const arrowAnim = clicked.children[1];

  if (clickedID === clicked.id && showItems.style.opacity === "1") {
    showItems.style.opacity = 0;
    arrowAnim.classList.remove("roation__animation");
  } else {
    showSkills.forEach((el) => (el.style.opacity = 0));
    arrows.forEach((el) => el.classList.remove("roation__animation"));

    showItems.style.opacity = 1;
    arrowAnim.classList.add("roation__animation");
  }

  clickedID = clicked.id;
});

const getSkills = async function (url) {
  const res = await fetch(`${url}`);
  const data = await res.json();
  const myData = data[0];

  showSkills.forEach((el) => {
    generateSkills(myData, el);
  });
};

getSkills(`./skills.json`);

const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");
const slides = document.querySelectorAll(".slide");
const slider = document.querySelector(".slider");

const dotsContainer = document.querySelector(".dots");

const maxSlides = slides.length;
let curSlide = 0;

const createDots = function () {
  slides.forEach((_, i) => {
    dotsContainer.insertAdjacentHTML(
      "beforeend",
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};
createDots();

const activeDot = function (slide) {
  const allDots = document.querySelectorAll(".dots__dot");
  allDots.forEach((dot) => dot.classList.remove("dots__dot--active"));

  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add("dots__dot--active");
};

const goToSlide = function (slide) {
  slides.forEach((el, i) => {
    el.style.transform = `translateX(${100 * (i - slide)}%)`;
  });
  activeDot(slide);
};

const nextSlide = function () {
  if (curSlide === maxSlides - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  goToSlide(curSlide);
};

const prevSlide = function () {
  if (curSlide === 0) {
    curSlide = maxSlides - 1;
  } else {
    curSlide--;
  }
  goToSlide(curSlide);
};

goToSlide(0);

btnRight.addEventListener("click", nextSlide);

btnLeft.addEventListener("click", prevSlide);

addEventListener("keydown", (event) => {
  event.preventDefault();
  if (event.key === "ArrowLeft") {
    prevSlide();
  } else if (event.key === "ArrowRight") {
    nextSlide();
  }
});

dotsContainer.addEventListener("click", (e) => {
  console.log(+e.target.dataset.slide);
  if (e.target.classList.contains("dots__dot")) {
    goToSlide(e.target.dataset.slide);
  }
});
