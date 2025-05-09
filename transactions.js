document.addEventListener("DOMContentLoaded", function () {
    // Load transactions from Local Storage or use example data
    let transactions = JSON.parse(localStorage.getItem("transactions")) || [
        { id: 1, book: "Atomic Habits", member: "Alice Johnson", issueDate: "2025-03-01", returnDate: "2025-03-10", status: "Returned" },
        { id: 2, book: "1984", member: "Bob Smith", issueDate: "2025-03-05", returnDate: "", status: "Issued" },
        { id: 3, book: "To Kill a Mockingbird", member: "Charlie Brown", issueDate: "2025-03-07", returnDate: "", status: "Issued" }
    ];

    const transactionsTableBody = document.getElementById("transactions-table-body");
    const searchInput = document.getElementById("search-input");
    const addTransactionModal = document.getElementById("addTransactionModal");
    const addTransactionBtn = document.getElementById("add-transaction-btn");
    const closeModal = document.querySelector(".close");
    const addTransactionForm = document.getElementById("addTransactionForm");

    function saveToLocalStorage() {
        localStorage.setItem("transactions", JSON.stringify(transactions));
    }

    function displayTransactions() {
        transactionsTableBody.innerHTML = ""; 
        transactions.forEach(transaction => {
            let row = `<tr>
                <td>${transaction.id}</td>
                <td>${transaction.book}</td>
                <td>${transaction.member}</td>
                <td>${transaction.issueDate}</td>
                <td>${transaction.returnDate || "Not Returned"}</td>
                <td class="${transaction.status === 'Issued' ? 'status-issued' : 'status-returned'}">${transaction.status}</td>
                <td>
                    <button class="edit-btn" onclick="returnBook(${transaction.id})"><i class="fas fa-check"></i></button>
                    <button class="delete-btn" onclick="deleteTransaction(${transaction.id})"><i class="fas fa-trash"></i></button>
                </td>
            </tr>`;
            transactionsTableBody.innerHTML += row;
        });
    }

    displayTransactions();

    // Search Transactions
    searchInput.addEventListener("input", function () {
        let searchValue = searchInput.value.toLowerCase();
        let filteredTransactions = transactions.filter(transaction =>
            transaction.book.toLowerCase().includes(searchValue) ||
            transaction.member.toLowerCase().includes(searchValue)
        );
        transactionsTableBody.innerHTML = "";
        filteredTransactions.forEach(transaction => {
            let row = `<tr>
                <td>${transaction.id}</td>
                <td>${transaction.book}</td>
                <td>${transaction.member}</td>
                <td>${transaction.issueDate}</td>
                <td>${transaction.returnDate || "Not Returned"}</td>
                <td class="${transaction.status === 'Issued' ? 'status-issued' : 'status-returned'}">${transaction.status}</td>
                <td>
                    <button class="edit-btn" onclick="returnBook(${transaction.id})"><i class="fas fa-check"></i></button>
                    <button class="delete-btn" onclick="deleteTransaction(${transaction.id})"><i class="fas fa-trash"></i></button>
                </td>
            </tr>`;
            transactionsTableBody.innerHTML += row;
        });
    });

    // Show Add Transaction Modal
    addTransactionBtn.addEventListener("click", function () {
        addTransactionModal.style.display = "block";
    });

    // Close Modal
    closeModal.addEventListener("click", function () {
        addTransactionModal.style.display = "none";
    });

    // Handle Add Transaction Form Submission
    addTransactionForm.addEventListener("submit", function (e) {
        e.preventDefault();
        let newTransaction = {
            id: transactions.length + 1,
            book: document.getElementById("book-title").value,
            member: document.getElementById("member-name").value,
            issueDate: document.getElementById("issue-date").value,
            returnDate: "",
            status: "Issued"
        };

        transactions.push(newTransaction);
        saveToLocalStorage();
        displayTransactions();
        addTransactionModal.style.display = "none";
        addTransactionForm.reset();
    });

    // Return Book Function
    window.returnBook = function (id) {
        let transaction = transactions.find(t => t.id === id);
        if (transaction && transaction.status === "Issued") {
            transaction.returnDate = new Date().toISOString().split("T")[0]; // Today's date
            transaction.status = "Returned";
            saveToLocalStorage();
            displayTransactions();
        }
    };

    // Delete Transaction Function
    window.deleteTransaction = function (id) {
        transactions = transactions.filter(transaction => transaction.id !== id);
        saveToLocalStorage();
        displayTransactions();
    };
});
