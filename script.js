// ===============================
// 1️⃣ GET ELEMENTS FROM DOM
// ===============================

const passwordOutput = document.getElementById("passwordOutput");
const copyBtn = document.getElementById("copyBtn");
const statusText = document.getElementById("statusText");
const lengthRange = document.getElementById("lengthRange");
const lengthValue = document.getElementById("lengthValue");
const optLowercase = document.getElementById("optLowercase");
const optUppercase = document.getElementById("optUppercase");
const optNumbers = document.getElementById("optNumbers");
const optSymbols = document.getElementById("optSymbols");
const optNoSimilar = document.getElementById("optNoSimilar");
const strengthFill = document.getElementById("strengthFill");
const strengthLabel = document.getElementById("strengthLabel");
const generateBtn = document.getElementById("generateBtn");
const resetBtn = document.getElementById("resetBtn");
const year = document.getElementById("year");

// ===============================
// 2️⃣ CONSTANTS (CHARACTER SETS)
// ===============================

const lower = "abcdefghijklmnopqrstuvwxyz";
const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numbers = "0123456789";
const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";
const similar = "O0l1I";

// ===============================
// 3️⃣ UPDATE LENGTH DISPLAY
// ===============================

lengthRange.addEventListener("input", () => {
  lengthValue.textContent = lengthRange.value;
  generatePassword();
});

// ===============================
// 4️⃣ GENERATE PASSWORD FUNCTION
// ===============================

function generatePassword() {
  const length = Number(lengthRange.value);
  let characters = "";

  if (optLowercase.checked) {
    characters += lower;
  }
  if (optUppercase.checked) {
    characters += upper;
  }
  if (optNumbers.checked) {
    characters += numbers;
  }
  if (optSymbols.checked) {
    characters += symbols;
  }
  if (optNoSimilar.checked) {
    characters = characters
      .split("")
      .filter((char) => !similar.includes(char))
      .join("");
  }

  if (characters.length === 0) {
    statusText.textContent = "Vyber aspoň jednu možnosť";
    return;
  }
  let password = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    const randomChar = characters[randomIndex];

    password += randomChar;
  }
  passwordOutput.value = password;
  statusText.textContent = "";

  updateStrength(password);
}

// ===============================
// 5️⃣ PASSWORD STRENGTH FUNCTION
// ===============================

function updateStrength(password) {
  if (!password) {
    strengthFill.style.width = "0%";
    strengthLabel.textContent = "—";
    strengthFill.setAttribute("aria-valuenow", "0");
    return;
  }

  let score = 0;

  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (password.length >= 16) score++;

  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;

  if (password.split("").some((char) => symbols.includes(char))) {
    score++;
  }

  if (score <= 2) {
    strengthFill.style.width = "25%";
    strengthLabel.textContent = "weak";
    strengthFill.setAttribute("aria-valuenow", "25");
  } else if (score <= 4) {
    strengthFill.style.width = "60%";
    strengthLabel.textContent = "Medium";
    strengthFill.setAttribute("aria-valuenow", "60");
  } else {
    strengthFill.style.width = "100%";
    strengthLabel.textContent = "Strong";
    strengthFill.setAttribute("aria-valuenow", "100");
  }
}

// ===============================
// 6️⃣ COPY FUNCTION
// ===============================

function copyPassword() {
  if (passwordOutput.value === "") {
    statusText.textContent = "Nothing to copy";
    return;
  }

  navigator.clipboard
    .writeText(passwordOutput.value)
    .then(() => {
      statusText.textContent = "Copied ✅";

      setTimeout(() => {
        statusText.textContent = "";
      }, 2000);
    })
    .catch(() => {
      statusText.textContent = "Copy failed ❌";

      setTimeout(() => {
        statusText.textContent = "";
      }, 2000);
    });
}

// ===============================
// 7️⃣ RESET FUNCTION
// ===============================

function resetSettings() {
  lengthRange.value = 12;
  lengthValue.textContent = 12;

  optLowercase.checked = true;
  optUppercase.checked = true;
  optNumbers.checked = true;

  optSymbols.checked = false;
  optNoSimilar.checked = false;

  passwordOutput.value = "";
  statusText.textContent = "";

  strengthFill.style.width = "0%";
  strengthLabel.textContent = "—";
  strengthFill.setAttribute("aria-valuenow", "0");

  updateStrength("");
}

// ===============================
// 8️⃣ EVENT LISTENERS
// ===============================

generateBtn.addEventListener("click", generatePassword);
copyBtn.addEventListener("click", copyPassword);
resetBtn.addEventListener("click", resetSettings);

resetSettings();

// ===============================
// 9️⃣ OPTIONAL: SET CURRENT YEAR
// ===============================

year.textContent = new Date().getFullYear();
