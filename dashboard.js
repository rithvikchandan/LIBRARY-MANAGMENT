document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("add-book-btn").addEventListener("click", () => {
        window.location.href = "books.html"; // Redirect to Books page
    });

    document.getElementById("add-member-btn").addEventListener("click", () => {
        window.location.href = "members.html"; // Redirect to Members page
    });

    document.getElementById("issue-book-btn").addEventListener("click", () => {
        window.location.href = "transactions.html"; // Redirect to Transactions (Issue Book) page
    });

    document.getElementById("reports-btn").addEventListener("click", () => {
        window.location.href = "reports.html"; // Redirect to Reports page
    });
});
