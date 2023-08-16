let form = document.forms[0];
let input = document.querySelector(".input");
let tasksDiv = document.querySelector(".tasks");
let clearBtn = document.querySelector(".clear");
let arrayOfTasks = [];
input.focus();

getDataFromLocalStorage();

if (window.localStorage.getItem("tasks")) {
  arrayOfTasks = JSON.parse(window.localStorage.getItem("tasks"));
}

// click on tasks div
tasksDiv.addEventListener("click", function (e) {
  // check if i click delete button
  if (e.target.tagName === "BUTTON") {
    // remove task from page
    e.target.parentElement.remove();
    // remove task from local storage
    DeleteTaskWith(e.target.parentElement.getAttribute("data-id"));
    if (tasksDiv.innerHTML !== "") {
      clearBtn.style.display = "block";
    } else {
      clearBtn.style.display = "none";
    }
    input.focus();
  }
  // check if i click the task
  if (e.target.classList.contains("task")) {
    // toggle the done class
    e.target.classList.toggle("done");
    // toggle the completed attripute
    toggleStateWith(e.target.getAttribute("data-id"));
    input.focus();
  }
});

form.onsubmit = (e) => {
  if (input.value !== "") {
    addTaskToArr(input.value);
    input.value = "";
  }
  input.focus();
  e.preventDefault();
};

function addTaskToArr(text) {
  // create task
  const task = {
    id: Date.now(),
    title: text,
    completed: false,
  };
  arrayOfTasks.push(task);
  addElementToPageFrom(arrayOfTasks);
  addDataToLocalStorageFrom(arrayOfTasks);
}

function addElementToPageFrom(arrayOfTasks) {
  // empty tasks div
  tasksDiv.innerHTML = "";

  arrayOfTasks.forEach(function (task) {
    // create task div
    let div = document.createElement("div");
    div.className = "task";
    if (task.completed) {
      div.className = "task done";
    }
    let p = document.createElement("p");
    p.innerHTML = task.title;
    div.append(p);
    div.setAttribute("data-id", `${task.id}`);
    // create delete button
    let button = document.createElement("button");
    button.innerHTML = "Delete";
    div.append(button);
    // add div into tasksdiv
    tasksDiv.append(div);
    if (tasksDiv.innerHTML !== "") {
      clearBtn.style.display = "block";
    } else {
      clearBtn.style.display = "none";
    }
  });
}

function addDataToLocalStorageFrom(arrayOfTasks) {
  window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}

function getDataFromLocalStorage() {
  let data = window.localStorage.getItem("tasks");
  if (data) {
    let tasks = JSON.parse(data);
    addElementToPageFrom(tasks);
  }
}

function DeleteTaskWith(taskid) {
  //   for (let i = 0; i < arrayOfTasks.length; i++) {
  //     console.log(`${arrayOfTasks[i].id} === ${taskid}`);
  //   }
  arrayOfTasks = arrayOfTasks.filter(function (task) {
    return task.id != taskid;
  });
  addDataToLocalStorageFrom(arrayOfTasks);
}

function toggleStateWith(taskid) {
  for (let i = 0; i < arrayOfTasks.length; i++) {
    if (arrayOfTasks[i].id == taskid) {
      arrayOfTasks[i].completed == false
        ? (arrayOfTasks[i].completed = true)
        : (arrayOfTasks[i].completed = false);
    }
  }
  addDataToLocalStorageFrom(arrayOfTasks);
}
clearBtn.onclick = () => {
  window.localStorage.clear();
  tasksDiv.innerHTML = "";
  clearBtn.style.display = "none";
  arrayOfTasks = [];
  input.focus();
};
