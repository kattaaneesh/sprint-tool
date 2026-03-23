const API = "http://localhost:3000/tasks";

// Load Tasks
async function loadTasks() {
  const res = await fetch(API);
  const tasks = await res.json();

  document.getElementById("todo").innerHTML = "<h2>To Do</h2>";
  document.getElementById("progress").innerHTML = "<h2>In Progress</h2>";
  document.getElementById("done").innerHTML = "<h2>Done</h2>";

  tasks.forEach(task => {
    const div = document.createElement("div");
    div.className = "task";
    div.innerText = task.title;

    div.onclick = () => moveTask(task);

    if (task.status === "todo")
      document.getElementById("todo").appendChild(div);
    else if (task.status === "progress")
      document.getElementById("progress").appendChild(div);
    else
      document.getElementById("done").appendChild(div);
  });
}

// Add Task
async function addTask() {
  const title = document.getElementById("taskTitle").value;

  await fetch(API, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      title,
      description: "",
      status: "todo",
      sprintId: 1
    })
  });

  loadTasks();
}

// Move Task
async function moveTask(task) {
  let newStatus = "progress";

  if (task.status === "progress") newStatus = "done";

  await fetch(API + "/" + task.id, {
    method: "PUT",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ status: newStatus })
  });

  loadTasks();
}

loadTasks();