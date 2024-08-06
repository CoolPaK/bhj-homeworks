// Получаем необходимые элементы
const taskInput = document.getElementById('task__input');
const addTaskBtn = document.getElementById('tasks__add');
const taskList = document.getElementById('tasks__list');

// Функция для создания новой задачи
function createTask(title) {
    const taskDiv = document.createElement('div');
    taskDiv.classList.add('task');

    const titleDiv = document.createElement('div');
    titleDiv.classList.add('task__title');
    titleDiv.textContent = title;

    const removeBtn = document.createElement('a');
    removeBtn.classList.add('task__remove');
    removeBtn.href = '#';
    removeBtn.textContent = '×';
    removeBtn.addEventListener('click', () => removeTask(taskDiv));

    taskDiv.appendChild(titleDiv);
    taskDiv.appendChild(removeBtn);

    return taskDiv;
}

// Функция для добавления новой задачи
function addTask() {
    const taskTitle = taskInput.value.trim();
    if (taskTitle !== '') {
        const newTask = createTask(taskTitle);
        taskList.appendChild(newTask);
        taskInput.value = '';
        saveTasks();
    }
}

// Функция для удаления задачи
function removeTask(task) {
    taskList.removeChild(task);
    saveTasks();
}

// Функция для сохранения задач в localStorage
function saveTasks() {
    const tasks = Array.from(taskList.children).map(task => task.children[0].textContent);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Функция для загрузки задач из localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        const newTask = createTask(task);
        taskList.appendChild(newTask);
    });
}

// Дополнительные функции повышенного уровня сложности

// Функция для сортировки задач по алфавиту
function sortTasks() {
    const tasks = Array.from(taskList.children);
    tasks.sort((a, b) => a.children[0].textContent.localeCompare(b.children[0].textContent));
    taskList.innerHTML = '';
    tasks.forEach(task => taskList.appendChild(task));
    saveTasks();
}

// Функция для редактирования задачи
function editTask(task) {
    const titleDiv = task.children[0];
    const editInput = document.createElement('input');
    editInput.type = 'text';
    editInput.value = titleDiv.textContent;
    editInput.classList.add('task__title--edit');
    titleDiv.replaceWith(editInput);

    const saveBtn = document.createElement('a');
    saveBtn.classList.add('task__save');
    saveBtn.href = '#';
    saveBtn.textContent = '✓';
    saveBtn.addEventListener('click', () => {
        const newTitle = editInput.value.trim();
        if (newTitle !== '') {
            titleDiv.textContent = newTitle;
            editInput.replaceWith(titleDiv);
            saveTasks();
        }
    });
    task.appendChild(saveBtn);
}

// Добавление обработчиков событий
addTaskBtn.addEventListener('click', addTask);
taskInput.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
        addTask();
    }
});
taskList.addEventListener('dblclick', event => {
    if (event.target.classList.contains('task__title')) {
        editTask(event.target.parentElement);
    }
});

// Загрузка задач при загрузке страницы
loadTasks();