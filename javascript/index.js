// ***** STICKY HEADER *****
window.onscroll = function() {
  myFunction();
};

// Get the DOM elements
const stickyHeader = document.querySelector(".sticky-header");
const topHeader = document.querySelector(".top-header");
const navTop = document.querySelector(".top-header nav");
const topButton = document.querySelector(".scrollToTop");

// Get the offset position of the navbar
const breakPoint = navTop.offsetTop;

// Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
  let y = window.scrollY;

  if (window.pageYOffset >= breakPoint) {
    // Show sticky header
    stickyHeader.classList.add("visible");
    stickyHeader.classList.remove("invisible");

    // Display the "TOP" button
    topButton.classList.add("show-top-button");
  }

  if (y < 90) {
    // Show top header
    stickyHeader.classList.remove("visible");
    stickyHeader.classList.add("invisible");
    topHeader.classList.remove("hide-top-header");

    // Hide the "TOP" button
    topButton.classList.remove("show-top-button");
  }
}

// ***** NAV DROP DOWN MENU *****
class TabLink {
  constructor(link) {
    this.link = link;
    // Get the custom data attribute on the Link
    this.linkData = this.link.dataset.tab;
    // Using the custom data attribute get the associated Item element
    this.tabItem = document.querySelector(
      `.dropdown-content[data-tab='${this.linkData}']`
    );
    // Using the Item element, create a new instance of the TabItem class
    this.tabItem = new TabItem(this.tabItem);
    console.log(this.tabItem);

    // Add event listeners on this instance
    this.link.addEventListener("mouseenter", () => {
      this.show();
    });
    this.link.addEventListener("mouseleave", () => {
      this.hide();
    });
  }

  show() {
    console.log(this.link)
    this.tabItem.show();
  }

  hide() {
    this.tabItem.hide();
  }
}

class TabItem {
  constructor(tabElement) {
    this.tabElement = tabElement;
  }

  show() {
    this.tabElement.classList.add("dropdown-visible");
  }

  hide() {
    this.tabElement.classList.remove("dropdown-visible");
  }
}

// Get the DOM elements
let links = Array.from(document.querySelectorAll(".nav-link"));
links = links.map(link => new TabLink(link));
console.log(links);




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
});

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

setInterval(autoShift, 5000);
