//Scroll to top
let uptext = document.createTextNode("UP");
let updiv = document.createElement("div");
updiv.appendChild(uptext);
updiv.classList.add("up");
document.body.appendChild(updiv);

window.onscroll = function () {
  if (window.scrollY >= 80) updiv.style.cssText = "display:block;";
  else updiv.style.cssText = "display:none;";
};
updiv.onclick = function () {
  window.scrollTo({
    left: 0,
    top: 0,
    behavior: "smooth",
  });
};

let task = document.querySelector(".text");
let addTaskBtn = document.querySelector(".btn");
let taskdiv = document.querySelector(".tasks");
let notasks;
// localStorage.clear();
// save the counter of tasks
if (localStorage.getItem("Counter")) notasks = localStorage.getItem("Counter");
else {
  notasks = 0;
  localStorage.setItem("Counter", notasks);
}
if (notasks > 0) {
  for (let x = 0; x < notasks; x++) {
    if (localStorage.getItem(x) !== null) addtask(localStorage.getItem(x), x);
  }
}

addTaskBtn.onclick = function () {
  let data = task.value;
  if (data.length > 0) {
    localStorage.setItem(notasks, data);
    addtask(data, notasks);
    incrCounter();
    cleartextbox();
  }
};

function addtask(taskdata, ID) {
  let tasktext = document.createTextNode(taskdata);
  let para = document.createElement("p");
  para.appendChild(tasktext);
  let taskcont = document.createElement("div");
  taskcont.classList.add("taskData");
  taskcont.setAttribute("TaskID", ID);
  let deletext = document.createTextNode("Delete");
  let dele = document.createElement("button");
  dele.classList = "dele";
  dele.appendChild(deletext);
  taskcont.appendChild(para);
  taskcont.appendChild(dele);
  taskdiv.appendChild(taskcont);
}
taskdiv.addEventListener("click", (e) => {
  deletask(e);
});

function incrCounter() {
  notasks++;
  localStorage.setItem("Counter", notasks);
}

function decrCounter() {
  if (notasks <= 0) notasks = 0;
  else notasks--;
  localStorage.setItem("Counter", notasks);
}

function deletask(el) {
  if (el.target.classList.contains("dele")) {
    el.target.parentElement.remove();
    localStorage.removeItem(el.target.parentElement.getAttribute("TaskID"));
    decrCounter();
  }
}

function cleartextbox() {
  task.value = "";
}
