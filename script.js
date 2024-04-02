const createBtn = document.getElementById("create-btn");
const list = document.getElementById("list");
const text = document.getElementById("text");

let todos = [];

text.onchange = (e) => {
  e.target.value;
};

text.onkeydown = (e) => {
  if (e.key === "Enter") {
    createTodos();
  }
};

createBtn.onclick = () => {
  createTodos();
};

const createTodos = () => {
  const todo = {
    id: new Date().getTime(),
    text: text.value,
    complete: false,
  };

  todos.unshift(todo);

  const { todoWrap } = createList(todo);

  list.prepend(todoWrap);
  text.value = "";

  saveToLocalStorage();
};

const createList = (todo) => {
  const todoWrap = document.createElement("div");
  todoWrap.className = "list-content";

  const todoCheck = document.createElement("input");
  todoCheck.type = "checkbox";
  todoCheck.className = "list-check";
  todoCheck.checked = todo.complete;

  const todoText = document.createElement("input");
  todoText.type = "text";
  todoText.className = "list-text";
  todoText.value = todo.text;
  todoText.setAttribute("disabled", "");

  const todoEdit = document.createElement("button");
  todoEdit.className = "list-btn";
  todoEdit.innerText = "수정";

  const todoRemove = document.createElement("button");
  todoRemove.className = "list-btn";
  todoRemove.innerText = "제거";

  todoCheck.addEventListener("change", () => {
    todo.complete = todoCheck.checked;
    saveToLocalStorage();
    if (todo.complete) {
      todoText.classList.add("complete");
    } else {
      todoText.classList.remove("complete");
    }
  });

  if (todo.complete) {
    todoText.classList.add("complete");
  }

  todoText.addEventListener("blur", () => {
    todoText.setAttribute("disabled", "");
    saveToLocalStorage();
  });

  todoEdit.addEventListener("click", () => {
    todoText.removeAttribute("disabled");
    todoText.focus();
  });

  todoText.addEventListener("input", () => {
    todo.text = todoText.value;
  });

  todoRemove.addEventListener("click", () => {
    todos = todos.filter((t) => t.id !== todo.id);
    todoWrap.remove();
    saveToLocalStorage();
  });

  todoWrap.append(todoCheck);
  todoWrap.append(todoText);
  todoWrap.append(todoEdit);
  todoWrap.append(todoRemove);

  return { todoWrap, todoText };
};

const saveToLocalStorage = () => {
  const data = JSON.stringify(todos);

  window.localStorage.setItem("todos", data);
};

const loadFromLocalStorage = () => {
  const data = localStorage.getItem("todos");

  if (data) {
    todos = JSON.parse(data);
  }
};

const displayTodos = () => {
  loadFromLocalStorage();

  todos.map((t) => {
    const todo = t;
    const { todoWrap } = createList(todo);

    list.append(todoWrap);
  });
};

displayTodos();
