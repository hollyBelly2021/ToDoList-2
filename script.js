const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const headerContainer = document.getElementById("header-container");
const toggleSwitch = document.getElementById("switch");
const navContainer = document.querySelector(".nav-container");
const givenLI = document.querySelector("li");
const iconSunMoon = navContainer.querySelector("i");
const LIGHT_MODE = "light";
const DARK_MODE = "dark";
const today = new Date();

function getFormattedDate() {
  const day = today.toLocaleDateString("en-US", { weekday: "short" });
  const month = today.toLocaleDateString("en-US", { month: "short" });
  const date = today.getDate();
  const year = today.getFullYear();

  return `${day} - ${month} ${date}, ${year}`;
}

function addTask() {
  if (inputBox.value === "") {
    alert("Error: No text");
  } else {
    let li = document.createElement("li");
    li.innerHTML = `<i></i>${inputBox.value}`;
    // let iconElement = li.querySelector("i");
    // iconElement.classList.add("fa-regular", "fa-circle");

    // li.addEventListener("click", changeIconOnClick);
    listContainer.appendChild(li);

    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);
  }

  inputBox.value = "";
  saveData();
}

function changeIconOnClick(event) {
  console.log(event.target);
  const clickedLi = event.currentTarget;
  const iconElement = clickedLi.querySelector("i");
  if (event.target.tagName === "LI") {
    iconElement.classList.toggle("fa-solid");
    event.target.classList.toggle("checked");
    saveData();
  } else if (event.target.tagName === "SPAN") {
    event.target.parentElement.remove();
    saveData();
  }
}
listContainer.addEventListener("click", changeIconOnClick, false);

// function checkedRemoveTask(e) {
//   //   saveData();
// }

function switchTheme(e) {
  if (event.target.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
    toggleLightDarkMode(true);
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    toggleLightDarkMode(false);
    localStorage.setItem("theme", "light");
  }
}

function toggleLightDarkMode(isDark) {
  isDark
    ? iconSunMoon.classList.replace("fa-sun", "fa-moon")
    : iconSunMoon.classList.replace("fa-moon", "fa-sun");
}

function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}
function showTask() {
  listContainer.innerHTML = localStorage.getItem("data");
}

const currentTheme = localStorage.getItem("theme");
if (currentTheme) {
  document.documentElement.setAttribute("data-theme", currentTheme);
  if (currentTheme === "dark") {
    toggleSwitch.checked = true;
    toggleLightDarkMode(true);
  }
}
toggleSwitch.addEventListener("change", switchTheme);
headerContainer.innerHTML = `<p> ${getFormattedDate()} </p>`;

showTask();
// localStorage.clear();
