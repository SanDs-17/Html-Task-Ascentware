function getUsers() {
    return JSON.parse(localStorage.getItem("users")) || [];
}

function saveUsers(users) {
    localStorage.setItem("users", JSON.stringify(users));
}

function validateEmail(email) {
    if (!email.includes("@") || !email.includes(".")) {
        alert("Enter a valid email (must contain @ and .)");
        return false;
    }
    if (email.startsWith("@")) {
        alert("Email cannot start with @");
        return false;
    }
    if (email.endsWith(".")) {
        alert("Email cannot end with a dot");
        return false;
    }
    return true;
}

function validatePassword(password) {
    if (password.length < 8) {
        alert("Password must be minimum 8 characters");
        return false;
    }
    if (!/[A-Z]/.test(password)) {
        alert("Password must contain ONE uppercase letter");
        return false;
    }
    if (!/[!@#$%^&*]/.test(password)) {
        alert("Password must contain ONE special character");
        return false;
    }
    return true;
}

function signup() {
    let name = document.getElementById("username").value.trim();
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();

    if (name === "" || email === "" || password === "") {
        alert("Please fill all fields");
        return false;
    }

    if (!validateEmail(email)) return false;
    if (!validatePassword(password)) return false;

    let users = getUsers();

    if (users.some(u => u.email === email)) {
        alert("User already exists with this email!");
        return false;
    }

    users.push({ name, email, password });
    saveUsers(users);

    alert("Signup Successful!");
    window.location.href = "./signin.html"; 
    return false;
}

function signin() {
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();

    if (email === "" || password === "") {
        alert("Please enter both fields");
        return;
    }

    let users = getUsers();
    let user = users.find(u => u.email === email && u.password === password);

    if (user) {
        sessionStorage.setItem("isLoggedIn", "true");
        sessionStorage.setItem("sessionUser", JSON.stringify(user));
        alert("Login Successful!");
        window.location.href = "./dashboard.html";
    } else {
        alert("Incorrect Email or Password");

        let link = document.getElementById("forgotLink");
        if (link) link.style.display = "block";
    }
}

function resetPassword() {
    let email = document.getElementById("email").value.trim();
    let newPassword = document.getElementById("npassword").value.trim();

    if (email === "" || newPassword === "") {
        alert("Please fill all fields");
        return;
    }

    if (!validatePassword(newPassword)) return;

    let users = getUsers();
    let user = users.find(u => u.email === email);

    if (!user) {
        alert("Email not found!");
        return;
    }

    user.password = newPassword;
    saveUsers(users);

    alert("Password updated!");
    window.location.href = "./signin.html";
}

function loadDashboard() {
    if (sessionStorage.getItem("isLoggedIn") !== "true") {
        alert("Please login first.");
        window.location.href = "./signin.html"; 
        return;
    }

    let user = JSON.parse(sessionStorage.getItem("sessionUser"));

    document.getElementById("name").innerText = user.name;
    document.getElementById("email").innerText = user.email;
    document.getElementById("password").innerText = user.password;
}

function logout() {
    sessionStorage.clear();
    alert("Logged out successfully");
    window.location.href = "./signin.html";
}
