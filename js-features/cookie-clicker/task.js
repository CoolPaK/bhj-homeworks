document.addEventListener('DOMContentLoaded', function () {
    let clicks = 0;
    let lastClickTime = new Date().getTime();
    let totalClicks = document.getElementById('clicker__counter');
    let cookie = document.getElementById('cookie');
    let clickTimer;

    cookie.addEventListener('mousedown', function () {
        clickTimer = new Date().getTime();
        cookie.style.width = '220px';
        cookie.style.height = '220px';
    });

    cookie.addEventListener('mouseup', function () {
        let clickDuration = (new Date().getTime() - clickTimer) / 1000;
        console.log('Click duration: ' + clickDuration.toFixed(2) + ' seconds');
        cookie.style.width = '200px';
        cookie.style.height = '200px';
    });

    cookie.addEventListener('click', function () {
        clicks++;
        totalClicks.textContent = clicks;

        let currentTime = new Date().getTime();
        let timeDifference = (currentTime - lastClickTime) / 1000;
        lastClickTime = currentTime;

        let clickSpeed = 1 / timeDifference;
        console.log('Click speed: ' + clickSpeed.toFixed(2) + ' clicks per second');
    });
});
