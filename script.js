let exchangeRates = {};

// Fetch exchange rates from an API
async function fetchExchangeRates() {
    try {
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD'); // Replace with your API endpoint
        const data = await response.json();

        if (data && data.rates) {
            exchangeRates = data.rates; // Store fetched rates in global object
            populateCurrencyOptions(); // Populate dropdowns
        } else {
            console.error('Failed to fetch exchange rates:', data);
        }
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

// Populate currency options in the dropdowns
function populateCurrencyOptions() {
    const fromCurrency = document.getElementById("fromCurrency");
    const toCurrency = document.getElementById("toCurrency");

    // Clear existing options
    fromCurrency.innerHTML = '';
    toCurrency.innerHTML = '';

    // Loop through each currency in exchangeRates to add options
    for (const code in exchangeRates) {
        const option1 = document.createElement("option");
        const option2 = document.createElement("option");

        option1.value = option2.value = code;
        option1.text = option2.text = `${code}`;

        fromCurrency.add(option1);
        toCurrency.add(option2);
    }
}

// Convert currency when the button is clicked
function convertCurrency() {
    const amount = parseFloat(document.getElementById("amount").value);
    const fromCurrencyCode = document.getElementById("fromCurrency").value;
    const toCurrencyCode = document.getElementById("toCurrency").value;
    const result = document.getElementById("result");

    // Validate the input amount
    if (isNaN(amount) || amount <= 0) {
        result.textContent = "Please enter a valid amount.";
        result.style.color = "red";
        return;
    }
    else {
        const convertedAmount = (amount * exchangeRates[toCurrencyCode]) / exchangeRates[fromCurrencyCode];
    
        result.textContent = `${amount} ${fromCurrencyCode} = ${convertedAmount.toFixed(2)} ${toCurrencyCode}`;
        result.style.color = "lightgreen"
        result.style.fontWeight = 600;
    }
}

// Add an event listener to the button for conversion
document.getElementById("convertButton").addEventListener("click", convertCurrency);

// Fetch exchange rates when the page loads
fetchExchangeRates();
