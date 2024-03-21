import { generateSkills } from "./usefulScripts/generateSkills.js";

const navSkills = document.querySelector(".skills__flex");
const showSkills = document.querySelectorAll(".show__skills");
const arrows = document.querySelectorAll(".btn__arrow");

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
