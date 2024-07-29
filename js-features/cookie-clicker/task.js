document.addEventListener('DOMContentLoaded', function () {
    let clicks = 0;
    let lastClickTime = new Date().getTime();
    let totalClicks = document.getElementById('clicker__counter');
    let cookie = document.getElementById('cookie');

    cookie.addEventListener('click', function () {
        clicks++;
        totalClicks.textContent = clicks;

        let currentTime = new Date().getTime();
        let timeDifference = (currentTime - lastClickTime) / 1000;
        lastClickTime = currentTime;

        let clickSpeed = 1 / timeDifference;
        console.log(clickSpeed.toFixed(2));

        if (cookie.width === '200') {
            cookie.width = '180';
            cookie.height = '180';
        } else {
            cookie.width = '200';
            cookie.height = '200';
        }
    });
});