const rotators = document.querySelectorAll('.rotator');

rotators.forEach(rotator => {
    const cases = rotator.querySelectorAll('.rotator__case');
    let currentIndex = 0;

    setInterval(() => {

        cases[currentIndex].classList.remove('rotator__case_active');
        currentIndex = (currentIndex + 1) % cases.length;
        cases[currentIndex].classList.add('rotator__case_active');

        const speed = cases[currentIndex].dataset.speed || 1000;
        const color = cases[currentIndex].dataset.color || 'black';

        cases[currentIndex].style.transition = `color ${speed / 1000}s`;
        cases[currentIndex].style.color = color;

    }, 1000);

});