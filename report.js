document.addEventListener("DOMContentLoaded", function () {
    let reports = JSON.parse(localStorage.getItem("reports")) || [
        { id: 1, type: "Monthly Transactions", date: "2025-03-01", status: "Pending", details: "This report includes all transactions made in March." },
        { id: 2, type: "Overdue Fines Report", date: "2025-02-20", status: "Reviewed", details: "Summary of all overdue fines collected in February." }
    ];

    const reportsTableBody = document.getElementById("reports-table-body");
    const searchInput = document.getElementById("search-input");
    const viewReportModal = document.getElementById("viewReportModal");
    const reportDetails = document.getElementById("report-details");
    const closeModal = document.querySelector(".close");

    function saveToLocalStorage() {
        localStorage.setItem("reports", JSON.stringify(reports));
    }

    function displayReports(filteredReports = reports) {
        reportsTableBody.innerHTML = "";
        filteredReports.forEach(report => {
            let row = `<tr>
                <td>${report.id}</td>
                <td>${report.type}</td>
                <td>${report.date}</td>
                <td class="${report.status === 'Reviewed' ? 'status-reviewed' : 'status-pending'}">${report.status}</td>
                <td>
                    <button class="view-btn" onclick="viewReport(${report.id})"><i class="fas fa-eye"></i></button>
                </td>
            </tr>`;
            reportsTableBody.innerHTML += row;
        });
    }

    displayReports();

    // View Report Details
    window.viewReport = function (id) {
        const report = reports.find(r => r.id === id);
        if (report) {
            reportDetails.textContent = `Report Type: ${report.type}\nDate: ${report.date}\nStatus: ${report.status}\n\n${report.details}`;
            viewReportModal.style.display = "block";
        }
    };

    // Close Modal
    closeModal.addEventListener("click", function () {
        viewReportModal.style.display = "none";
    });

    // Search Functionality
    searchInput.addEventListener("input", function () {
        let searchValue = searchInput.value.toLowerCase();
        let filteredReports = reports.filter(report =>
            report.type.toLowerCase().includes(searchValue) ||
            report.date.toLowerCase().includes(searchValue) ||
            report.status.toLowerCase().includes(searchValue)
        );
        displayReports(filteredReports);
    });

    // Download Reports as CSV
    document.getElementById("download-report-btn").addEventListener("click", function () {
        let csvContent = "ID,Report Type,Date,Status\n";
        reports.forEach(report => {
            csvContent += `${report.id},${report.type},${report.date},${report.status}\n`;
        });

        let blob = new Blob([csvContent], { type: "text/csv" });
        let link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "reports.csv";
        link.click();
    });
});
