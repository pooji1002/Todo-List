let tasks = [];
let confettiFired = false;

const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('task-list');
const progress = document.getElementById('Progress');
const numbers = document.getElementById('numbers');

taskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = taskInput.value.trim();
  if (text !== '') {
    tasks.push({ text, completed: false });
    taskInput.value = '';
    updateTasksList();
  }
});

const updateTasksList = () => {
  taskList.innerHTML = '';

  tasks.forEach((task, index) => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <div class="taskItem">
        <div class="task ${task.completed ? 'completed' : ''}">
          <input type="checkbox" class="checkbox" ${task.completed ? 'checked' : ''}/>
          <p class="task-text">${task.text}</p>
        </div>
        <div class="icons">
          <img src="edit.JPG" class="edit" alt="Edit" />
          <img src="image.png" class="delete" alt="Delete" />
        </div>
      </div>
    `;

    const checkbox = listItem.querySelector('.checkbox');
    const deleteBtn = listItem.querySelector('.delete');
    const editBtn = listItem.querySelector('.edit');
    const taskText = listItem.querySelector('.task-text');

    checkbox.addEventListener('change', () => {
      tasks[index].completed = checkbox.checked;
      updateTasksList();
    });

    deleteBtn.addEventListener('click', () => {
      tasks.splice(index, 1);
      updateTasksList();
    });

    editBtn.addEventListener('click', () => {
      const input = document.createElement('input');
      input.type = 'text';
      input.value = task.text;
      input.className = 'edit-input';

      input.addEventListener('blur', () => {
        saveEdit(input.value, index);
      });

      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          saveEdit(input.value, index);
        }
      });

      taskText.replaceWith(input);
      input.focus();
    });

    taskList.appendChild(listItem);
  });

  updateProgress();
};

const saveEdit = (newText, index) => {
  const trimmedText = newText.trim();
  if (trimmedText !== '') {
    tasks[index].text = trimmedText;
    updateTasksList();
  }
};

const updateProgress = () => {
  const total = tasks.length;
  const completed = tasks.filter(task => task.completed).length;

  numbers.textContent = `${completed} / ${total}`;

  const percentage = total === 0 ? 0 : (completed / total) * 100;
  progress.style.width = `${percentage}%`;

  checkAllCompleted();
};

const checkAllCompleted = () => {
  if (tasks.length > 0 && tasks.every(task => task.completed)) {
    const popup = document.getElementById('popup');
    popup.classList.add('active');

    if (!confettiFired) {
      confettiFired = true;
      confetti({
        spread: 360,
        ticks: 200,
        gravity: 0.4,
        decay: 0.9,
        startVelocity: 50,
        particleCount: 200,
        origin: { y: 0.6 }
      });
    }
  }
};

const closePopup = () => {
  const popup = document.getElementById('popup');
  popup.classList.remove('active');
  confettiFired = false;
};
