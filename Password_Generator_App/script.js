const form = document.querySelector("form");
const lengthInput = document.querySelector("#length");
const lowercaseInput = document.querySelector("#lowercase");
const uppercaseInput = document.querySelector("#uppercase");
const numberInput = document.querySelector("#number");
const symbolInput = document.querySelector("#symbol");
const passwordInput = document.querySelector(".passwordText");

const copyBtn = document.querySelector(".copy");

const lowercases = "abcdefghijklmnopqrstuvwxyz";
const uppercases = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numbers = "1234567890";
const symbols = "!@#$%^&*()_+=";

function generatePassword(length, lowercase, uppercase, number, symbol) {
  const possibility = [getLowercase, getUppercase, getNumber, getSymbol];
  let password = "";

  for (var i = 0; i < lengthInput.value; i++) {
    var randomPossibility = possibility[Math.floor(Math.random() * 4)];

    if (randomPossibility == getLowercase && lowercase) {
      password += getLowercase();
    } else if (randomPossibility == getUppercase && uppercase) {
      password += getUppercase();
    } else if (randomPossibility == getNumber && number) {
      password += getNumber();
    } else if (randomPossibility == getSymbol && symbol) {
      password += getSymbol();
    } else {
      i--;
    }
  }

  passwordInput.textContent = password;
}

function getUppercase() {
  var randomNum = Math.floor(Math.random() * 26);
  return uppercases[randomNum];
}

function getLowercase() {
  var randomNum = Math.floor(Math.random() * 26);
  return lowercases[randomNum];
}

function getNumber() {
  var randomNum = Math.floor(Math.random() * 10);
  return numbers[randomNum];
}

function getSymbol() {
  var randomNum = Math.floor(Math.random() * 13);
  return symbols[randomNum];
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (
    lowercaseInput.checked ||
    uppercaseInput.checked ||
    numberInput.checked ||
    symbolInput.checked
  ) {
    generatePassword(
      lengthInput.value,
      lowercaseInput.checked,
      uppercaseInput.checked,
      numberInput.checked,
      symbolInput.checked
    );
  }
});

copyBtn.addEventListener("click", () => {
  const textarea = document.createElement("textarea");
  const password = passwordInput.textContent;

	if (!password) {
		return;
	}

  textarea.value = password;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
  alert("password coped to clipboard");
});
