const form = document.getElementById('form');

form.addEventListener('submit', (e) => {
    let formData = new FormData(form);
    const progress = document.getElementById('progress');
    const xhr = new XMLHttpRequest();

    e.preventDefault();
    xhr.open('POST', 'https://netology-slow-rest.herokuapp.com/upload.php');
    xhr.upload.onprogress = function (event) {
        let percent = event.loaded / event.total;
        progress.value = percent;
    }
    xhr.send(formData);
});