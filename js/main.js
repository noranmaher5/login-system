// localStorage
function getUsers() {
  return JSON.parse(localStorage.getItem("users") || "[]");
}


function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}


function setCurrentUser(user) {
  localStorage.setItem("currentUser", JSON.stringify(user));
}


function getCurrentUser() {
  return JSON.parse(localStorage.getItem("currentUser"));
}

//register
function register() {
  const name = document.getElementById("registerName").value.trim();
  const email = document.getElementById("registerEmail").value.trim();
  const password = document.getElementById("registerPassword").value.trim();

  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");
  const passwordError = document.getElementById("passwordError");

  // Reset errors
  nameError.style.display = "none";
  emailError.style.display = "none";
  passwordError.style.display = "none";

  let valid = true;

  if (!/^[a-zA-Z ]{2,}$/.test(name)) {
    nameError.style.display = "block";
    valid = false;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    emailError.style.display = "block";
    valid = false;
  }

  if (password.length < 6) {
    passwordError.style.display = "block";
    valid = false;
  }

  const users = getUsers();

  if (users.some(user => user.email === email)) {
    emailError.textContent = "this email is already registered.";
    emailError.style.display = "block";
    valid = false;
  }

  if (!valid) return;

  users.push({ name, email, password });
  saveUsers(users);
  alert("successfully registered! You can now log in.");
  window.location.href = "index.html";
}

// login
function login() {
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value.trim();
  const loginError = document.getElementById("loginError");

  const users = getUsers();
  const matchedUser = users.find(user => user.email === email && user.password === password);

  if (!matchedUser) {
    loginError.textContent = "Invalid email or password.";
    return;
  }

  setCurrentUser(matchedUser);
  window.location.href = "home.html";
}
function checkLogin() {
  const user = getCurrentUser();
  if (!user) {
    window.location.href = "index.html";
  } else {
    const welcomeMessage = document.getElementById("welcomeMessage");
    if (welcomeMessage) {
      welcomeMessage.textContent = `Welcome, ${user.name} `;
    }
  }
}

// logout
function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "index.html";
}
