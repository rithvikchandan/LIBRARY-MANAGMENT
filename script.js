document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let errorMessage = document.getElementById("error-message");

    if (username === "admin" && password === "admin") {
        window.location.href = "index.html"; // Redirect after successful login
    } else {
        errorMessage.textContent = "Invalid username or password!";
    }
});
