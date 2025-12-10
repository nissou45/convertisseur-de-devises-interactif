import { useEffect, useState } from "react";
import "./CurrencyConverter.css";

const API_URL =
  "https://grippy.learn.pierre-godino.com/api/mock/react-converter";

function CurrencyConverter() {
  const [rates, setRates] = useState([]);
  const [amount, setAmount] = useState(1);
  const [search, setSearch] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState("");

  // Charger les taux
  useEffect(() => {
    async function fetchRates() {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setRates(data.rates); // le tableau
      } catch (error) {
        console.error("Erreur API :", error);
      }
    }
    fetchRates();
  }, []);

  // Filtrer les devises
  const filteredCurrencies = rates.filter((c) =>
    c.code.toLowerCase().includes(search.toLowerCase())
  );

  // Récupérer la devise sélectionnée
  const selectedObj = rates.find((c) => c.code === selectedCurrency);

  // Calcul conversion
  const conversion = selectedObj ? (amount * selectedObj.rate).toFixed(2) : "";

  return (
    <div className="converter-container">
      <h2>Currency Converter</h2>

      <label>Amount in €</label>
      <input
        type="number"
        className="input-field"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
      />

      <label>Search currency</label>
      <input
        type="text"
        className="input-field"
        placeholder="USD, GBP..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <label>Select currency</label>
      <select
        className="select-field"
        value={selectedCurrency}
        onChange={(e) => setSelectedCurrency(e.target.value)}
      >
        <option value="">-- Choose --</option>
        {filteredCurrencies.map((currency) => (
          <option key={currency.code} value={currency.code}>
            {currency.description} ({currency.code})
          </option>
        ))}
      </select>

      {conversion && (
        <div className="result-box">
          <h3>{conversion}</h3>
          <p>{selectedObj.description}</p>
        </div>
      )}
    </div>
  );
}

export default CurrencyConverter;
