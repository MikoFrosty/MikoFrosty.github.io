import debounce from "./debounce.js";

// For jQuery like functionality
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

// Fade in first section
$$(".space-grid-container").forEach((element) => {
  element.style.backgroundColor = "transparent";
});
$("#overlay").style.opacity = "0.4";

animateSquares();
scrollEffects();

// Animate squares function
function animateSquares() {
  const gridSquares = $$(".space-grid-square");

  for (let i = 0; i < gridSquares.length; i++) {
    let square = gridSquares[i];

    // Target every other square with different effects
    if (i % 2 === 0) {
      square.style.transform =
        "perspective(300px) translateZ(-32px) translateX(-30px) translateY(30px) rotateY(.1deg)";
      square.style.opacity = "0.7";
      square.style.zIndex = "21";
    } else {
      square.insertAdjacentHTML(
        "beforeend",
        `
        <div class='space-grid-square-drop'></div>
        <div class='space-grid-square-drop-border'></div>
      `
      );
      square.style.opacity = "1";
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
