const userInput = document.querySelector('.task-input input');
let tasks = JSON.parse(localStorage.getItem('Tasks'));
const tasksList = document.getElementById('task-box');

let editId;
let isEditedTask = false;

function showTasks() {
  let li = '';
  if (tasks) {
    tasks.forEach((task, id) => {
      li += `<li class="task">
        <label for="${id}">
            <input onclick="updateStatus(this)" type="checkbox" id="${id}" >
            <p>${task.description}</p>
        </label>
        <div class="settings">
            <img onclick="showOptions(this) "src="./images/more.png" class="dots" alt="icon">
             <ul class="task-menu">
                <li><img onclick="editTask(${id},'${task.description}')" src="./images/edit.png" id="editpen" class="dots" alt="edit"></li>
                <li><img onclick="deleteTask(${id})" src="./images/delete.png" id="deletebin" class="dots" alt="delete"></li>
             </ul>
                </div>
            </li>`;
    });
  }
  tasksList.innerHTML = li;
}
showTasks();

function updateStatus(thisTask) {
  const taskDescription = thisTask.parentElement.lastElementChild;
  if (thisTask.checked) {
    taskDescription.classList.toggle('completed');
    tasks[thisTask.id].completed = true;
  } else {
    taskDescription.classList.toggle('completed');
    tasks[thisTask.id].completed = false;
  }
  localStorage.setItem('Tasks', JSON.stringify(tasks));
}

function showOptions(thisTask) {
  const taskMenu = thisTask.parentElement.lastElementChild;
  taskMenu.classList.add('show');
  document.addEventListener('click', (e) => {
    if (e.target !== thisTask) {
      taskMenu.classList.remove('show');
    }
  });
}

function editTask(taskId, taskDescription) {
  editId = taskId;
  isEditedTask = true;
  userInput.value = taskDescription;
}

function deleteTask(deleteid) {
  tasks.splice(deleteid, 1);
  localStorage.setItem('Tasks', JSON.stringify(tasks));
  showTasks();
}

userInput.addEventListener('keyup', (e) => {
  const userTask = userInput.value.trim();
  if (e.key === 'Enter' && userTask) {
    if (!isEditedTask) {
      if (!tasks) {
        tasks = [];
      }
      const taskInfo = { description: userTask, completed: false };
      tasks.push(taskInfo);
    } else {
      isEditedTask = false;
      tasks[editId].description = userTask;
    }
    userInput.value = '';
    localStorage.setItem('Tasks', JSON.stringify(tasks));
    showTasks();
  }
});

const deletebutton = document.getElementById('delete');

deletebutton.addEventListener('click', (e) => {
  const checkedtasks = Array.from(document.querySelectorAll('input[type=checkbox]:checked'));
  console.log(checkedtasks);
  e.preventDefault();
  checkedtasks.forEach((task) => {
    tasks.splice(task.id, 1);
    task.parentElement.parentElement.remove();

    localStorage.setItem('Tasks', JSON.stringify(tasks));
  });
});

updateStatus();
showOptions();
editTask();
deleteTask();