
/* =====================================
   WANDERWAVE PAGE NAVIGATION
===================================== */

const pages = document.querySelectorAll(".page");
const navigationLinks = document.querySelectorAll("[data-page]");
const navMenu = document.getElementById("navLinks");
const menuButton = document.getElementById("menuBtn");

function showPage(pageName) {

    const validPages = [
        "home",
        "destinations",
        "experiences",
        "planner",
        "contact",
        "login"
    ];

    // If invalid page requested, show home
    if (!validPages.includes(pageName)) {
        pageName = "home";
    }

    // Hide all pages
    pages.forEach(page => {
        page.classList.remove("active");
    });

    // Show selected page
    const selectedPage = document.getElementById(pageName);

    if (selectedPage) {
        selectedPage.classList.add("active");
    }

    // Update URL hash without loading another HTML file
    window.location.hash = pageName;

    // Close mobile menu
    if (navMenu) {
        navMenu.classList.remove("open");
    }

    // Scroll to top
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// Click navigation buttons
navigationLinks.forEach(link => {

    link.addEventListener("click", function(event) {

        event.preventDefault();

        const pageName = this.dataset.page;

        if (pageName) {
            showPage(pageName);
        }

    });

});


// Handle browser back/forward
window.addEventListener("hashchange", function() {

    let pageName = window.location.hash.replace("#", "");

    if (!pageName) {
        pageName = "home";
    }

    pages.forEach(page => {
        page.classList.remove("active");
    });

    const selectedPage = document.getElementById(pageName);

    if (selectedPage) {
        selectedPage.classList.add("active");
    } else {
        document.getElementById("home").classList.add("active");
    }

});


// Start on Home
let startingPage = window.location.hash.replace("#", "");

if (!startingPage) {
    startingPage = "home";
}

showPage(startingPage);


/* =====================================
   MOBILE MENU
===================================== */

if (menuButton && navMenu) {

    menuButton.addEventListener("click", function() {
        navMenu.classList.toggle("open");
    });

}


/* =====================================
   DESTINATION FILTER
===================================== */

const filterButtons = document.querySelectorAll(".filter");
const destinationCards = document.querySelectorAll(".destination-card");

filterButtons.forEach(button => {

    button.addEventListener("click", function() {

        // Remove active style
        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        this.classList.add("active");

        const category = this.dataset.filter;

        destinationCards.forEach(card => {

            if (category === "all" || card.dataset.category === category) {
                card.classList.remove("hidden");
            } else {
                card.classList.add("hidden");
            }

        });

    });

});


/* =====================================
   PLAN THIS DESTINATION BUTTONS
===================================== */

document.querySelectorAll("[data-plan]").forEach(button => {

    button.addEventListener("click", function() {

        const destinationName = this.dataset.plan;

        // Open planner page
        showPage("planner");

        // Fill destination automatically
        const destinationInput = document.getElementById("tripDestination");

        if (destinationInput) {
            destinationInput.value = destinationName;
        }

    });

});


/* =====================================
   TRIP PLANNER
===================================== */

const plannerForm = document.getElementById("plannerForm");
const tripResult = document.getElementById("tripResult");

if (plannerForm) {

    plannerForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const destination =
            document.getElementById("tripDestination").value;

        const date =
            document.getElementById("tripDate").value;

        const travellers =
            document.getElementById("tripPeople").value;

        const duration =
            document.getElementById("tripDuration").value;

        const style =
            document.getElementById("tripStyle").value;

        tripResult.innerHTML = `
            <h3>🎉 Your Trip Plan Is Ready!</h3>

            <p><strong>Destination:</strong> ${escapeHTML(destination)}</p>

            <p><strong>Travel Date:</strong> ${escapeHTML(date)}</p>

            <p><strong>Travellers:</strong> ${escapeHTML(travellers)}</p>

            <p><strong>Duration:</strong> ${escapeHTML(duration)}</p>

            <p><strong>Travel Style:</strong> ${escapeHTML(style)}</p>

            <p>Have an amazing journey with WanderWave! 🌊</p>
        `;

        tripResult.classList.add("show");

    });

}


/* =====================================
   CONTACT FORM
===================================== */

const contactForm = document.getElementById("contactForm");
const contactResult = document.getElementById("contactResult");

if (contactForm) {

    contactForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const name = document.getElementById("contactName").value;

        contactResult.innerHTML = `
            <h3>Message Submitted! ✅</h3>
            <p>Thank you, ${escapeHTML(name)}!</p>
            <p>Your message has been received in this demo.</p>
        `;

        contactResult.classList.add("show");

        contactForm.reset();

    });

}


/* =====================================
   LOGIN FORM DEMO
===================================== */

const loginForm = document.getElementById("loginForm");
const loginResult = document.getElementById("loginResult");

if (loginForm) {

    loginForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const email = document.getElementById("loginEmail").value;

        loginResult.innerHTML = `
            <h3>Welcome, Traveller! 🌊</h3>
            <p>Demo login submitted for ${escapeHTML(email)}.</p>
            <p>This demo does not save passwords or create accounts.</p>
        `;

        loginResult.classList.add("show");

    });

}


/* =====================================
   SAFE TEXT
===================================== */

function escapeHTML(text) {

    return String(text).replace(/[&<>"']/g, function(character) {

        const replacements = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;"
        };

        return replacements[character];

    });

}


/* =====================================
   DATE VALIDATION
===================================== */

const dateInput = document.getElementById("tripDate");

if (dateInput) {

    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    dateInput.min = `${year}-${month}-${day}`;

}
