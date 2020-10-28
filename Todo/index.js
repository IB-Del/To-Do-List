const app = document.getElementById("js-app");
const form = document.querySelector(".js-form"),
  input = form.querySelector("input[type='text']"),
  uncompleteList = document.querySelector(".js-uncompleted ul"),
  completeList = document.querySelector(".js-completed ul"),
  checkbox = document.querySelector("input[type='checkbox']"),
  errorElement = document.getElementById('error');



const createListItem = text => {
  const listItem = document.createElement("li");
  const input = document.createElement("input");
  input.type = "checkbox";
  const label = document.createElement("label");
  label.innerHTML = text;
  const editBtn = document.createElement("button");
  editBtn.innerHTML = "Edit";
  editBtn.classList.add("js-edit");
  const editInput = document.createElement("input");

  const deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = "Delete";
  deleteBtn.classList.add("js-delete");

  editInput.type = "text";
  listItem.appendChild(input);
  listItem.appendChild(label);
  listItem.appendChild(editBtn);
  listItem.appendChild(deleteBtn);
  listItem.appendChild(editInput);
  return listItem;
};


const completeToDo = event => {
  const button = event.target;
  const listItem = button.parentElement;
  const parentList = listItem.parentElement;
  parentList.removeChild(listItem);
  listItem.classList.add("completed");
  listItem.classList.remove("uncompleted");

  completeList.prepend(listItem);
  addEvents(listItem, uncompleteToDo);
};

const uncompleteToDo = event => {
  const button = event.target;
  const listItem = button.parentElement;
  const parentList = listItem.parentElement;
  parentList.removeChild(listItem);
  listItem.classList.remove("completed");
  listItem.classList.add("uncompleted");
  uncompleteList.prepend(listItem);
  addEvents(listItem, completeToDo);
};

const deleteToDo = event => {
  const button = event.target;
  const listItem = button.parentElement;
  const parentList = listItem.parentElement;
  parentList.removeChild(listItem);
};

const editToDo = event => {
  const listItem = event.target.parentElement;
  const editInput = listItem.querySelector("input[type=text]");
  const label = listItem.querySelector("label");

  const containsClass = listItem.classList.contains("editMode");
  //if the class of the parent is .editMode
  if (containsClass) {
    //switch from .editMode
    //Make label text become the input's value
    label.innerText = editInput.value;
  } else {
    //Switch to .editMode
    //input value becomes the label's text
    editInput.value = label.innerText;
  }


  // Toggle .editMode on the parent
  listItem.classList.toggle("editMode");
};

const handleFormSubmit = event => {
  event.preventDefault();
  const task = createListItem(input.value);
  console.log(task);
  uncompleteList.append(task);
  addEvents(task, completeToDo);
  input.value = "";
};

const addEvents = (listItem, checkboxFn) => {
  const editBtn = listItem.querySelector("button.js-edit");
  const deleteBtn = listItem.querySelector("button.js-delete");
  const checkbox = listItem.querySelector("input[type='checkbox']");
  editBtn.onclick = editToDo;
  deleteBtn.onclick = deleteToDo;
  checkbox.onclick = checkboxFn;
};


const date = document.getElementById("date");
options = {
  weekday: "long",
  month: "short",
  day: "numeric"
};
const today = new Date();
date.innerHTML = today.toLocaleDateString("en-US", options);


form.addEventListener("submit", handleFormSubmit);