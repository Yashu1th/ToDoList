document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("task_input");
    const taskTime = document.getElementById("task_time");
    const addButton = document.getElementById("push");
    const tasksContainer = document.querySelector(".tasks");
    const progressBar = document.getElementById("progress");
  
    const soundAdd = document.getElementById("sound-add");
    const soundComplete = document.getElementById("sound-complete");
    const soundDelete = document.getElementById("sound-delete");
  
    const playSound = (sound) => {
      if (sound) sound.play();
    };
  
    const loadTasks = () => JSON.parse(sessionStorage.getItem("tasks")) || [];
  
    const saveTasks = (tasks) => {
      sessionStorage.setItem("tasks", JSON.stringify(tasks));
    };
  
    const updateProgress = () => {
      const tasks = loadTasks();
      const completedTasks = tasks.filter((task) => task.completed);
      const progress =
        tasks.length > 0 ? (completedTasks.length / tasks.length) * 100 : 0;
      progressBar.style.width = progress + "%";
    };
  
    const renderTasks = () => {
      const tasks = loadTasks();
      tasksContainer.innerHTML = "";
  
      tasks.forEach((task) => {
        const taskElement = document.createElement("div");
        taskElement.classList.add("task");
        if (task.completed) taskElement.classList.add("completed");
  
        // Tick button
        const tickButton = document.createElement("div");
        tickButton.classList.add("tick");
        if (task.completed) tickButton.classList.add("completed");
        tickButton.onclick = (e) => {
          e.stopPropagation();
          playSound(soundComplete);
          task.completed = !task.completed;
          saveTasks(tasks);
          renderTasks();
          updateProgress();
        };
  
        // Task name and time
        const taskName = document.createElement("span");
        taskName.textContent = `${task.name} (${task.time || "No time set"})`;
  
        // Delete button
        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
        deleteButton.onclick = (e) => {
          e.stopPropagation();
          playSound(soundDelete);
          const updatedTasks = tasks.filter((t) => t.id !== task.id);
          saveTasks(updatedTasks);
          renderTasks();
          updateProgress();
        };
  
        // Append elements
        taskElement.appendChild(tickButton);
        taskElement.appendChild(taskName);
        taskElement.appendChild(deleteButton);
  
        tasksContainer.appendChild(taskElement);
      });
    };
  
    addButton.onclick = () => {
      const taskValue = taskInput.value.trim();
      const taskTimeValue = taskTime.value.trim();
  
      if (!taskValue) {
        alert("Please enter a task!");
        return;
      }
  
      const tasks = loadTasks();
      if (tasks.some((task) => task.name === taskValue)) {
        alert("Task with the same name already exists!");
        return;
      }
  
      playSound(soundAdd);
  
      const newTask = {
        id: Date.now(), // Unique ID for the task
        name: taskValue,
        time: taskTimeValue || "No time set",
        completed: false,
      };
      tasks.push(newTask);
      saveTasks(tasks);
  
      taskInput.value = "";
      taskTime.value = "";
      renderTasks();
      updateProgress();
    };
  
    renderTasks();
    updateProgress();
  });
  