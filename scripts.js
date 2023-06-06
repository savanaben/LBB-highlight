let previousActiveElement;


function updateAriaLiveAttributes(targets, value) {
    targets.forEach((target) => {
      if (value) {
        target.setAttribute('aria-atomic', 'true');
      } else {
        target.removeAttribute('aria-atomic');
      }
    });
  }


  function applyHighlightClass(targets, className) {
    targets.forEach((target) => {
      target.classList.remove(className);
  
      setTimeout(() => {
        target.classList.add(className);
      }, 50);
    });
    updateAriaLiveAttributes(targets, true);
  }


// Add this function to remove the aria-live attributes when the highlights are turned off
function removeAriaLiveAttributes() {
    const targets = document.querySelectorAll('.highlightTarget');
    updateAriaLiveAttributes(targets, false);
  }
  
  // Update the removeHighlightBtn event listener to call removeAriaLiveAttributes function
  document.getElementById('removeHighlightBtn').addEventListener('click', () => {
    const targets = document.querySelectorAll('.highlightTarget');
    targets.forEach((target) => {
      target.classList.remove('highlight', 'highlight2', 'highlight3', 'highlight4');
    });
    removeAriaLiveAttributes();
  });



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





let borderStateThin = false;

// Helper function to get the border width based on the zoom level
function getBorderWidth(zoomLevel) {
    if (zoomLevel < 1) {
        return borderStateThin ? '1px' : '3px';
    } else {
        return borderStateThin ? '1px' : '2px';
    }
}

