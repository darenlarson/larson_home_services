// ***** SLIDER *****
const track = document.querySelector(".carousel-track");
const slides = Array.from(track.children);
const nextButton = document.querySelector(".right-button");
const prevButton = document.querySelector(".left-button");
const dotsNav = document.querySelector(".carousel-nav");
const dots = Array.from(dotsNav.children);
// let slideWidth = slides[0].getBoundingClientRect().width;
const body = document.querySelector("body");
let slideWidth = body.getBoundingClientRect().width;

// Resize the slides whenever the browser window size changes so that we know how much to move the images over.
// Prevents next image from showing up if window size is increased by user.
// ISSUE!!! If user resizes during image transtion!!!!
window.addEventListener("resize", e => {
  // Save the new window size, which is the same as the slide width
  slideWidth = body.getBoundingClientRect().width;
  slides.forEach((slide, index) => {
    if (index === 1 && slide.className !== "carousel-slide current-slide")
      setSlidePosition(slide, index);
  });
});

// Arrange the slides next to one another
const setSlidePosition = (slide, index) => {
  slide.style.left = `${slideWidth * index}px`;
};

slides.forEach((slide, index) => {
  setSlidePosition(slide, index);
});

// Moving Slides and changing indicators
const moveToSlide = (track, currentSlide, targetSlide) => {
  track.style.transform = "translateX(-" + targetSlide.style.left + ")";
  currentSlide.classList.remove("current-slide");
  targetSlide.classList.add("current-slide");
};

const updateDots = (currentDot, targetDot) => {
  currentDot.classList.remove("current-slide-indicator");
  targetDot.classList.add("current-slide-indicator");
};


// When I click the right button, move slides to the right
nextButton.addEventListener("click", e => {
  const currentSlide = track.querySelector(".current-slide");
  let targetSlide;

  const currentDot = dotsNav.querySelector(".current-slide-indicator");
  let targetDot;

  if (currentSlide.nextElementSibling) {
    targetSlide = currentSlide.nextElementSibling;
    targetDot = currentDot.nextElementSibling;
  } else {
    targetSlide = currentSlide.previousElementSibling;
    targetDot = currentDot.previousElementSibling;
  }
  moveToSlide(track, currentSlide, targetSlide);
  updateDots(currentDot, targetDot);
  clearInterval(shiftTimer);
  shiftTimer = setInterval(autoShift, 5000);
});

// When I click the left button, move slides to the left
prevButton.addEventListener("click", e => {
  const currentSlide = track.querySelector(".current-slide");
  let targetSlide = currentSlide.previousElementSibling;

  const currentDot = dotsNav.querySelector(".current-slide-indicator");
  let targetDot;

  if (currentSlide.previousElementSibling) {
    targetSlide = currentSlide.previousElementSibling;
    targetDot = currentDot.previousElementSibling;
  } else {
    targetSlide = currentSlide.nextElementSibling;
    targetDot = currentDot.nextElementSibling;
  }

  moveToSlide(track, currentSlide, targetSlide);
  updateDots(currentDot, targetDot);
  clearInterval(shiftTimer);
  shiftTimer = setInterval(autoShift, 5000);
});

// When I click the nav indicators, move to that slide
dotsNav.addEventListener("click", e => {
  // What indicator was clicked on?
  const targetDot = e.target.closest("button");

  if (!targetDot) return;

  const currentSlide = track.querySelector(".current-slide");
  const currentDot = dotsNav.querySelector(".current-slide");
  const targetIndex = dots.findIndex(dot => dot === targetDot);
  const targetSlide = slides[targetIndex];

  moveToSlide(track, currentSlide, targetSlide);
  updateDots(currentDot, targetDot);
  clearInterval(shiftTimer);
  shiftTimer = setInterval(autoShift, 5000);
});


// ***** TOUCH SLIDING *****
let xStart;
let xEnd;

slides.forEach(slide => {
  slide.addEventListener("touchstart", e => {
    xStart = e.touches["0"].screenX;
  });

  slide.addEventListener("touchend", e => {
    xEnd = e.changedTouches["0"].screenX;

    touchSlider(xStart, xEnd);
  });
});

function touchSlider(xStart, xEnd) {
  if (xStart - xEnd > 0) {
    console.log("move to right");
    const currentSlide = track.querySelector(".current-slide");
    let targetSlide;
    const currentDot = dotsNav.querySelector(".current-slide-indicator");
    let targetDot;

    if (currentSlide.nextElementSibling) {
      targetSlide = currentSlide.nextElementSibling;
      targetDot = currentDot.nextElementSibling;
    } else {
      targetSlide = currentSlide.previousElementSibling;
      targetDot = currentDot.previousElementSibling;
    }

    moveToSlide(track, currentSlide, targetSlide);
    updateDots(currentDot, targetDot);
  } else {
    console.log("move to left");
    const currentSlide = track.querySelector(".current-slide");
    let targetSlide = currentSlide.previousElementSibling;

    const currentDot = dotsNav.querySelector(".current-slide-indicator");
    let targetDot;

    if (currentSlide.previousElementSibling) {
      targetSlide = currentSlide.previousElementSibling;
      targetDot = currentDot.previousElementSibling;
    } else {
      targetSlide = currentSlide.nextElementSibling;
      targetDot = currentDot.nextElementSibling;
    }

    moveToSlide(track, currentSlide, targetSlide);
    updateDots(currentDot, targetDot);
  }
  clearInterval(shiftTimer);
  shiftTimer = setInterval(autoShift, 5000);
}



function autoShift() {
  const currentSlide = track.querySelector(".current-slide");
  let targetSlide;

  const currentDot = dotsNav.querySelector(".current-slide-indicator");
  let targetDot;

  if (currentSlide.nextElementSibling) {
    targetSlide = currentSlide.nextElementSibling;
    targetDot = currentDot.nextElementSibling;
  } else {
    targetSlide = currentSlide.previousElementSibling;
    targetDot = currentDot.previousElementSibling;
  }

  moveToSlide(track, currentSlide, targetSlide);
  updateDots(currentDot, targetDot);
  slides.forEach((slide, index) => {
    setSlidePosition(slide, index);
  });
}

// var shiftTimer = setInterval(autoShift, 5000);