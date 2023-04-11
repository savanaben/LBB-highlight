function applyHighlightClass(targets, className) {
    targets.forEach((target) => {
        target.classList.remove(className);

        setTimeout(() => {
            target.classList.add(className);
        }, 50);
    });
}

document.getElementById('highlightBtn').addEventListener('click', () => {
    const targets = document.querySelectorAll('.highlightTarget');
    targets.forEach((target) => target.classList.remove('highlight2', 'highlight3', 'highlight4'));
    applyHighlightClass(targets, 'highlight');
});

document.getElementById('highlightBtn2').addEventListener('click', () => {
    const targets = document.querySelectorAll('.highlightTarget');
    targets.forEach((target) => target.classList.remove('highlight', 'highlight3', 'highlight4'));
    applyHighlightClass(targets, 'highlight2');
});

document.getElementById('highlightBtn3').addEventListener('click', () => {
    const targets = document.querySelectorAll('.highlightTarget');
    targets.forEach((target) => target.classList.remove('highlight', 'highlight2', 'highlight4'));
    applyHighlightClass(targets, 'highlight3');
});

document.getElementById('highlightBtn4').addEventListener('click', () => {
    const targets = document.querySelectorAll('.highlightTarget');
    targets.forEach((target) => target.classList.remove('highlight', 'highlight2', 'highlight3'));
    applyHighlightClass(targets, 'highlight4');
});

document.getElementById('removeHighlightBtn').addEventListener('click', () => {
    const targets = document.querySelectorAll('.highlightTarget');
    targets.forEach((target) => {
        target.classList.remove('highlight', 'highlight2', 'highlight3', 'highlight4');
    });
});

// Focus related code

function addHighlightClass(className) {
    const highlightTargets = document.querySelectorAll('.highlightTarget');
    highlightTargets.forEach((highlightTarget) => {
        highlightTarget.classList.add(className);
        highlightTarget.tabIndex = 0;
    });
    highlightTargets[0].focus();
}

function removeHighlightClasses() {
    const highlightTargets = document.querySelectorAll('.highlightTarget');
    const highlightClasses = ['highlight', 'highlight2', 'highlight3', 'highlight4'];
    highlightTargets.forEach((highlightTarget) => {
        highlightTarget.classList.remove(...highlightClasses);
        highlightTarget.removeAttribute('tabindex');
    });
}

function handleClickHighlightButton(className) {
    removeHighlightClasses();
    setTimeout(() => {
        addHighlightClass(className);
    }, 50);
}

document.getElementById('highlightBtn').addEventListener('click', () => {
    handleClickHighlightButton('highlight');
});

document.getElementById('highlightBtn2').addEventListener('click', () => {
    handleClickHighlightButton('highlight2');
});

document.getElementById('highlightBtn3').addEventListener('click', () => {
    handleClickHighlightButton('highlight3');
});

document.getElementById('highlightBtn4').addEventListener('click', () => {
    handleClickHighlightButton('highlight4');
});

document.getElementById('removeHighlightBtn').addEventListener('click', () => {
    removeHighlightClasses();
});


document.getElementById('toggleColorBtn').addEventListener('click', () => {
    document.body.classList.toggle('purple-theme');
});
