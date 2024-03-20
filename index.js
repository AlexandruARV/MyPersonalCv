"use strict";

const showSkills = document.querySelectorAll(".show__skills");
const skills = document.querySelectorAll(".skills");

const navSkills = document.querySelector(".skills__flex");

const containerSkills = document.querySelectorAll(".skills__category");
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

let html = "";

const getSkills = async function (url) {
  const res = await fetch(`${url}`);
  const data = await res.json();
  const myData = data[0];

  showSkills.forEach((el) => {
    for (const [key, value] of Object.entries(myData[el.id])) {
      html += `<div class="skills__named">
    <div class="prog__language">${key}</div>
    <div class="percentage">${value}%</div>
    </div>
    <progress class="progress__bar" value="${value}" max="100"></progress>`;
    }
    el.innerHTML = html;
    html = "";
  });

  // for (const [key, value] of Object.entries(b)) {
  //   html += `<div class="skills__named">
  //   <div class="prog__language">${key}</div>
  //   <div class="percentage">${value}%</div>
  //   </div>
  //   <progress class="progress__bar" value="${value}" max="100"></progress>`;
  // }
  // // showSkills.innerHTML = html;
  return data;
};

getSkills(`/skills.json`);
