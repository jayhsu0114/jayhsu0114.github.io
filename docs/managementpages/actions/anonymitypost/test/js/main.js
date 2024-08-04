import { fetchData } from './fetchData.js';
import { updatePostNow, updatePostGroup } from './postUtils.js';
import { initializeCanvas } from './canvasUtils.js';

window.onload = fetchData;

window.addEventListener('DOMContentLoaded', (event) => {
    const nextButton = document.getElementById('next');
    const prevButton = document.getElementById('prev');

    if (nextButton) {
        nextButton.addEventListener('click', () => {
            updatePostNow(1);
        });
    }

    if (prevButton) {
        prevButton.addEventListener('click', () => {
            updatePostNow(-1);
        });
    }

    initializeCanvas();
});
