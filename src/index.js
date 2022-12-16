import Methods from './modules/methods.js';
import ShowOnScreen from './modules/showScreen.js';
import './styles.css';

const taskList = document.getElementById('task-box');
const form = document.getElementById('task_form');
const taskInput = document.getElementById('description');
const clearB = document.getElementById('delete');

const tasks = new Methods('Tasks', JSON.parse(localStorage.getItem('Tasks')) || []);
const visible = new ShowOnScreen(taskList);

form.addEventListener('submit', (e) => {
  e.preventDefault();
  tasks.addItem(taskInput.value);
  visible.show(tasks.getItems());
  taskInput.value = '';
});

taskList.addEventListener('click', (e) => {
  if (e.target.matches('.dotsb')) {
    const input = document.getElementById(
      `description${e.target.dataset.index}`,
    );
    const listItem = document.getElementById(
      `list-item${e.target.dataset.index}`,
    );
    const moreIcon = document.getElementById(`more${e.target.dataset.index}`);
    const deleteIcon = document.getElementById(
      `deletebin${e.target.dataset.index}`,
    );
    input.disabled = false;
    listItem.style = 'background-color: rgb(234, 225, 225)';
    moreIcon.style = 'display: none';
    deleteIcon.style = 'display: block';
  }

  if (e.target.matches('.dotsd')) {
    tasks.removeItem(e.target.dataset.id);
    visible.show(tasks.getItems());
  }
  if (e.target.matches('.checkbox')) {
    let value = false;
    if (e.target.checked) value = true;
    tasks.updateItem(e.target.dataset.index, 'completed', value);
    visible.show(tasks.getItems());
  }
});
taskList.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    tasks.updateItem(e.target.dataset.index, 'description', e.target.value);
    visible.show(tasks.getItems());
  }
});

clearB.addEventListener('click', () => {
  tasks.removeAllCompleted();
  visible.show(tasks.getItems());
});
window.addEventListener('load', visible.show(tasks.getItems()));