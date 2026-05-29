document.addEventListener('DOMContentLoaded', () => {
    const blackOverlay = document.getElementById('blackOverlay');
    const bootBackground = document.getElementById('bootBackground');
    const logoGroup = document.getElementById('logoGroup');
    const loaderContainer = document.getElementById('loaderContainer');
    const setupBackground = document.getElementById('setupBackground');
    const setupLoaderContainer = document.getElementById('setupLoaderContainer');
    const setupWindow = document.getElementById('setupWindow');

    const frameToMs = (frames) => (frames / 60) * 1000;

    setTimeout(() => {
        logoGroup.classList.add('content-rise-fade');
        loaderContainer.classList.add('content-rise-fade');

        blackOverlay.style.animation = `overlayFadeInThenOut 0.9s ease-in-out forwards`;
        blackOverlay.style.animationDelay = `0s`;
        blackOverlay.style.visibility = 'visible';
        blackOverlay.style.opacity = '0';

        setTimeout(() => {
            bootBackground.style.opacity = '0';
            bootBackground.style.visibility = 'hidden';
            bootBackground.style.zIndex = '-1';
        }, 100);

    }, frameToMs(3 * 60 + 26));

    setTimeout(() => {
        setupBackground.classList.add('zoom-out');
    }, frameToMs(4 * 60));

    setTimeout(() => {
        setupLoaderContainer.classList.add('fade-in-up');
    }, frameToMs(4 * 60 + 32));
    
    setTimeout(() => {
        setupLoaderContainer.classList.remove('fade-in-up');
        setupLoaderContainer.classList.add('fade-out-down');
    }, frameToMs(6 * 60 + 40));

    setTimeout(() => {
        setupWindow.classList.add('show');
    }, frameToMs(7 * 60 + 2));

    const btnNext = document.querySelector('.btn-next');
    btnNext.addEventListener('click', () => {
        setupWindow.classList.remove('show');
        setupWindow.classList.add('hide');
        
        setTimeout(() => {
            const setupWindow2 = document.getElementById('setupWindow2');
            if (setupWindow2) {
                setupWindow2.classList.add('show');
            }
        }, frameToMs(23)); 
    });
});
