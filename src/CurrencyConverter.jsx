import { useEffect, useState } from "react";

const API_URL =
  "https://grippy.learn.pierre-godino.com/api/mock/react-converter";

function CurrencyConverter() {
  const [rates, setRates] = useState({});
  const [amount, setAmount] = useState(1);
  const [search, setSearch] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState("");

  // Charger les taux de l'API
  useEffect(() => {
    async function fetchRates() {
      const response = await fetch(API_URL);
      const data = await response.json();
      setRates(data);
    }
    fetchRates();
  }, []);

  const currencies = Object.keys(rates);

  // filtrer la recherche
  const filteredCurrencies = currencies.filter((currency) =>
    currency.toLowerCase().includes(search.toLowerCase())
  );

  // Calculer la conversion
  const conversion =
    selectedCurrency && rates[selectedCurrency]
      ? (amount * rates[selectedCurrency].rate).toFixed(2)
      : "";

  return (
    <div>
      <h2>Currency Converter</h2>

      <label>Amount in €</label>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <label>Search currency</label>
      <input
        type="text"
        placeholder="USD, GBP..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <label>Select currency</label>
      <select onChange={(e) => setSelectedCurrency(e.target.value)}>
        <option value="">--Choose--</option>
        {filteredCurrencies.map((currency) => (
          <option key={currency} value={currency}>
            {rates[currency].name} ({currency})
          </option>
        ))}
      </select>

      {conversion && (
        <div>
          <h3>Result : {conversion}</h3>
          <p>Devise : {selectedCurrency}</p>
        </div>
      )}
    </div>
  );
}

export default CurrencyConverter;
