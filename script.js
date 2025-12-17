const tempInput = document.getElementById("temperature");
const unitSelect = document.getElementById("unit");
const historyList = document.getElementById("historyList");
const themeToggle = document.getElementById("themeToggle");
const clearBtn = document.getElementById("clearHistory");

// Load history from localStorage
window.onload = () => {
  const savedHistory = JSON.parse(localStorage.getItem("tempHistory")) || [];
  savedHistory.forEach(item => addHistory(item));
};

// Real-time conversion
tempInput.addEventListener("input", convertTemp);
unitSelect.addEventListener("change", convertTemp);

// Theme toggle
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  themeToggle.textContent =
    document.body.classList.contains("dark") ? "☀️" : "🌙";
});

// Clear history
clearBtn.addEventListener("click", () => {
  localStorage.removeItem("tempHistory");
  historyList.innerHTML = "";
});

function convertTemp() {
  const temp = parseFloat(tempInput.value);
  const unit = unitSelect.value;
  if (isNaN(temp)) return;

  let celsius, fahrenheit, kelvin;

  if (unit === "celsius") {
    celsius = temp;
    fahrenheit = (temp * 9) / 5 + 32;
    kelvin = temp + 273.15;
  } else if (unit === "fahrenheit") {
    celsius = ((temp - 32) * 5) / 9;
    fahrenheit = temp;
    kelvin = celsius + 273.15;
  } else {
    celsius = temp - 273.15;
    fahrenheit = (celsius * 9) / 5 + 32;
    kelvin = temp;
  }

  document.getElementById("celsiusResult").innerText =
    `Celsius: ${celsius.toFixed(2)} °C`;
  document.getElementById("fahrenheitResult").innerText =
    `Fahrenheit: ${fahrenheit.toFixed(2)} °F`;
  document.getElementById("kelvinResult").innerText =
    `Kelvin: ${kelvin.toFixed(2)} K`;

  saveHistory(`${temp} ${unit}`);
}

function saveHistory(record) {
  let history = JSON.parse(localStorage.getItem("tempHistory")) || [];
  history.unshift(record);
  history = history.slice(0, 10);
  localStorage.setItem("tempHistory", JSON.stringify(history));
  addHistory(record);
}

function addHistory(text) {
  const li = document.createElement("li");
  li.textContent = text;
  historyList.prepend(li);
}
