document.addEventListener("DOMContentLoaded", function () {
    let fines = JSON.parse(localStorage.getItem("fines")) || [
        { id: 1, member: "Alice Johnson", book: "Atomic Habits", amount: 10, status: "Unpaid" },
        { id: 2, member: "Bob Smith", book: "1984", amount: 500, status: "Paid" }
    ];

    const finesTableBody = document.getElementById("fines-table-body");
    const addFineModal = document.getElementById("addFineModal");
    const addFineForm = document.getElementById("addFineForm");

    function saveToLocalStorage() {
        localStorage.setItem("fines", JSON.stringify(fines));
    }

    function displayFines() {
        finesTableBody.innerHTML = "";
        fines.forEach(fine => {
            let row = `<tr>
                <td>${fine.id}</td>
                <td>${fine.member}</td>
                <td>${fine.book}</td>
                <td>₹${fine.amount}</td>
                <td class="${fine.status === 'Paid' ? 'status-paid' : 'status-unpaid'}">${fine.status}</td>
                <td>
                    <button class="pay-btn" onclick="payFine(${fine.id})"><i class="fas fa-check"></i></button>
                    <button class="delete-btn" onclick="deleteFine(${fine.id})"><i class="fas fa-trash"></i></button>
                </td>
            </tr>`;
            finesTableBody.innerHTML += row;
        });
    }

    displayFines();

    addFineForm.addEventListener("submit", function (e) {
        e.preventDefault();

        let memberName = document.getElementById("member-name").value.trim();
        let bookTitle = document.getElementById("book-title").value.trim();
        let fineAmount = document.getElementById("fine-amount").value.trim();

        if (!memberName || !bookTitle || !fineAmount) {
            alert("Please fill out all fields.");
            return;
        }

        let newFine = {
            id: fines.length > 0 ? fines[fines.length - 1].id + 1 : 1,
            member: memberName,
            book: bookTitle,
            amount: parseFloat(fineAmount),
            status: "Unpaid"
        };

        fines.push(newFine);
        saveToLocalStorage();
        displayFines();

        addFineModal.style.display = "none";
        addFineForm.reset();
    });

    // Delete Fine
    window.deleteFine = function (id) {
        fines = fines.filter(f => f.id !== id);
        saveToLocalStorage();
        displayFines();
    };

    // Payment Workflow
    let selectedFineId = null;

    window.payFine = function (id) {
        selectedFineId = id;
        document.getElementById("paymentModal").style.display = "block";
    };

    document.getElementById("cash-btn").addEventListener("click", function () {
        markFineAsPaid();
        closePaymentModal();
    });

    document.getElementById("upi-btn").addEventListener("click", function () {
        document.getElementById("qr-code-container").style.display = "block";
    });

    document.getElementById("done-qr-btn").addEventListener("click", function () {
        markFineAsPaid();
        closePaymentModal();
    });

    function markFineAsPaid() {
        if (selectedFineId !== null) {
            let fine = fines.find(f => f.id === selectedFineId);
            fine.status = "Paid";
            saveToLocalStorage();
            displayFines();
            selectedFineId = null;
        }
    }

    // Close Modal Buttons
    document.querySelector(".close").addEventListener("click", function () {
        addFineModal.style.display = "none";
    });

    document.querySelector(".close-payment").addEventListener("click", closePaymentModal);

    function closePaymentModal() {
        document.getElementById("paymentModal").style.display = "none";
        document.getElementById("qr-code-container").style.display = "none";
        selectedFineId = null;
    }
});
// Show Add Fine Modal
document.getElementById("add-fine-btn").addEventListener("click", function () {
    document.getElementById("addFineModal").style.display = "block";
});

// Close Add Fine Modal
document.querySelector(".close").addEventListener("click", function () {
    document.getElementById("addFineModal").style.display = "none";
});
