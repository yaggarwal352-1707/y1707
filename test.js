
const menuBtn = document.getElementById("menuBtn");
const navbar = document.getElementById("navbar");

const searchBtn = document.getElementById("searchBtn");
const searchBox = document.getElementById("searchBox");
const searchInput = document.getElementById("searchInput");
const searchSubmit = document.getElementById("searchSubmit");
const searchResult = document.getElementById("searchResult");

const dialog = document.getElementById("festivalDialog");

// Display current year in the footer.
document.getElementById("year").textContent =
    new Date().getFullYear();

// Mobile navigation menu.
menuBtn.addEventListener("click", function () {
    navbar.classList.toggle("open");

    menuBtn.textContent = navbar.classList.contains("open")
        ? "✕"
        : "☰";
});

// Close mobile menu after selecting a link.
document.querySelectorAll("#navbar a").forEach(function (link) {
    link.addEventListener("click", function () {
        navbar.classList.remove("open");
        menuBtn.textContent = "☰";
    });
});

// Open and close the search panel.
searchBtn.addEventListener("click", function () {
    searchBox.hidden = !searchBox.hidden;

    if (!searchBox.hidden) {
        searchInput.focus();
    }
});

// Search festivals, traditions, monuments and regions.
function searchWebsite() {
    const query = searchInput.value.trim().toLowerCase();

    const cards = document.querySelectorAll(".searchable");

    cards.forEach(function (card) {
        card.classList.remove("search-match");

        const text = (
            card.innerText + " " + card.dataset.search
        ).toLowerCase();

        if (query === "" || text.includes(query)) {
            card.classList.remove("search-hidden");
        } else {
            card.classList.add("search-hidden");
        }
    });

    if (query === "") {
        searchResult.textContent = "Please enter a search term.";
        return;
    }

    const matches = [...cards].filter(function (card) {
        return !card.classList.contains("search-hidden");
    });

    searchResult.textContent = matches.length
        ? matches.length + " result(s) found."
        : "No results found. Try Diwali, dance, monuments or India.";

    if (matches.length > 0) {
        matches[0].classList.add("search-match");

        matches[0].scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    }
}

searchSubmit.addEventListener("click", searchWebsite);

searchInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        searchWebsite();
    }

    if (event.key === "Escape") {
        searchBox.hidden = true;
    }
});

// Restore all cards when the search box is cleared.
searchInput.addEventListener("input", function () {
    if (searchInput.value.trim() === "") {
        document.querySelectorAll(".searchable").forEach(function (card) {
            card.classList.remove("search-hidden", "search-match");
        });

        searchResult.textContent = "";
    }
});

// Festival information pop-ups.
document.querySelectorAll(".learn-btn").forEach(function (button) {
    button.addEventListener("click", function () {
        document.getElementById("dialogTitle").textContent =
            button.dataset.title;

        document.getElementById("dialogDescription").textContent =
            button.dataset.info;

        dialog.showModal();
    });
});

// Close pop-up buttons.
document.getElementById("closeDialog").addEventListener("click", function () {
    dialog.close();
});

document.getElementById("okDialog").addEventListener("click", function () {
    dialog.close();
});

// Close when the user clicks outside the dialog.
dialog.addEventListener("click", function (event) {
    if (event.target === dialog) {
        dialog.close();
    }
});

// View All festival button clears any previous filtering.
document.getElementById("viewFestivals").addEventListener("click", function () {
    searchInput.value = "";

    document.querySelectorAll(".searchable").forEach(function (card) {
        card.classList.remove("search-hidden", "search-match");
    });

    searchResult.textContent = "";

    document.getElementById("festivals").scrollIntoView({
        behavior: "smooth"
    });
});
