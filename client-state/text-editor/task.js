// Получаем элементы
const editor = document.getElementById('editor');
const clearBtn = document.getElementById('clearBtn');

// Загружаем текст из локального хранилища при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    const savedText = localStorage.getItem('editorContent');
    if (savedText) {
        editor.value = savedText;
    }
});

// Сохраняем текст в локальное хранилище при изменении
editor.addEventListener('input', () => {
    localStorage.setItem('editorContent', editor.value);
});

// Очищаем содержимое текстового редактора и локального хранилища
clearBtn.addEventListener('click', () => {
    editor.value = '';
    localStorage.removeItem('editorContent');
});
