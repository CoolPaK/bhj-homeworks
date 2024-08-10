// Получаем необходимые элементы
const taskInput = document.getElementById('task__input');
const addTaskBtn = document.getElementById('tasks__add');
const taskList = document.getElementById('tasks__list');
const taskForm = document.getElementById('tasks__form');

// Функция для создания новой задачи с использованием шаблонных строк
function createTask(title) {
    return `
        <div class="task">
            <div class="task__title">${title}</div>
            <a href="#" class="task__remove">&times;</a>
        </div>
    `;
}

// Функция для добавления новой задачи
function addTask(event) {
    event.preventDefault(); // предотвращаем стандартное действие формы
    const taskTitle = taskInput.value.trim();
    if (taskTitle !== '') {
        taskList.insertAdjacentHTML('afterbegin', createTask(taskTitle));
        taskInput.value = ''; // очищаем поле ввода
        saveTasks(); // сохраняем задачи
    }
}

// Функция для удаления задачи
function removeTask(event) {
    if (event.target.classList.contains('task__remove')) {
        const task = event.target.closest('.task');
        taskList.removeChild(task);
        saveTasks();
    }
}

// Функция для сохранения задач в localStorage
function saveTasks() {
    const tasks = Array.from(taskList.children).map(task => task.querySelector('.task__title').textContent);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Функция для загрузки задач из localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        taskList.insertAdjacentHTML('afterbegin', createTask(task));
    });
}

// Добавление обработчиков событий
taskForm.addEventListener('submit', addTask); // обработка события сабмита формы
taskList.addEventListener('click', removeTask); // обработка события клика для удаления задачи

// Загрузка задач при загрузке страницы
loadTasks();