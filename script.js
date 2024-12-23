// 1. Create a page that displays a balloon (using the balloon emoji, 🎈). When you press
// the up arrow, it should inflate (grow) 10 percent, and when you press the down arrow,
// it should deflate (shrink) 10 percent. You can control the size of text (emoji are
// text) by setting the font-size CSS property (style.fontSize) on its parent element.
// Remember to include a unit in the value—for example, pixels (10px). The key names of
// the arrow keys are "ArrowUp" and "ArrowDown". Make sure the keys change only the
// balloon, without scrolling the page.
// When that works, add a feature where, if you blow up the balloon past a certain size,
// it explodes. In this case, exploding means that it is replaced with a 💥 emoji, and
// the event handler is removed (so that you can’t inflate or deflate the explosion).
// Hint: keeping track of the size in percentage might be easier.
// Hint: Make sure you quote the emoji characters. They are strings, after all.
// Hint: document.getElementById("balloon") will get the balloon element on the page.

// 2. The index.html page has a tabbed layout. Make the default state of the layout show
// the first tab, and make it so that when you click the links at the top the correct
// tab's contents are displayed and the others are hidden. Prevent the default action of
// the links and set up an event listener with the logic necessary to make the tabs
// function as expected. There are many ways to accomplish this task, but you will need
// to at minimum add listeners to each link and toggle the display of the tab contents.
// Hint: display: none; hides an element, and display: block; will bring it
// 1. Balloon Inflation and Explosion
const balloon = document.getElementById("balloon");
let currentSize = 16; // Starting size in pixels
let exploded = false; // To track whether the balloon has exploded

document.addEventListener("keydown", (event) => {
    if (exploded) return; // Stop further actions if balloon has exploded

    if (event.key === "ArrowUp") {
        currentSize *= 1.1; // Increase size by 10%
        if (currentSize >= 100) { // Explosion threshold
            balloon.textContent = "💥"; // Replace with explosion emoji
            balloon.style.fontSize = "48px"; // Set a standard size for explosion
            exploded = true; // Mark as exploded
        } else {
            balloon.style.fontSize = `${currentSize}px`; // Update size
        }
        event.preventDefault();
    } else if (event.key === "ArrowDown") {
        currentSize *= 0.9; // Decrease size by 10%
        if (currentSize >= 16) { // Ensure size doesn't shrink below the starting size
            balloon.style.fontSize = `${currentSize}px`; // Update size
        }
        event.preventDefault();
    }
});

// 2. Tabbed Layout
const tabs = document.querySelectorAll("#tabbed-layout ul li a");
const contents = document.querySelectorAll("#tabbed-contents > div");

// Initialize: Show only the first tab's content
contents.forEach((content, index) => {
    content.style.display = index === 0 ? "block" : "none"; // First tab visible, others hidden
});

tabs.forEach((tab, index) => {
    tab.addEventListener("click", (event) => {
        event.preventDefault(); // Prevent default link behavior

        // Hide all tab contents and reset tab styles
        contents.forEach((content) => (content.style.display = "none"));
        tabs.forEach((tab) => tab.classList.remove("active"));

        // Show the selected tab's content and set it as active
        contents[index].style.display = "block";
        tab.classList.add("active");
    });
});
