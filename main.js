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
  if (e.target.classList.contains("delete")) {
    // remove task from page
    e.target.parentElement.remove();
    // remove task from local storage
    DeleteTaskWith(e.target.parentElement.getAttribute("data-id"));
    // styling the clear button
    if (tasksDiv.innerHTML !== "") {
      clearBtn.style.display = "block";
    } else {
      clearBtn.style.display = "none";
    }
  }
  // check if i click the edit button
  if (e.target.classList.contains("edit")) {
    let paragraph = e.target.previousElementSibling;
    paragraph.setAttribute("contenteditable", "true");
    paragraph.style.border = "1px dashed #429ebd";
    paragraph.style.flex = "1";
    paragraph.style.padding = "2px 0 2px 10px";
    paragraph.style.outline = "none";
    paragraph.style.caretColor = "#429ebd";
    //create close button for the edit option
    let close = document.createElement("span");
    close.className = "close";
    paragraph.parentElement.append(close);
    // edit the task
    close.addEventListener("click", (e) => {
      // edit the task in the local storage
      arrayOfTasks.forEach((task) => {
        if (task.id == close.parentElement.getAttribute("data-id")) {
          task.title = paragraph.innerHTML;
        }
        addDataToLocalStorageFrom(arrayOfTasks);
      });
      // to remove the edit effects
      paragraph.setAttribute("contenteditable", "false");
      paragraph.style.border = "none";
      paragraph.style.flex = "0";
      paragraph.style.padding = "0";
      close.remove();
    });
  }

  // check if i click the task
  if (e.target.classList.contains("task")) {
    // toggle the done class
    e.target.classList.toggle("done");
    // toggle the completed attripute
    toggleStateWith(e.target.getAttribute("data-id"));
  }
});

form.onsubmit = (e) => {
  if (input.value !== "") {
    addTaskToArr(input.value);
    input.value = "";
  }

  e.preventDefault();
};

function addTaskToArr(text) {
  // create task
  const task = {
    id: Date.now(),
    title: text,
    completed: false,
  };
  // add tasks to the array of tasks
  arrayOfTasks.push(task);
  addElementToPageFrom(arrayOfTasks);
  addDataToLocalStorageFrom(arrayOfTasks);
}

function addElementToPageFrom(arrayOfTasks) {
  // empty tasks div
  tasksDiv.innerHTML = "";
  // create task div
  arrayOfTasks.forEach(function (task) {
    // create the box container
    let box = document.createElement("div");
    box.className = "task";
    box.setAttribute("data-id", task.id);
    // create delete button
    let deleteBtn = document.createElement("span");
    deleteBtn.className = "delete";
    // create Edit Button
    let editBtn = document.createElement("span");
    editBtn.className = "edit";
    // create the paragraph
    let p = document.createElement("p");
    p.className = "paragraph";
    if (task.completed) {
      task.className = "task done";
    }
    p.innerHTML = task.title;
    // add the box container into tasksdiv
    box.append(p, editBtn, deleteBtn);
    tasksDiv.append(box);
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
  // for (let i = 0; i < arrayOfTasks.length; i++) {
  //   console.log(`${arrayOfTasks[i].id} === ${taskid}`);
  // }
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
};
