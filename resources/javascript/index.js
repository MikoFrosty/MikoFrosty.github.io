//import debounce from "../../node_modules/lodash-es/debounce.js";

// For jQuery like functionality
const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

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
    debounce(() => {
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
    }, 20, { leading: true, maxWait: 20, trailing: true }),
  );
}



// lodash-es debounce function adapted for personal use.
function debounce(func, wait, options) {
    
    var lastArgs,
        lastThis,
        maxWait,
        result,
        timerId,
        lastCallTime,
        lastInvokeTime = 0,
        leading = false,
        maxing = false,
        trailing = true;
  
    if (typeof func != 'function') {
      throw new TypeError('Expected a function');
    }
    
    wait = Number.parseInt(wait, 10) || 0;
    if (typeof options === 'object') {
      leading = !!options.leading;
      maxing = 'maxWait' in options;
      maxWait = maxing ? Math.max(Number.parseInt(options.maxWait, 10) || 0, wait) : maxWait;
      trailing = 'trailing' in options ? !!options.trailing : trailing;
    }
  
    function invokeFunc(time) {
      var args = lastArgs,
          thisArg = lastThis;
  
      lastArgs = lastThis = undefined;
      lastInvokeTime = time;
      result = func.apply(thisArg, args);
      return result;
    }
  
    function leadingEdge(time) {
      // Reset any `maxWait` timer.
      lastInvokeTime = time;
      // Start the timer for the trailing edge.
      timerId = setTimeout(timerExpired, wait);
      // Invoke the leading edge.
      return leading ? invokeFunc(time) : result;
    }
  
    function remainingWait(time) {
      var timeSinceLastCall = time - lastCallTime,
          timeSinceLastInvoke = time - lastInvokeTime,
          timeWaiting = wait - timeSinceLastCall;
  
      return maxing
        ? Math.min(timeWaiting, maxWait - timeSinceLastInvoke)
        : timeWaiting;
    }
  
    function shouldInvoke(time) {
      var timeSinceLastCall = time - lastCallTime,
          timeSinceLastInvoke = time - lastInvokeTime;
  
      // Either this is the first call, activity has stopped and we're at the
      // trailing edge, the system time has gone backwards and we're treating
      // it as the trailing edge, or we've hit the `maxWait` limit.
      return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
        (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
    }
  
    function timerExpired() {
      var time = Date.now();
      if (shouldInvoke(time)) {
        return trailingEdge(time);
      }
      // Restart the timer.
      timerId = setTimeout(timerExpired, remainingWait(time));
    }
  
    function trailingEdge(time) {
      timerId = undefined;
  
      // Only invoke if we have `lastArgs` which means `func` has been
      // debounced at least once.
      if (trailing && lastArgs) {
        return invokeFunc(time);
      }
      lastArgs = lastThis = undefined;
      return result;
    }
  
    function cancel() {
      if (timerId !== undefined) {
        clearTimeout(timerId);
      }
      lastInvokeTime = 0;
      lastArgs = lastCallTime = lastThis = timerId = undefined;
    }
  
    function flush() {
      return timerId === undefined ? result : trailingEdge(Date.now());
    }
  
    function debounced() {
      var time = Date.now(),
          isInvoking = shouldInvoke(time);
  
      lastArgs = arguments;
      lastThis = this;
      lastCallTime = time;
  
      if (isInvoking) {
        if (timerId === undefined) {
          return leadingEdge(lastCallTime);
        }
        if (maxing) {
          // Handle invocations in a tight loop.
          clearTimeout(timerId);
          timerId = setTimeout(timerExpired, wait);
          return invokeFunc(lastCallTime);
        }
      }
      if (timerId === undefined) {
        timerId = setTimeout(timerExpired, wait);
      }
      return result;
    }
    debounced.cancel = cancel;
    debounced.flush = flush;
    return debounced;
  }