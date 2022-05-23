import debounce from "./debounce.js";

// For jQuery like functionality
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

// Fade in first section
$$(".space-grid-container").forEach((element) => {
  element.style.backgroundColor = "transparent";
});

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
        "perspective(300px) translateZ(-30px) translateX(-30px) translateY(30px)";
      square.style.opacity = "0.3";
    } else {
      square.style.opacity = "1";
      square.style.zIndex = "30";
    }

    // Possible future use
    // square.classList.add("break-apart");
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
            header.style.opacity = "1";
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