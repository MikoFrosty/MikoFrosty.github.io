import debounce from "./debounce.js";

// For jQuery like functionality
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

// Fade in first section
$$(".space-grid-container").forEach((element) => {
  element.style.backgroundColor = "transparent";
});

setTimeout(() => {
  $("#overlay").style.opacity = "0.7";
  animateSquares();
}, 1500);
//animateSquares();
scrollEffects();

// Setting up observers
setObserver();
function setObserver() {
  const skillsElements = {
    jsLogo: $("#logo-js"),
    cssLogo: $("#logo-css"),
    htmlLogo: $("#logo-html"),
    githubLogo: $("#logo-github"),
    vscodeLogo: $("#logo-vscode"),
    gitLogo: $("#logo-git"),
    restapiLogo: $("#logo-restapi"),
    jamstackLogo: $("#logo-jamstack"),
    canvaLogo: $("#logo-canva"),
    /*
    nodeLogo: $("#logo-node"),
    expressLogo: $("#logo-express"),
    mongodbLogo: $("#logo-mongodb"),
    mongooseLogo: $("#logo-mongoose")*/
  };

  const intro = $("#intro-box");
  const skillsImages = $$(".skills-images");

  // Observer options
  let options = {
    rootMargin: "0px",
    threshold: 0.4,
  };

  // Observer action for elements to rotate and fade in
  function rotateReveal(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.transform =
          "perspective(500px) translateZ(-200px) rotateY(-20deg) translate(-700px)";
        if (window.scrollY) {
          entry.target.style.transition = "1s transform 0s, .7s opacity 0.3s";
        }
        entry.target.style.transform =
          "perspective(500px) translateZ(-100px) rotateY(0deg) translate(0px)";
        entry.target.style.opacity = "1";
      } else {
        entry.target.style.transition = "0s";
        entry.target.style.opacity = "0";
        entry.target.style.transform =
          "perspective(500px) translateZ(-200px) rotateY(-20deg) translate(-700px)";
      }
    });
  }

  // Observer action for Skills section
  function skillsAction(entries) {
    entries.forEach((entry) => {
      let direction = entry.target.dataset.direction;
      if (entry.isIntersecting) {
        if (direction) {
          entry.target.classList.add(`scroll-slide-${direction}`);
        }
        entry.target.style.opacity = "1";
      } else {
        if (direction) {
          entry.target.classList.remove(`scroll-slide-${direction}`);
        }
        entry.target.style.opacity = "0";
      }
    });
  }

  // Observer action for Intro section & other reveal elements
  let revealObserver = new IntersectionObserver(rotateReveal, options);

  // Create observer for Skills section
  let skillsObserver = new IntersectionObserver(skillsAction, options);

  // Add observer to reveal elements
  revealObserver.observe(intro);
  skillsImages.forEach((container) => {
    revealObserver.observe(container);
  });

  // Add observer to Skills section
  for (let element in skillsElements) {
    skillsObserver.observe(skillsElements[element]);
  }
}

// Animate squares function
function animateSquares() {
  const gridSquares = $$(".space-grid-square");

  for (let i = 0; i < gridSquares.length; i++) {
    let square = gridSquares[i];

    // Target every other square with different effects
    if (i % 2 === 0) {
      square.style.transform = `translateX(-20px) translateY(20px) scale(0.87)`;
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

  // Secret square variables and functions
  let lockedSound = new Audio("./resources/audio/locked.mp3");
  const secretSquare = $("#secret-square");
  const shake = () => {
    lockedSound.loop = true;
    lockedSound.volume = 0.5;
    lockedSound.play();
    gridSquares[14].style.animation = "shake 0.2s linear infinite";
  };
  const stopShake = () => {
    lockedSound.pause();
    gridSquares[14].style.animation = "";
  };

  // Timeout for Secret Square so that interaction doesn't conflict with opening animation
  setTimeout(() => {
    secretSquare.addEventListener("mouseenter", shake);
    secretSquare.addEventListener("mouseleave", stopShake);

    secretSquare.addEventListener(
      "click",
      () => {
        lockedSound.pause();
        let mySound = new Audio("./resources/audio/hatch.mp3");
        mySound.volume = 0.5;
        mySound.play();
        secretSquare.removeEventListener("mouseenter", shake);
        secretSquare.removeEventListener("mouseleave", stopShake);

        gridSquares[14].style.transition = "2s opacity 2s";
        gridSquares[14].style.animation = "drop 4s ease-in forwards";

        $("#space").style.backgroundImage =
          "url('./resources/images/space.png')";
        $("#space").style.animation = "bgScroll 20s linear infinite";

        $("#astronaut").style.display = "block";
        $("#astronaut").style.animation =
          "astronaut-animation 6s ease-in-out infinite";
      },
      { once: true }
    );
  }, 2500);
}

// Scroll effects function
function scrollEffects() {
  let prevScrollPos = window.scrollY;
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
            window.scrollY / 10
          }px`;
          $("#secret-square").style.left = `${1500 + window.scrollY / 10}px`;
        }

        // Scroll effects for Skills section
        if ($(".scroll-slide-right")) {
          $$(".scroll-slide-right").forEach((element) => {
            let top = element.getBoundingClientRect().top;
            element.style.left = `min(${
              (window.innerHeight - top) / 1.3 + 40
            }px, 360px)`;
          });
        }
        if ($(".scroll-slide-left")) {
          $$(".scroll-slide-left").forEach((element) => {
            let top = element.getBoundingClientRect().top;
            element.style.right = `min(${
              (window.innerHeight - top) / 1.3 + 40
            }px, 360px)`;
          });
        }

        // Hide header when scrolling down and show when scrolling up
        let currentScrollPos = window.scrollY;
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
      // Options for turning debounce into a throttle function
      { leading: true, maxWait: 20, trailing: true }
    )
  );
}
