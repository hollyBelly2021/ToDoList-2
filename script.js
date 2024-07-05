const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const headerContainer = document.getElementById("header-container");
const toggleSwitch = document.getElementById("switch");
let icon = "";
const today = new Date();

function getFormattedDate() {
  const day = today.toLocaleDateString("en-US", { weekday: "short" });
  const month = today.toLocaleDateString("en-US", { month: "short" });
  const date = today.getDate();
  const year = today.getFullYear();

  return `${day} - ${month} ${date}, ${year}`;
}

function createIcon(imagePath) {
  const iconElement = document.createElement("img");
  iconElement.src = imagePath;
  return iconElement;
}

function addTask() {
  if (inputBox.value === "") {
    alert("Error: No text");
  } else {
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;
    listContainer.appendChild(li);
    li.appendChild(createIcon("assets/circle-regular-dark.svg"));
    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);
  }

  inputBox.value = "";
  icon = listContainer.querySelector("img");
  console.log(icon);
  //   saveData();
}

function checkedRemoveTask(e) {
  if (e.target.tagName === "LI") {
    e.target.classList.toggle("checked");

    // saveData();
  } else if (e.target.tagName === "SPAN") {
    e.target.parentElement.remove();
    // saveData();
  }
}

function switchTheme(e) {
  if (event.target.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
  }
}

function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}
// function showTask() {
//   listContainer.innerHTML = localStorage.getItem("data");
// }

listContainer.addEventListener("click", checkedRemoveTask, false);
toggleSwitch.addEventListener("change", switchTheme);
headerContainer.innerHTML = `<p> ${getFormattedDate()} </p>`;
// showTask();
