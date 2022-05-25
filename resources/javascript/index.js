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
    }

    square.classList.add("square-final-animation");
  }
  
  const secretSquare = $("#secret-square");
  const shake = () => {
    gridSquares[14].style.animation = "shake 0.2s linear infinite";
  };
    const stopShake = () => {
    gridSquares[14].style.animation = "";
  };
  
  setTimeout(() => {
     secretSquare.addEventListener("mouseenter", shake);
  secretSquare.addEventListener("mouseleave", stopShake);
  
  secretSquare.addEventListener("click", () => {

    secretSquare.removeEventListener("mouseenter", shake);
    secretSquare.removeEventListener("mouseleave", stopShake);

    gridSquares[14].style.transition = "2s opacity 2s";
    gridSquares[14].style.animation = "drop 4s ease-in forwards";
   
    $("#space").style.backgroundImage = "url('./resources/images/space.png')";
    $("#space").style.animation = "bgScroll 20s linear infinite";

    $("#astronaut").style.display = "block";
    $("#astronaut").style.animation = "astronaut-animation 6s ease-in-out infinite";
    
  }, {once: true});
}, 2500);

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
          $("#secret-square").style.left = `${1500 + (window.pageYOffset / 10)}px`;
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
