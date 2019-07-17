// ***** STICKY HEADER *****
window.onscroll = function() {
  myFunction();
};

// Get the DOM elements
const stickyHeader = document.querySelector(".sticky-header");
const topHeader = document.querySelector(".top-header");
const navTop = document.querySelector(".top-header nav");

// Get the offset position of the navbar
const breakPoint = navTop.offsetTop;

// Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
  let y = window.scrollY;

  if (window.pageYOffset >= breakPoint) {
    stickyHeader.classList.add("visible");
    stickyHeader.classList.remove("invisible");
  }

  if (y < 90) {
    stickyHeader.classList.remove("visible");
    stickyHeader.classList.add("invisible");
    topHeader.classList.remove("hide-top-header");
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

    // Add event listeners on this instance
    this.link.addEventListener("mouseenter", () => {
      this.show();
    });
    this.link.addEventListener("mouseleave", () => {
      this.hide();
    });
  }

  show() {
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





// ***** SLIDER *****
const track = document.querySelector(".carousel-track");
const slides = Array.from(track.children);
const nextButton = document.querySelector(".right-button");
const prevButton = document.querySelector(".left-button");
const dotsNav = document.querySelector(".carousel-nav");
const dots = Array.from(dotsNav.children);
const slideWidth = slides[0].getBoundingClientRect().width;

// Arrange the slides next to one another
const setSlidePosition = (slide, index) => {
  slide.style.left = `${slideWidth * index}px`;
};
slides.forEach(setSlidePosition);

// Moving Slides and changing indicators
const moveToSlide = (track, currentSlide, targetSlide) => {
  track.style.transform = "translateX(-" + targetSlide.style.left + ")";
  currentSlide.classList.remove("current-slide");
  targetSlide.classList.add("current-slide");
}

const updateDots = (currentDot, targetDot) => {
  currentDot.classList.remove('current-slide');
  targetDot.classList.add('current-slide');
}

// When I click the right button, move slides to the right
nextButton.addEventListener("click", e => {
  const currentSlide = track.querySelector(".current-slide");
  let targetSlide;

  const currentDot = dotsNav.querySelector('.current-slide');
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
prevButton.addEventListener('click', e => {
  const currentSlide = track.querySelector(".current-slide");
  let targetSlide = currentSlide.previousElementSibling;

  const currentDot = dotsNav.querySelector('.current-slide');
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
dotsNav.addEventListener('click', e => {
  // What indicator was clicked on?
  const targetDot = e.target.closest('button');
  
  if (!targetDot) return;

  const currentSlide = track.querySelector('.current-slide');
  const currentDot = dotsNav.querySelector('.current-slide');
  const targetIndex = dots.findIndex(dot => dot === targetDot)
  const targetSlide = slides[targetIndex];

  moveToSlide(track, currentSlide, targetSlide);
  updateDots(currentDot, targetDot);
});

function autoShift() {
  const currentSlide = track.querySelector(".current-slide");
  let targetSlide;

  const currentDot = dotsNav.querySelector('.current-slide');
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
}

setInterval(autoShift, 3000)