
// =========================================================
// CTM PATH™ MILLIONAIRES™
// GUIDED JOURNEY™
// 16-PAGE NAVIGATION ENGINE
// =========================================================

let currentPage = 1;

const totalPages = 16;


// =========================================================
// GET PAGE
// =========================================================

function getPage(pageNumber) {
  return document.getElementById(
    `page-${String(pageNumber).padStart(2, "0")}`
  );
}


// =========================================================
// SHOW PAGE
// =========================================================

function showPage(pageNumber) {

  // Keep page number within valid range
  if (pageNumber < 1) {
    pageNumber = 1;
  }

  if (pageNumber > totalPages) {
    pageNumber = totalPages;
  }

  // Hide every page
  document.querySelectorAll(".journey-page").forEach(page => {
    page.classList.remove("active");
  });

  // Show requested page
  const page = getPage(pageNumber);

  if (page) {
    page.classList.add("active");
  }

  // Update current page
  currentPage = pageNumber;

  // Always return visitor to the top
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


// =========================================================
// NEXT PAGE
// =========================================================

function nextPage() {

  if (currentPage < totalPages) {
    showPage(currentPage + 1);
  }

}


// =========================================================
// PREVIOUS PAGE
// =========================================================

function previousPage() {

  if (currentPage > 1) {
    showPage(currentPage - 1);
  }

}


// =========================================================
// KEYBOARD NAVIGATION
// =========================================================

document.addEventListener("keydown", function(event) {

  // Right arrow = Next
  if (event.key === "ArrowRight") {
    nextPage();
  }

  // Left arrow = Previous
  if (event.key === "ArrowLeft") {
    previousPage();
  }

});


// =========================================================
// INITIALIZE
// =========================================================

document.addEventListener("DOMContentLoaded", function() {

  currentPage = 1;

  showPage(currentPage);

});