// toggle border weight
document.getElementById('toggleBorderWeightBtn').addEventListener('click', () => {
    const highlight4Elements = document.querySelectorAll('.highlight4');
    const highlight3Elements = document.querySelectorAll('.highlight3');
    const zoomLevel = window.devicePixelRatio;
    const newBorderWeight = getBorderWidth(zoomLevel);

    highlight4Elements.forEach((highlightElement) => {
        highlightElement.style.borderWidth = newBorderWeight;
    });

    highlight3Elements.forEach((highlightElement) => {
        highlightElement.style.borderWidth = newBorderWeight;
    });

    borderStateThin = !borderStateThin;
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



//toggle between color themes, dark and light

let currentTheme = 'light-theme'; // Starting theme

document.getElementById('toggleThemeBtn').addEventListener('click', () => {
    // Remove the current theme
    document.body.classList.remove(currentTheme);

    // Determine the next theme
    if (currentTheme === 'light-theme') {
        currentTheme = 'beige-theme';
    } else if (currentTheme === 'beige-theme') {
        currentTheme = 'dark-theme';
    } else if (currentTheme === 'dark-theme') {
        currentTheme = 'light-theme';
    }

    // Apply the next theme
    document.body.classList.add(currentTheme);
});


window.onload = function() {
  document.body.classList.add('light-theme');
};


// Create a single return button
const returnButton = createReturnButton();
document.body.appendChild(returnButton);

// Tab event handling for highlight targets
document.querySelectorAll(".highlightTarget").forEach((highlightTarget) => {
  highlightTarget.addEventListener("keydown", (event) => {
    if (event.key === "Tab") {
      event.preventDefault();
      
      returnButton.classList.remove("hidden");
      returnButton.tabIndex = 0;
      returnButton.focus();

      // Store the currently focused highlightTarget
      returnButton.highlightTarget = highlightTarget;
    }
  });
});

// Update returnButton click event
returnButton.addEventListener("click", () => {
  if (lastClickedLBB) {
    lastClickedLBB.focus();
    returnButton.classList.add("hidden");
  }
});



// Store the last clicked LBB button
let lastClickedLBB = null;
document.querySelectorAll(".linkedLBB").forEach((linkedLBB) => {
  linkedLBB.addEventListener("click", () => {
    lastClickedLBB = linkedLBB;
  });
});

// Function to create a hidden return button
function createReturnButton() {
  const returnButton = document.createElement("button");
  returnButton.className = "return-button hidden";
  returnButton.innerText = "Return to LBB";

  let tabPressCount = 0;

  returnButton.addEventListener("keydown", (event) => {
      if (event.key === "Tab") {
          event.preventDefault();

          if (event.shiftKey && tabPressCount === 0) {
              // Move focus to the previous focusable element in the DOM order.
              const prevFocusable = getPreviousFocusableElement(returnButton);
              if (prevFocusable) prevFocusable.focus();
              return;
          }

          tabPressCount++;

          if (tabPressCount === 1) {
              // Change the text and behavior to "Clear Highlight"
              returnButton.innerText = "Clear Highlight";
          } else if (tabPressCount === 2) {
              // Change the text and behavior back to "Return to LBB"
              returnButton.innerText = "Return to LBB";

              // Reset tabPressCount
              tabPressCount = 0;

              // Move focus to the next focusable element in the DOM order.
              const nextFocusable = getNextFocusableElement(returnButton);
              if (nextFocusable) nextFocusable.focus();
          }
      }
  });

  returnButton.addEventListener("click", () => {
      if (returnButton.innerText === "Clear Highlight") {
          // Clear highlights and move focus to the "focusable element before highlights" button
          removeHighlightClasses();
          document.querySelector("button").focus(); // assumes "focusable element before highlights" is the first button in the document
      } else if (lastClickedLBB) {
          lastClickedLBB.focus();
      }
      returnButton.classList.add("hidden");
  });

  returnButton.tabIndex = -1;
  return returnButton;
}








// Create a hidden return button for each highlighted element
document.querySelectorAll(".highlightTarget").forEach((highlightTarget) => {
  const returnButtonBefore = createReturnButton();
  const returnButtonAfter = createReturnButton();
  highlightTarget.insertAdjacentElement("beforebegin", returnButtonBefore);
  highlightTarget.insertAdjacentElement("afterend", returnButtonAfter);
});

// Tab event handling for highlight targets
document.querySelectorAll(".highlightTarget").forEach((highlightTarget) => {
  highlightTarget.addEventListener("keydown", (event) => {
    if (event.key === "Tab") {
      event.preventDefault();

      const returnButton = event.shiftKey
        ? highlightTarget.previousElementSibling
        : highlightTarget.nextElementSibling;

      returnButton.classList.remove("hidden");
      returnButton.tabIndex = 0;
      returnButton.focus();
    }
  });
});

// Tab and Shift+Tab event handling for return buttons
document.querySelectorAll(".return-button").forEach((returnButton) => {
  returnButton.addEventListener("keydown", (event) => {
    if (event.key === "Tab") {
      event.preventDefault();
      returnButton.classList.add("hidden");

      if (event.shiftKey) {
        const prevFocusable = getPreviousFocusableElement(returnButton);
        if (prevFocusable) prevFocusable.focus();
      } else {
        const nextFocusable = getNextFocusableElement(returnButton);
        if (nextFocusable) nextFocusable.focus();
      }
    }
  });
});

// Get previous focusable element
function getPreviousFocusableElement(element) {
  let prev = element.previousElementSibling;
  while (prev) {
    if (prev.tabIndex >= 0 && !prev.classList.contains("return-button")) {
      return prev;
    }
    prev = prev.previousElementSibling;
  }
  return null;
}

// Get next focusable element
function getNextFocusableElement(element) {
  let next = element.nextElementSibling;
  while (next) {
    if (next.tabIndex >= 0 && !next.classList.contains("return-button")) {
      return next;
    }
    next = next.nextElementSibling;
  }
  return null;
}




// Create a hidden return button for each highlighted element
document.querySelectorAll(".highlightTarget").forEach((highlightTarget) => {
  const returnButtonBefore = createReturnButton();
  const returnButtonAfter = createReturnButton();
  highlightTarget.insertAdjacentElement("beforebegin", returnButtonBefore);
  highlightTarget.insertAdjacentElement("afterend", returnButtonAfter);
});

// Tab event handling for highlight targets
document.querySelectorAll(".highlightTarget").forEach((highlightTarget) => {
  highlightTarget.addEventListener("keydown", (event) => {
    if (event.key === "Tab") {
      event.preventDefault();

      const returnButton = event.shiftKey
        ? highlightTarget.previousElementSibling
        : highlightTarget.nextElementSibling;

      returnButton.classList.remove("hidden");
      returnButton.tabIndex = 0;
      returnButton.focus();
    }
  });
});



// Get previous focusable element
function getPreviousFocusableElement(element) {
  let prev = element.previousElementSibling;
  while (prev) {
    if (prev.tabIndex >= 0 && !prev.classList.contains("return-button")) {
      return prev;
    }
    prev = prev.previousElementSibling;
  }
  return null;
}

// Get next focusable element
function getNextFocusableElement(element) {
  let next = element.nextElementSibling;
  while (next) {
    if (next.tabIndex >= 0 && !next.classList.contains("return-button")) {
      return next;
    }
    next = next.nextElementSibling;
  }
  return null;
}

// Make return buttons interactive
document.querySelectorAll(".return-button").forEach((returnButton) => {
  returnButton.addEventListener("focus", () => {
    returnButton.classList.remove("hidden");
  });

  returnButton.addEventListener("blur", () => {
    returnButton.classList.add("hidden");
  });
});

