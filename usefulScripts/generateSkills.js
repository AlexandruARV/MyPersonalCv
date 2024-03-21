export function generateSkills(data, element) {
  let html = "";
  for (const [key, value] of Object.entries(data[element.id])) {
    html += `<div class="skills__named">
  <div class="prog__language">${key}</div>
  <div class="percentage">${value}%</div>
  </div>
  <progress class="progress__bar" value="${value}" max="100"></progress>`;
  }
  element.innerHTML = html;
  html = "";
}
