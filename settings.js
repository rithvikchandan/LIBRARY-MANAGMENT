document.addEventListener("DOMContentLoaded", function () {
    const settingsForm = document.getElementById("settings-form");

    // Load settings from local storage
    const savedSettings = JSON.parse(localStorage.getItem("settings")) || {
        name: "Admin User",
        email: "admin@example.com",
        theme: "light"
    };

    document.getElementById("admin-name").value = savedSettings.name;
    document.getElementById("admin-email").value = savedSettings.email;
    document.getElementById("theme-selection").value = savedSettings.theme;

    function applyTheme(theme) {
        if (theme === "dark") {
            document.body.style.background = "#2c3e50";
            document.body.style.color = "#fff";
        } else {
            document.body.style.background = "#f4f4f9";
            document.body.style.color = "#333";
        }
    }

    applyTheme(savedSettings.theme);

    settingsForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const updatedSettings = {
            name: document.getElementById("admin-name").value,
            email: document.getElementById("admin-email").value,
            theme: document.getElementById("theme-selection").value
        };

        localStorage.setItem("settings", JSON.stringify(updatedSettings));
        applyTheme(updatedSettings.theme);
        alert("Settings saved successfully!");
    });
});
