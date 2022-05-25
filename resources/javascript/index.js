import debounce from "./debounce.js";

// For jQuery like functionality
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

// Fade in first section
$$(".space-grid-container").forEach((element) => {
  element.style.backgroundColor = "transparent";
});
//$("#overlay").style.opacity = "0.4";
const intro = $("#intro-box");
intro.style.opacity = "1";
intro.style.transform = "perspective(500px) translateZ(-100px) rotateY(0deg) translate(0px)";

setTimeout(() => {
    $("#overlay").style.opacity = "0.7";
    animateSquares();
}, 1500);
//animateSquares();
scrollEffects();

// Animate squares function
function animateSquares() {
  const gridSquares = $$(".space-grid-square");

  for (let i = 0; i < gridSquares.length; i++) {
    let square = gridSquares[i];

    // Target every other square with different effects
    if (i % 2 === 0) {
      square.style.transform =
        `translateX(-20px) translateY(20px) scale(0.87)`;
      //square.style.opacity = "0.98";
      square.style.boxShadow = "inset 12px -12px 14px black";
      square.style.zIndex = "21";
    } else {
      square.insertAdjacentHTML(
        "beforeend",
        `
        <div class='space-grid-square-drop'></div>
        <div class='space-grid-square-drop-border'></div>
      `
      );
      //square.style.borderRadius = "0px 80px 80px 0";
    }

    // Possible future use
    square.classList.add("square-final-animation");
  }
}

// Scroll effects function
function scrollEffects() {
  let prevScrollPos = window.pageYOffset;
  const header = $("header");
  const gridContainer = $$(".space-grid-container");

  // Window scroll throttled to 50fps
  window.addEventListener(
    "scroll",
    debounce(
      () => {
        // Scroll effect on squares
        for (let i = 0; i < gridContainer.length; i++) {
          gridContainer[i].style[i % 2 ? "left" : "right"] = `${
            window.pageYOffset / 10
          }px`;
        }

        //$("#space").style.backgroundPositionY = `${window.pageYOffset / 2}px`;

        // Hide header when scrolling down and show when scrolling up
        let currentScrollPos = window.pageYOffset;
        if (currentScrollPos > 100) {
          if (prevScrollPos > currentScrollPos) {
            header.style.top = "0";
            header.style.visibility = "visible";
          } else {
            header.style.top = "-200px";
          }
        }
        prevScrollPos = currentScrollPos;
      },
      20,
      { leading: true, maxWait: 20, trailing: true }
    )
  );
}
