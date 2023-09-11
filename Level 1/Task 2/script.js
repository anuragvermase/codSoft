const taskInput = document.getElementById("task");
const taskList = document.getElementById("taskList");

// Function to add a new task
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
        const tasks = getTasksFromLocalStorage();
        tasks.push({ text: taskText });
        saveTasksToLocalStorage(tasks);
        renderTasks();
        taskInput.value = "";
    }
}

// Function to retrieve tasks from local storage
function getTasksFromLocalStorage() {
    const tasksJSON = localStorage.getItem("tasks");
    return tasksJSON ? JSON.parse(tasksJSON) : [];
}

// Function to save tasks to local storage
function saveTasksToLocalStorage(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to render tasks
function renderTasks() {
    const tasks = getTasksFromLocalStorage();
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const listItem = document.createElement("li");
        const taskInput = document.createElement("input");
        const editButton = document.createElement("button");
        const deleteButton = document.createElement("button");

        taskInput.type = "text";
        taskInput.value = task.text;
        taskInput.disabled = true;
        taskInput.addEventListener("change", () => editTask(index, taskInput.value));

        editButton.textContent = "Edit";
        editButton.classList.add("edit-button");
        editButton.addEventListener("click", () => toggleEdit(index, taskInput));

        deleteButton.textContent = "Delete";
        deleteButton.classList.add("delete-button");
        deleteButton.addEventListener("click", () => deleteTask(index));

        listItem.appendChild(taskInput);
        listItem.appendChild(editButton);
        listItem.appendChild(deleteButton);

        taskList.appendChild(listItem);
    });
}

// Function to edit a task
function editTask(index, newText) {
    const tasks = getTasksFromLocalStorage();
    tasks[index].text = newText;
    saveTasksToLocalStorage(tasks);
}

// Function to toggle task editing
function toggleEdit(index, taskInput) {
    taskInput.disabled = !taskInput.disabled;
    taskInput.focus();
}

// Function to delete a task
function deleteTask(index) {
    const tasks = getTasksFromLocalStorage();
    tasks.splice(index, 1);
    saveTasksToLocalStorage(tasks);
    renderTasks();
}

// Initial rendering of tasks
renderTasks();