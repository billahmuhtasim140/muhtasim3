// ============ SETTINGS — edit these ============
const PASSWORD   = "mypass12";        // exactly 8 characters
const SITE_TITLE = "My Notebook";     // shown on the page and browser tab
const STORAGE_KEY = "personal-notebook-text";
// ===============================================

const loginPage    = document.getElementById("login-page");
const notebookPage = document.getElementById("notebook-page");
const loginForm    = document.getElementById("login-form");
const passwordInput = document.getElementById("password");
const loginError   = document.getElementById("login-error");
const editor       = document.getElementById("editor");
const saveStatus   = document.getElementById("save-status");
const logoutBtn    = document.getElementById("logout-btn");

// Apply the title everywhere
document.title = SITE_TITLE;
document.querySelectorAll(".site-title").forEach(function (el) {
  el.textContent = SITE_TITLE;
});

function showLogin() {
  notebookPage.hidden = true;
  loginPage.hidden = false;
  passwordInput.value = "";
  loginError.hidden = true;
  passwordInput.focus();
}

function showNotebook() {
  loginPage.hidden = true;
  notebookPage.hidden = false;
  editor.value = loadText();
  editor.focus();
}

function loadText() {
  try {
    return localStorage.getItem(STORAGE_KEY) || "";
  } catch (e) {
    return "";
  }
}

function saveText() {
  try {
    localStorage.setItem(STORAGE_KEY, editor.value);
    saveStatus.textContent = "Saved";
  } catch (e) {
    saveStatus.textContent = "Could not save";
  }
}

loginForm.addEventListener("submit", function (event) {
  event.preventDefault();
  if (passwordInput.value === PASSWORD) {
    showNotebook();
  } else {
    loginError.hidden = false;
    passwordInput.value = "";
    passwordInput.focus();
  }
});

let saveTimer;
editor.addEventListener("input", function () {
  saveStatus.textContent = "Saving…";
  clearTimeout(saveTimer);
  saveTimer = setTimeout(saveText, 300);
});

// Make sure nothing is lost if the tab is closed right after typing
window.addEventListener("pagehide", function () {
  if (!notebookPage.hidden) saveText();
});

logoutBtn.addEventListener("click", function () {
  saveText();
  editor.value = "";   // clear the text from the screen after logout
  showLogin();
});

showLogin();
