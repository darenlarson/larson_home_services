// // When the user scrolls the page, execute myFunction
// window.onscroll = function() {
//   myFunction()
// };

// // Get the DOM elements
// const header = document.querySelector("header");
// const nav = document.querySelector("nav");
// const topBanner = document.querySelector(".top-banner");

// // Get the offset position of the navbar
// const sticky = nav.offsetTop;

// // Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
// function myFunction() {
//   console.log(sticky);
//   if (window.pageYOffset >= sticky) {
//     header.classList.add("sticky-header");
//     topBanner.classList.add("shrink");
//     topBanner.classList.remove("shrink");
//   } else if (window.pageYOffset < sticky - 100) {
//     header.classList.remove("sticky-header");
//   }
// }

// When the user scrolls the page, execute myFunction
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
  console.log(y);

  if (window.pageYOffset >= breakPoint) {
    stickyHeader.classList.add("visible");
    stickyHeader.classList.remove("invisible");
    // topHeader.classList.add("hide-top-header");
  }

  if (y < 90) {
    stickyHeader.classList.remove("visible");
    stickyHeader.classList.add("invisible");
    topHeader.classList.remove("hide-top-header");
  }
}
