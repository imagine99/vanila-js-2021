
const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-pending"),
  toDoFinished = document.querySelector(".js-finished");

const PENDING_LS = "PENDING";
const FINISHED_LS = "FINISHED";
let toDos = [];
let toDosFinished = [];

function genRandom() {
  const number = Math.floor(Math.random() * 999999999);
  return number;
}

function saveToDos() {
  localStorage.setItem(PENDING_LS, JSON.stringify(toDos));
}
function saveToDosFinished() {
  localStorage.setItem(FINISHED_LS, JSON.stringify(toDosFinished));
}
function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  const cleanToDos = toDos.filter((toDo) => {
    return toDo.id !== parseInt(li.id);
  });
  toDos = cleanToDos;
  saveToDos();
}
function deleteFinished(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDoFinished.removeChild(li);
  const cleanToDos = toDosFinished.filter((toDo) => {
    return toDo.id !== parseInt(li.id);
  });
  toDosFinished = cleanToDos;
  saveToDosFinished();
}
function checkToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  paintFinished(parseInt(li.id));
  const cleanToDos = toDos.filter((toDo) => {
    return toDo.id !== parseInt(li.id);
  });
  toDos = cleanToDos;
  saveToDos();
}
function backToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  paintToDoBack(parseInt(li.id));
  toDoFinished.removeChild(li);
  const cleanToDos = toDosFinished.filter((toDo) => {
    return toDo.id !== parseInt(li.id);
  });
  toDosFinished = cleanToDos;
  saveToDosFinished();
}

function paintToDo(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const checkBtn = document.createElement("button");

  const span = document.createElement("span");
  const newId = genRandom();
  checkBtn.value = "✔";
  checkBtn.addEventListener("click", checkToDo);
  delBtn.value = "❌";
  delBtn.addEventListener("click", deleteToDo);
  span.innerHTML = text;
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(checkBtn);
  li.id = newId;
  toDoList.appendChild(li);
  const toDoObj = {
    text: text,
    id: newId
  };
  toDos.push(toDoObj);
  saveToDos();
}
function paintToDoFinished(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const backBtn = document.createElement("button");

  const span = document.createElement("span");
  const newId = genRandom();
  backBtn.value = "⏪";
  backBtn.addEventListener("click", backToDo);
  delBtn.value = "❌";
  delBtn.addEventListener("click", deleteFinished);
  span.innerHTML = text;
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(backBtn);
  li.id = newId;
  toDoFinished.appendChild(li);
  const toDoObj = {
    text: text,
    id: newId
  };
  toDosFinished.push(toDoObj);
  saveToDosFinished();
}
function paintToDoBack(backId) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const checkBtn = document.createElement("button");

  const span = document.createElement("span");
  const newId = backId;
  const toDo = toDosFinished.find((toDo) => {
    return toDo.id === newId;
  });
  const text = toDo.text;
  checkBtn.value = "✔";
  checkBtn.addEventListener("click", checkToDo);
  delBtn.value = "❌";
  delBtn.addEventListener("click", deleteToDo);
  span.innerHTML = text;
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(checkBtn);
  li.id = newId;
  toDoList.appendChild(li);
  const toDoObj = {
    text: text,
    id: newId
  };
  toDos.push(toDoObj);
  saveToDos();
}
function paintFinished(checkedId) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const backBtn = document.createElement("button");

  const span = document.createElement("span");
  const newId = checkedId;
  const toDo = toDos.find((toDo) => {
    return toDo.id === newId;
  });
  const text = toDo.text;
  backBtn.value = "⏪";
  backBtn.addEventListener("click", backToDo);
  delBtn.value = "❌";
  delBtn.addEventListener("click", deleteFinished);
  span.innerHTML = text;
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(backBtn);
  li.id = newId;
  toDoFinished.appendChild(li);
  const toDoObj = {
    text: text,
    id: newId
  };
  toDosFinished.push(toDoObj);
  saveToDosFinished();
}
function handleSubmit(event) {
  event.preventDefault();
  const curtValue = toDoInput.value;
  paintToDo(curtValue);
  toDoInput.value = "";
}
function loadToDos() {
  const loadedToDos = localStorage.getItem(PENDING_LS);
  const loadedFinished = localStorage.getItem(FINISHED_LS);

  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach((toDo) => {
      paintToDo(toDo.text);
    });
  }
  if (loadedFinished !== null) {
    const parsedToDosFinished = JSON.parse(loadedFinished);
    parsedToDosFinished.forEach((toDo) => {
      paintToDoFinished(toDo.text);
    });
  }
}
function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}
init();
