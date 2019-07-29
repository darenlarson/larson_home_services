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

    // Add event listeners on this instance
    this.link.addEventListener("mouseenter", () => {
      this.show();
    });
    this.link.addEventListener("mouseleave", () => {
      this.hide();
    });
  }

  show() {
    console.log(this.link);
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

// ***** MOBILE DROPDOWN MENU *****
const mobileDropdown = document.querySelector(".mobile-dropdown");
const menuButton = document.querySelector(".mobile-nav button");

menuButton.addEventListener("click", () => {
  mobileDropdown.classList.toggle("mobile-dropdown-visible");
});